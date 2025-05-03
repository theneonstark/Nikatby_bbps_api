<?php

namespace App\Http\Controllers\Paysprint;

use App\Models\FundRequest;
use App\Models\OnboardingForm;
use App\Models\RechargeOperator;
use App\Models\RechargeTransaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class RechargeController
{
    public function dorecharge()
    {
        return Inertia::render('Recharge/dorecharge');
    }
    
    public function processRecharge(Request $request)
    {
        // dd($request->all());
        try {
          $validated = $request->validate([
                'operator' => 'required|integer',
                'canumber' => 'required|string',
                'amount' => 'required|numeric|min:1',
                'referenceid' => 'nullable|string'
            ]);
            $checkBalance = FundRequest::where([
                'user_id' => Auth::id(),
                'status' => 1
            ])->get()->pluck('debit_balance')->sum();
            dd($checkBalance-233);
            if(isset($checkBalance) && $checkBalance < 10)
            {
                return response()->json([
                    'status' => true,
                    'message' => 'Insufficient Amount.',
                ]);
            }

        
            $referenceid = $validated['referenceid'] ?? now()->timestamp;

            // Call PaySprint API from backend
            $paySprintResponse = Http::withHeaders([
                'Authorisedkey' => 'Y2RkZTc2ZmNjODgxODljMjkyN2ViOTlhM2FiZmYyM2I=',
                'Token' => 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lc3RhbXAiOjE3Mzk3OTc1MzUsInBhcnRuZXJJZCI6IlBTMDAxNTY4IiwicmVxaWQiOiIxNzM5Nzk3NTM1In0.d-5zd_d8YTFYC0pF68wG6qqlyrfNUIBEuvxZ77Rxc0M',
                'Accept' => 'application/json',
                'Content-Type' => 'application/json',
            ])->post('https://sit.paysprint.in/service-api/api/v1/service/recharge/recharge/dorecharge', [
                'operator' => (int)$validated['operator'],
                'canumber' => $validated['canumber'],
                'amount' => (int)$validated['amount'],
                'referenceid' => $referenceid,
            ]);

            $responseData = $paySprintResponse->json();
            // dd($paySprintResponse);

            // Optional: Save the transaction details in your database here
            $transaction = RechargeTransaction::create([
                'operator' => $validated['operator'],
                'canumber' => $validated['canumber'],
                'amount' => $validated['amount'],
                'referenceid' => $referenceid,
                'status' => $responseData['status'] ? 'success' : 'failed',
                'response_code' => $responseData['response_code'] ?? '',
                'operatorid' => $responseData['operatorid'] ?? '',
                'ackno' => $responseData['ackno'] ?? '',
                'message' => $responseData['message'] ?? 'Transaction processed',
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            return response()->json([
                'status' => $responseData['status'] ? 'success' : 'failed',
                'message' => $responseData['message'] ?? 'Transaction processed',
                'api_response' => $transaction,
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'failed',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function updateTransaction(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'referenceid' => 'required|string',
                'status' => 'required|string',
                'message' => 'required|string'
            ]);
        
            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $transaction = RechargeTransaction::where('referenceid', $request->referenceid)
                ->first();

            if (!$transaction) {
                return response()->json([
                    'status' => false,
                    'message' => 'Transaction not found'
                ], 404);
            }

            $transaction->update([
                'status' => $request->status,
                'response_code' => $request->response_code ?? null,
                'message' => $request->message
            ]);

            return response()->json([
                'status' => true,
                'message' => 'Transaction updated successfully',
                'data' => $transaction
            ]);

        } catch (\Exception $e) {
            Log::error('Transaction update failed: ' . $e->getMessage());
            
            return response()->json([
                'status' => false,
                'message' => 'Failed to update transaction: ' . $e->getMessage()
            ], 500);
        }
    }
    public function recharge2()
    {
        return Inertia::render('Recharge/Recharge2');
    }
    
    public function listRechargeOperators()
    {
        try {
            // Fetch operators from database, ordered by most recent first
            $operators = RechargeOperator::orderBy('created_at', 'desc')->get();
            return response()->json([
                'status' => 'success',
                'data' => $operators
            ]);
        } catch (\Exception $e) {
            \Log::error('Error fetching recharge operators: ' . $e->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch recharge operators'
            ], 500);
    }
}

    public function storeRechargeOperator(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'operator_name' => 'required|string|max:255',
            'service_name' => 'required|string|max:255',
            'date' => 'required|date'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $operator = RechargeOperator::create([
                'operator_name' => $request->operator_name,
                'service_name' => $request->service_name,
                'date' => $request->date
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Recharge operator created successfully',
                'data' => $operator
            ], 201);
        } catch (\Exception $e) {
            \Log::error('Error creating recharge operator: ' . $e->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to create recharge operator',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function updateRechargeOperator(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'operator_name' => 'required|string|max:255',
            'service_name' => 'required|string|max:255',
            'date' => 'required|date'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $operator = RechargeOperator::findOrFail($id);
            $operator->update([
                'operator_name' => $request->operator_name,
                'service_name' => $request->service_name,
                'date' => $request->date
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Recharge operator updated successfully',
                'data' => $operator
            ]);
        } catch (\Exception $e) {
            \Log::error('Error updating recharge operator: ' . $e->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to update recharge operator',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function deleteRechargeOperator($id)
    {
        try {
            $operator = RechargeOperator::findOrFail($id);
            $operator->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Recharge operator deleted successfully'
            ]);
        } catch (\Exception $e) {
            \Log::error('Error deleting recharge operator: ' . $e->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to delete recharge operator',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function manageOperator()
    {
        return Inertia::render('Recharge/ManageOperator');
    }
    public function index()
    {
        return Inertia::render('Recharge/OnboardingForm');
    }
    public function store(Request $request)
    {
        $request->validate([
            'merchantcode' => 'required|string',
            'mobile' => 'required|string|size:10',
            'is_new' => 'required|boolean',
            'email' => 'required|email',
            'firm' => 'required|string',
            'aadhaarFront' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
            'aadhaarBack' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
            'panCard' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048'
        ]);

        $data = $request->only(['merchantcode', 'mobile', 'is_new', 'email', 'firm']);

        // Handle file uploads
        if ($request->hasFile('aadhaarFront')) {
            $data['aadhaarFront'] = $request->file('aadhaarFront')->store('documents', 'public');
        }
        if ($request->hasFile('aadhaarBack')) {
            $data['aadhaarBack'] = $request->file('aadhaarBack')->store('documents', 'public');
        }
        if ($request->hasFile('panCard')) {
            $data['panCard'] = $request->file('panCard')->store('documents', 'public');
        }

        try {
            $onboarding = OnboardingForm::create($data);

            return response()->json([
                'status' => true,
                'message' => 'Onboarding form submitted successfully',
                'data' => $onboarding
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to submit onboarding form',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
