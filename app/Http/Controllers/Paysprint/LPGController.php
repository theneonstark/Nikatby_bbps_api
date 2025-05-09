<?php

namespace App\Http\Controllers\Paysprint;

use App\Models\LpgBillDetail;
use App\Models\LpgOperator;
use App\Models\LPGPayBillResponse;
use App\Models\LPGStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class LPGController
{
    public function LPGOperator(){
        return Inertia::render('LPG/LPGOperator');
    }
    public function fetchLPGOperator(Request $request)
{
    $response = Http::withHeaders([
        "X-API-KEY" => "DyCiDJMcvTZgJLBcYohezUEPJNPXYzR5jNyrxQRi",
    ])->post('https://uat.nikatby.in/forwarding/public/api/utility/LPG/fetchLPGOperator', [
        'mode' => $request->mode
    ]);

    $data = $response->json();

    if (isset($data['data']) && is_array($data['data'])) {
        // LpgOperator::truncate(); // Uncomment if you want to wipe old data
        foreach ($data['data']['data'] as $item) {
            // dd($data);
            // dd($data['data']['data']);
            if (!is_array($item)) {
                \Log::warning('Skipping invalid LPG item: Not an array', ['item' => $item]);
                continue;
            }

            if (!isset($item['id'], $item['name'], $item['category'], $item['viewbill'])) {
                \Log::warning('Skipping incomplete LPG item: Missing required keys', ['item' => $item]);
                continue;
            }
            LpgOperator::updateOrCreate(
                ['id' => $item['id']],
                [
                    'name' => $item['name'],
                    'category' => $item['category'],
                    'viewbill' => $item['viewbill'],
                    'regex' => $item['regex'] ?? null,
                    'displayname' => $item['displayname'] ?? null,
                    'ad1_d_name' => $item['ad1_d_name'] ?? null,
                    'ad1_name' => $item['ad1_name'] ?? null,
                    'ad1_regex' => $item['ad1_regex'] ?? null,
                    'ad2_d_name' => $item['ad2_d_name'] ?? null,
                    'ad2_name' => $item['ad2_name'] ?? null,
                    'ad2_regex' => $item['ad2_regex'] ?? null,
                    'ad3_d_name' => $item['ad3_d_name'] ?? null,
                    'ad3_name' => $item['ad3_name'] ?? null,
                    'ad3_regex' => $item['ad3_regex'] ?? null,
                ]
            );
        }
        // $lpg = LpgOperator::all()->groupBy('category')->keys();
        // dd($lpg);
    } else {
        \Log::error('LPG API response malformed or missing data key', ['response' => $data]);
        return response()->json([
            'message' => 'Failed to fetch LPG Operators. Malformed data.',
            'data' => []
        ], 500);
    }

    return response()->json([
        'message' => 'LPG Operators data fetched and stored successfully',
        'data' => LpgOperator::all()
    ]);
}

    

    
    public function FetchLPGDetails(Request $request)
    {
        // If no input, just load the page
        if (!$request->has('operator')) {
            return Inertia::render('LPG/FetchLPGDetails', ['lpgData' => null]);
        }

        $apiUrl = "https://uat.nikatby.in/forwarding/public/api/utility/LPG/FetchLPGDetails";

        // API Headers
        $headers = [
            "X-API-KEY" => "DyCiDJMcvTZgJLBcYohezUEPJNPXYzR5jNyrxQRi",
            // 'Content-Type'  => 'application/json',
            // 'Token'         => 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lc3RhbXAiOjE3Mzk3OTc1MzUsInBhcnRuZXJJZCI6IlBTMDAxNTY4IiwicmVxaWQiOiIxNzM5Nzk3NTM1In0.d-5zd_d8YTFYC0pF68wG6qqlyrfNUIBEuvxZ77Rxc0M',
            // 'Authorisedkey' => 'Y2RkZTc2ZmNjODgxODljMjkyN2ViOTlhM2FiZmYyM2I=',
            // 'accept'        => 'application/json'
        ];

        // API Request Body (Using User Input)
        $body = [
            "operator"    => $request->input('operator'),
            "canumber"    => "XXXXX",
            "referenceid" => "XXXXX",
            "latitude"    => "28.65521",
            "longitude"   => "77.14343",
            "ad1"         => "1",
            "ad2"         => "8",
            "ad3"         => "170",
            "ad4"         => "41013435"
        ];

        // Make API Request
        $response = Http::withHeaders($headers)->post($apiUrl, $body);

        // Decode JSON response
        $apiResponse = $response->json();

        // Store response data into the database
        LpgBillDetail::create([
            'operator'     => $request->input('operator'),
            'canumber'     => $body['canumber'],
            'referenceid'  => $body['referenceid'],
            'latitude'     => $body['latitude'],
            'longitude'    => $body['longitude'],
            'ad1'          => $body['ad1'],
            'ad2'          => $body['ad2'],
            'ad3'          => $body['ad3'],
            'ad4'          => $body['ad4'],
            'response_code'=> $apiResponse['response_code'] ?? null,
            'status'       => $apiResponse['status'] ?? 'Failed',
            'amount'       => $apiResponse['amount'] ?? 0.00,
            'name'         => $apiResponse['name'] ?? 'N/A',
            'message'      => $apiResponse['message'] ?? 'No message'
        ]);

        // Pass the API response to the frontend
        return Inertia::render('LPG/FetchLPGDetails', [
            'lpgData' => $apiResponse
        ]);
    }

    public function LPGBill(){
        return Inertia::render('LPG/LPGPayBill');
    }
    public function payLpgBill(Request $request)
    {
        // Validate request data
        $request->validate([
            'canumber'    => 'required|string',
            'referenceid' => 'required|string',
            'amount'      => 'required|numeric',
            'operator'    => 'required|string',
        ]);
    
        // Make API request
        $response = Http::withHeaders([
            "X-API-KEY" => "DyCiDJMcvTZgJLBcYohezUEPJNPXYzR5jNyrxQRi",
            // 'Content-Type'  => 'application/json',
            // 'Accept'        => 'application/json',
            // 'Authorisedkey' => 'Y2RkZTc2ZmNjODgxODljMjkyN2ViOTlhM2FiZmYyM2I=',
            // 'Token'         => 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lc3RhbXAiOjE3Mzk3OTc1MzUsInBhcnRuZXJJZCI6IlBTMDAxNTY4IiwicmVxaWQiOiIxNzM5Nzk3NTM1In0.d-5zd_d8YTFYC0pF68wG6qqlyrfNUIBEuvxZ77Rxc0M',
        ])->post('https://uat.nikatby.in/forwarding/public/api/utility/LPG/payLpgBill', [
            "canumber"    => $request->canumber,
            "referenceid" => $request->referenceid,
            "amount"      => $request->amount,
            "operator"    => $request->operator,
            "ad1"         => 22,
            "ad2"         => 458,
            "ad3"         => 16336200,
            "latitude"    => 27.2232,
            "longitude"   => 78.26535
        ]);
    
        $responseData = $response->json();
    
        // Store response data in the database
        $billResponse = LPGPayBillResponse::create([
            'canumber'    => $request->canumber,
            'operator'    => $request->operator,
            'amount'      => $request->amount,
            'ad1'         => 22,
            'ad2'         => 458,
            'ad3'         => 16336200,
            'referenceid' => $request->referenceid,
            'latitude'    => 27.2232,
            'longitude'   => 78.26535,
            'operatorid'  => $responseData['operatorid'] ?? null,
            'status'      => $responseData['status'] ?? 'Failed',
            'ackno'       => $responseData['ackno'] ?? null,
            'message'     => $responseData['message'] ?? 'No response message',
        ]);
    
        // Return stored data as JSON
        return response()->json($billResponse);
    }
// In LPGController.php
public function getLpgBillHistory()
{
    $transactions = LPGPayBillResponse::orderBy('created_at', 'desc')->get();
    return response()->json($transactions);
}


    public function LPGStatus() {
        return Inertia::render('LPG/LPGStatus');
    }
    public function getLPGStatus(Request $request)
    {
        try {
            // Validate the request
            $validated = $request->validate([
                'referenceid' => 'required|string|max:255'
            ]);

            $referenceId = $validated['referenceid'];

            // API configuration
            $apiUrl = "https://sit.paysprint.in/service-api/api/v1/service/bill-payment/lpg/status";
            $token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lc3RhbXAiOjE3Mzk3OTc1MzUsInBhcnRuZXJJZCI6IlBTMDAxNTY4IiwicmVxaWQiOiIxNzM5Nzk3NTM1In0.d-5zd_d8YTFYC0pF68wG6qqlyrfNUIBEuvxZ77Rxc0M";
            $authKey = "Y2RkZTc2ZmNjODgxODljMjkyN2ViOTlhM2FiZmYyM2I=";

            // Make API request
            $response = Http::withHeaders([
                'Content-Type' => 'application/json',
                'Token' => $token,
                'Authorisedkey' => $authKey,
                'Accept' => 'application/json',
            ])->post($apiUrl, [
                'referenceid' => $referenceId
            ]);

            // Log the API response for debugging
            Log::info('LPG API Response', [
                'status' => $response->status(),
                'body' => $response->json()
            ]);

            $responseData = $response->json();

            // Check if we have a valid response
            if (!$response->successful()) {
                throw new \Exception('API request failed: ' . ($responseData['message'] ?? 'Unknown error'));
            }

            // Process and store the data
            $statusData = [
                'reference_id' => $referenceId,
                'txnid' => $responseData['data']['txnid'] ?? null,
                'operator_name' => $responseData['data']['operatorname'] ?? null,
                'customer_number' => $responseData['data']['canumber'] ?? null,
                'amount' => $responseData['data']['amount'] ?? 0,
                'tds' => $responseData['data']['tds'] ?? 0,
                'operator_id' => $responseData['data']['operatorid'] ?? null,
                'refid' => $responseData['data']['refid'] ?? null,
                'date_added' => $responseData['data']['dateadded'] ?? now(),
                'refunded' => isset($responseData['data']['refunded']) ? $responseData['data']['refunded'] === "1" : false,
                'date_refunded' => $responseData['data']['daterefunded'] ?? null,
                'message' => $responseData['message'] ?? null
            ];

            // Update or create the record
            LPGStatus::updateOrCreate(
                ['reference_id' => $referenceId],
                $statusData
            );

            return response()->json($responseData);

        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('LPG Status Validation Error', ['errors' => $e->errors()]);
            return response()->json([
                'status' => false,
                'message' => 'Invalid input provided',
                'errors' => $e->errors()
            ], 422);

        } catch (\Exception $e) {
            Log::error('LPG Status Error', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'status' => false,
                'message' => 'An error occurred while processing your request. Please try again.'
            ], 500);
        }
    }
}
