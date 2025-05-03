<?php

namespace App\Http\Controllers\Paysprint;

use App\Http\Controllers\Controller;
use App\Models\FundRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserFundController extends Controller
{
    public function fundRequest(Request $request)
    {
        // $test = FundRequest::where([
        //     'user_id' => Auth::id(),
        //     'status' => 0
        // ])->get()->pluck('debit_balance')->sum();
        // dd($test);
        
        $validated = $request->validate([
            'transactionType' => 'required|string',
            'amount' => 'required|numeric|min:1',
            'transactionId' => 'required|string',
            'depositedDate' => 'required|date',
            'bankAccount' => 'required|string',
            'proof' => 'required|file|mimes:jpeg,png,pdf|max:2048',
        ]);
        // dd('coming');
        // Handle File Upload
        if ($request->hasFile('proof')) {
            $proofFile = $request->file('proof');
            $proofPath = $proofFile->store('fund_requests', 'public');
        } else {
            return response()->json(['error' => 'Proof file is required.'], 400);
        }

        // dd('coming');
        // Save in database
        if(Auth::user()->verified === 1){
        $fundRequest = FundRequest::create([
            'user_id' => Auth::id(),
            'txn_type' => $validated['transactionType'],
            'credit_balance' => $validated['amount'],
            'txn_id' => $validated['transactionId'],
            'deposite_date' => $validated['depositedDate'],
            'bank_name' => $validated['bankAccount'],
            'image_proff' => $proofPath,
        ]);

        return response()->json([
            'message' => 'Fund request submitted successfully!',
            'data' => $fundRequest
        ], 201);
        }
        else{
            return redirect()->route('getonboarding');
        }
    }
    public function allFundRequestList()
    {
        $fundRequests = FundRequest::all();
        return response()->json($fundRequests);

    }
    public function changeToActiveStatus(Request $request, $id)
    {
        // dd($id);
        $fundRequest = FundRequest::findOrFail($id);
        // dd($fundRequest->credit_balance);
        // $available = $fundRequest->credit_balance;
        $fundRequest->debit_balance = $fundRequest->credit_balance;
        $fundRequest->status = '1';
        $fundRequest->credit_balance = '0';
        $fundRequest->save();

        return response()->json(['message' => 'Status updated successfully.']);
    }
    
    public function changeToInActiveStatus(Request $request, $id)
    {
        // dd('InActive Now');
        // dd($id);
        $fundRequest = FundRequest::findOrFail($id);
        // dd($fundRequest->credit_balance);
        // $available = $fundRequest->credit_balance;
        $fundRequest->credit_balance = $fundRequest->debit_balance;
        $fundRequest->status = '0';
        $fundRequest->debit_balance = '0';
        $fundRequest->save();

        return response()->json(['message' => 'Status updated successfully.']);
    }
    
}
