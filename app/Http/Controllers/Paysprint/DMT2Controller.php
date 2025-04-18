<?php

namespace App\Http\Controllers\Paysprint;

use App\Models\Beneficiary;
use App\Models\Registerremitter;
use App\Models\Remitter;
use App\Models\RemitterAadharVerify;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class DMT2Controller
{
    public function loginCheck(){
        return example();
        return Auth::id() ? Auth::id() : Inertia::render('loginPage');
    }
    public function searchRemitter(Request $request)
    {    
        // Validate mobile number
        $request->validate([
            'mobile' => 'required|digits:10'
        ]);
        // dd($request->all());     
        
        // API endpoint and headers
        $url = 'https://uat.nikatby.in/forwarding/public/api/dmt2/Remitter2/queryRemitter';
        $headers = [
            "X-API-KEY" => "DyCiDJMcvTZgJLBcYohezUEPJNPXYzR5jNyrxQRi",
            // 'Authorisedkey' => 'Y2RkZTc2ZmNjODgxODljMjkyN2ViOTlhM2FiZmYyM2I=',
            // 'Content-Type' => 'application/json',
            // 'Token' => 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lc3RhbXAiOjE3NDMyMjk2MDcsInBhcnRuZXJJZCI6IlBTMDAxNTY4IiwicmVxaWQiOiIxNzQzMjI5NjA3In0.aczBhvb53rst9BlgRB_L-ePFzKfNQTXPRUKUtezvfxM',
            // 'accept' => 'application/json',
        ];
        
        // Body data to be sent
        $body = [
            'mobile' => $request->mobile,
        ];
        
        
        try {
            $count = 0;
            // dd($url);
            // Sending the POST request with headers and body
            $response = Http::withHeaders($headers)->post($url, $body);
            if ($response->successful()) {
                // dd(Auth::id());
                $count++;
                $status = $response['data']['status'] ?? false;
                $responsecode = $response['data']['response_code'] ?? 0;
                $message = $response['data']['message'];
                $limit = $response['data']['data']['limit'] ?? null;
                $mobile = $response['data']['data']['mobile'] ?? null;
                // $uid = Auth::id() ?? null;
                // dd($uid);
                // dd($mobile);
                Remitter::updateOrCreate(
                    ['mobile' => $mobile],  // Search criteria
                    // ['userId' => $uid],
                    [
                        'userId' => Auth::id(),
                        'status' => $status,
                        'responsecode' => $responsecode,          // Fields to update or insert
                        'message' => $message,
                        'limit' => $limit,
                        'apihitcount' => $count,
                    ]
                );
                return response()->json([
                    'remitter' => [
                        'data' => $response->json(),
                        'name' => $response['data']['message'],
                        'mobile' => $response['data']['data']['mobile'],
                    ]
                ], 200);
                // // dd("HI");
                // $responseData = $response->json();
                // return response()->json($responseData);
                // return inertia('SearchRemitter', ['remitter' => $response->json()]);
            } else {
                return response()->json([
                    // 'remitter' => [
                    //     'name' => $response['message']->data(),
                    //     'mobile' => $response['data']['mobile'],
                    // ]
                    'error' => "Remitter not found or API error",
                    'userId' => null,
                    'status' => false
                ]);
                // return inertia('SearchRemitter', ['error' => 'Remitter not found or API error']);
            }
        } catch (\Exception $e) {
            // return inertia('SearchRemitter', ['error' => 'Failed to connect to the API']);
            return response()->json([
                // 'remitter' => [
                //     'name' => $response['message']->data(),
                //     'mobile' => $response['data']['mobile'],
                // ]
                'error' => "Failed to connect to the API",
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
    public function remitterAadharVerify(Request $request){
        // dd('HI');
        $validatedData = $request->validate([
            'mobile' => ['required', 'digits:10'],
            'aadhaar_no' => ['required', 'digits:16'],
        ]);
    
        $url = 'https://uat.nikatby.in/forwarding/public/api/dmt2/Remitter2/verifyAadhaar';
        $headers = [
            "X-API-KEY" => "DyCiDJMcvTZgJLBcYohezUEPJNPXYzR5jNyrxQRi",
            // 'Authorisedkey' => 'Y2RkZTc2ZmNjODgxODljMjkyN2ViOTlhM2FiZmYyM2I=',
            // 'Content-Type' => 'application/json',
            // 'Token' => 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lc3RhbXAiOjE3NDMyMjk2MDcsInBhcnRuZXJJZCI6IlBTMDAxNTY4IiwicmVxaWQiOiIxNzQzMjI5NjA3In0.aczBhvb53rst9BlgRB_L-ePFzKfNQTXPRUKUtezvfxM',
            // 'accept' => 'application/json',
        ];
    
        $body = [
            'mobile' => $validatedData['mobile'],
            'aadhaar_no' => $validatedData['aadhaar_no'],
        ];
    
        try {
            // dd("HI");
            $response = Http::withHeaders($headers)->post($url, $body);
            // dd($response['message']);
    
            if ($response->successful()) {
                // dd($response['apiData']['stateresp']);
                RemitterAadharVerify::updateOrCreate(
                    ['mobile' => $request->mobile] ?? null,
                    [
                    'status' => $response['apiData']['status'] ?? false,
                    'response_code' => $response['apiData']['response_code'] ?? '0',
                    'message' => $response['apiData']['message'] ?? null,
                    'stateresp' => $response['apiData']['stateresp'] ?? "NOt Applicable",
                    'aadhaar_no' => $request->aadhaar_no
                ]);
                return response()->json([
                    'success' => true,
                    'message' => $response['apiData']['stateresp'],
                    'data' => $response->json(),
                ], 200);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Remitter not found or API error',
                ], 400);
            }
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to connect to the API: ' . $e->getMessage(),
            ], 500);
        }
    }
    public function registerRemitter(Request $request){
        return Inertia::render('registerRemitter');
    }
    public function store(Request $request)
    {
        // dd('hi');
        $validatedData = $request->validate([
            'mobile' => 'required|string|size:10',
            'otp' => 'required|string',
            'state_response' => 'required|string',  // Field name consistency with frontend
            'pid' => 'required|string',
            'accessMode' => 'required|string|in:SITE,APP',
            'isIris' => 'required|string',
        ]);
    
        $url = 'https://uat.nikatby.in/forwarding/public/api/dmt2/Remitter2/registerRemitter';
        $headers = [
            "X-API-KEY" => "DyCiDJMcvTZgJLBcYohezUEPJNPXYzR5jNyrxQRi",
            // 'Authorisedkey' => 'Y2RkZTc2ZmNjODgxODljMjkyN2ViOTlhM2FiZmYyM2I=',
            // 'Content-Type' => 'application/json',
            // 'Token' => 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lc3RhbXAiOjE3NDMyMjk2MDcsInBhcnRuZXJJZCI6IlBTMDAxNTY4IiwicmVxaWQiOiIxNzQzMjI5NjA3In0.aczBhvb53rst9BlgRB_L-ePFzKfNQTXPRUKUtezvfxM',
            // 'accept' => 'application/json',
        ];
    
        $body = [
            'mobile' => $validatedData['mobile'],
            'otp' => $validatedData['otp'],
            'stateresp' => $validatedData['state_response'],  // Field name consistency with frontend
            'data' => $validatedData['pid'],
            'accessmode' => $validatedData['accessMode'],
            'is_iris' => $validatedData['isIris'],
        ];
    
        try {
            $response = Http::withHeaders($headers)->post($url, $body);
    
            if ($response->successful()) {
                // dd($validatedData['state_response']);
                // Store or update the remitter record
                Registerremitter::updateOrCreate(
                    ['mobile' => $validatedData['mobile']],
                    [
                        'userId' => Auth::id(),
                        'otp' => $request->otp,
                        'state_response' => $validatedData['state_response'],  // Field name consistency with frontend
                        'pid' => $validatedData['pid'],
                        'accessMode' => $validatedData['accessMode'],
                        'isIris' => $validatedData['isIris'],
                    ]
                );
    
                // Return with success message
                return response()->json([
                    'success' => false,
                    'message' => $response->json()
                ], 200);
                // return redirect()->back()->with('success', 'Remitter registered successfully.');
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Remitter not found or API error or Check Token or key',
                ], 400);
                // return redirect()->back()->withErrors(['message' => 'Failed to connect to the API or API response was not successful.']);
            }
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to connect to the API: ' . $e->getMessage(),
            ], 500);
        }
    }
    public function registerBeneficiary(){
        return Inertia::render('Beneficiary/BeneficiaryRegister');
    }
    public function registerBeneficiaryStore(Request $request)
    {
        $validatedData = $request->validate([
            'mobile' => 'required|string|size:10',
            'beneficiaryName' => 'required|string',
            'bankId' => 'required|string',
            'accountNumber' => 'required|string',
            'ifsccode' => 'required|string',
            'verified' => 'required|in:0,1',
        ]);
        $url = "https://uat.nikatby.in/forwarding/public/api/dmt2/beneficiaries/register";
        $headers = [
            "X-API-KEY" => "DyCiDJMcvTZgJLBcYohezUEPJNPXYzR5jNyrxQRi",
            // 'Authorisedkey' => 'Y2RkZTc2ZmNjODgxODljMjkyN2ViOTlhM2FiZmYyM2I=',
            // 'Content-Type' => 'application/json',
            // 'Token' => 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lc3RhbXAiOjE3NDMyMjk2MDcsInBhcnRuZXJJZCI6IlBTMDAxNTY4IiwicmVxaWQiOiIxNzQzMjI5NjA3In0.aczBhvb53rst9BlgRB_L-ePFzKfNQTXPRUKUtezvfxM',
            // 'accept' => 'application/json',
        ];
        $body = [
            'mobile' => $validatedData['mobile'],
            'benename' => $validatedData['beneficiaryName'],
            'bankid' => $validatedData['bankId'],  // Field name consistency with frontend
            'accno' => $validatedData['accountNumber'],
            'ifsccode' => $validatedData['ifsccode'],
            'verified' => $validatedData['verified'],
        ];
        try{
            $response = Http::withHeaders($headers)->post($url, $body);
            // if($response){
            //     dd($response['data']['bene_id']);
            // }
            if($response->successful()){
                // dd($response['responseData']['message']);
        // Store or update the beneficiary record
                Beneficiary::updateOrCreate(
                    ['mobile' => $request->mobile ?? null],
                    [
                     'status' => $response['responseData']['status'] ?? false,
                     'responsecode' => $response['responseData']['response_code'] ?? null,
                     'beneid' => $response['responseData']['data']['bene_id'] ?? null,
                     'bankid' => $response['responseData']['data']['bankid'] ?? null,
                     'bankname' => $response['responseData']['data']['bankname'] ?? null,
                     'beneficiary_name' => $response['responseData']['data']['name'] ?? null,
                     'accountnumber' => $response['responseData']['data']['accno'] ?? null,
                     'ifsccode' => $response['responseData']['data']['ifsc'] ?? null,
                     'verified' => $response['responseData']['data']['verified'] ?? "0",
                     'banktype' => $response['responseData']['data']['banktype'] ?? null,
                     'userstatus'   => $response['responseData']['data']['status'] ?? null,
                     'bank3'    => $response['responseData']['data']['bank3'] ?? null,
                     'message'  => $response['responseData']['message'] ?? "No Message",
                    ]
                );
                return response()->json([
                    'message' => $response['responseData']['message'],
                    'data' => $response->json(),
                ]);
            }

        }
        catch(\Exception $e){
            return response()->json([
                'success' => false,
                'message' => 'Failed to connect to the API: ' . $e->getMessage(),
            ], 500);
        }
    }
    public function deleteBeneficiary(){
        return Inertia::render('Beneficiary/Deletebeneficiary');
    }
    public function deleteBeneficiaryStore(Request $request)
    {
       $validated = $request->validate([
           'mobile' => 'required|digits:10',
           'beneficiaryId' => 'required|numeric',
       ]);  
       $url = "http://127.0.0.1:8000/api/dmt2/beneficiaries/destroy";
       $headers = [
        'Authorisedkey' => 'Y2RkZTc2ZmNjODgxODljMjkyN2ViOTlhM2FiZmYyM2I=',
        'Content-Type' => 'application/json',
        'Token' => 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lc3RhbXAiOjE3NDMyMjk2MDcsInBhcnRuZXJJZCI6IlBTMDAxNTY4IiwicmVxaWQiOiIxNzQzMjI5NjA3In0.aczBhvb53rst9BlgRB_L-ePFzKfNQTXPRUKUtezvfxM',
        'accept' => 'application/json',
     ];
     $body = [
        'mobile' => $validated['mobile'],
        'bene_id' => $validated['beneficiaryId'],
     ];

       try {
            $response = Http::withHeaders($headers)->post($url, $body);
            if($response->successful()){
                // dd('comings');
                $beneficiary = Beneficiary::where('mobile', $request->mobile)
               ->where('beneid', $request->beneficiaryId)
               ->first(); 
               if (!$beneficiary) {
                return response()->json(['success' => false, 'message' => 'Beneficiary not found.'], 404);
                } 
                else
                { 
                $beneficiary->delete();
            //    dd($beneficiary);
                return response()->json([
                    'status' => true,
                    'message' => $response['response']['message'],
                ]);
             }
            }
            else{
                return response()->json([
                    'status' => false,
                    'message' => $response['response']['message'],
                ]);
            }
        //     $beneficiary = Beneficiary::where('mobile', $validated['mobile'])
        //        ->where('id', $validated['beneficiaryId'])
        //        ->first();   
        //    if (!$beneficiary) {
        //        return response()->json(['success' => false, 'message' => 'Beneficiary not found.'], 404);
        //    }   
        //    $beneficiary->delete();   
        //    return response()->json(['success' => true, 'message' => 'Beneficiary deleted successfully.']);
       } catch (\Exception $e) {
           return response()->json(['success' => false, 'message' => 'Deletion failed.', 'error' => $e->getMessage()], 500);
       }
    }
    public function fetchBeneficiary(){
        // dd('Fetched');
        return Inertia::render('Beneficiary/Fetchbeneficiary');
    }
    public function fetchBeneficiaryDetail(Request $request){
        // dd('Hi');
        $validated = $request->validate([
            'mobile' => 'required|digits:10',
        ]);
        $url = "http://127.0.0.1:8000/api/dmt2/beneficiaries/fetch";
        $headers = [
            'Authorisedkey' => 'Y2RkZTc2ZmNjODgxODljMjkyN2ViOTlhM2FiZmYyM2I=',
            'Content-Type' => 'application/json',
            'Token' => 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lc3RhbXAiOjE3NDMyMjk2MDcsInBhcnRuZXJJZCI6IlBTMDAxNTY4IiwicmVxaWQiOiIxNzQzMjI5NjA3In0.aczBhvb53rst9BlgRB_L-ePFzKfNQTXPRUKUtezvfxM',
            'accept' => 'application/json',
         ];
         $body = [
            'mobile' => $validated['mobile']
         ];

        try {
            $response = Http::withHeaders($headers)->post($url, $body);
            if($response->successful()){
                $beneficiary = Beneficiary::where('mobile', $request->mobile)->first();
                if (!$beneficiary) {
                    return response()->json([
                        'status' => false,
                        'message' => "Beneficiary Not Exist.",
                    ]);
                }
                return response()->json([
                    'status' => true,
                    'message' => 'Beneficiary Successfully Fetched',
                    'data' => $beneficiary
                ]);
            }
            else{
                return response()->json([
                    'status' => false,
                    'message' => "Beneficiary Not Exist Or Might be some technical issues facing.",
                ]);
            }
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'An error occurred while fetching beneficiary.', 'error' => $e->getMessage()], 500);
        }
    }
    public function searchByBeneId()
    {
        return Inertia::render('Beneficiary/Searchbybeneid');
    }
    public function searchByBeneIdStore(Request $request){
        // dd('HIl');
        $validated = $request->validate([
            'mobile' => 'required|digits:10',
            'bene_id' => 'required|numeric',
        ]);
        $url = "http://127.0.0.1:8000/api/dmt2/beneficiaries/fetchBeneficiaryData";
        $headers = [
            'Authorisedkey' => 'Y2RkZTc2ZmNjODgxODljMjkyN2ViOTlhM2FiZmYyM2I=',
            'Content-Type' => 'application/json',
            'Token' => 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lc3RhbXAiOjE3NDMyMjk2MDcsInBhcnRuZXJJZCI6IlBTMDAxNTY4IiwicmVxaWQiOiIxNzQzMjI5NjA3In0.aczBhvb53rst9BlgRB_L-ePFzKfNQTXPRUKUtezvfxM',
            'accept' => 'application/json',
         ];
         $body = [
            'mobile' => $validated['mobile'],
            'beneid' => $validated['bene_id']
         ];

        try {
            $response = Http::withHeaders($headers)->post($url, $body);
            if($response->successful()){
                $beneficiary = Beneficiary::where('mobile', $request->mobile)
                ->where('beneid', $request->bene_id)
                ->first();
                if (!$beneficiary) {
                    return response()->json([
                        'status' => false,
                        'message' => 'Beneficiary not exist.',
                    ]);
                }
                return response()->json([
                    'status' => true,
                    'data' => $beneficiary,
                    'message' => "Fetched Successfuly"
                ]);
            }
            else{
                return response()->json([
                    'status' => false,
                    'message' => "Beneficiary not exist or Facing Technical Glitch.",
                ]);
            }
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'An error occurred while searching.', 'error' => $e->getMessage()], 500);
        }
    }
    public function pennyDropForm()
    {
        return Inertia::render('Transaction/Pennydrop');
    }
    public function pennyDrop(Request $request)
    {
        $validated = $request->validate([
            'mobile' => 'required|digits:10',
            'accno' => 'required',
            'bankid' => 'required',
            'benename' => 'required',
            'referenceid' => 'required',
            'pincode' => 'required',
            'address' => 'required',
            'dob' => 'required|date',
            'gst_state' => 'required',
            'bene_id' => 'required',
        ]);
        $url = "http://127.0.0.1:8000/api/dmt2/Transaction2/pennyDrop";
        $headers = [
            'Authorisedkey' => 'Y2RkZTc2ZmNjODgxODljMjkyN2ViOTlhM2FiZmYyM2I=',
            'Content-Type' => 'application/json',
            'Token' => 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lc3RhbXAiOjE3NDMyMjk2MDcsInBhcnRuZXJJZCI6IlBTMDAxNTY4IiwicmVxaWQiOiIxNzQzMjI5NjA3In0.aczBhvb53rst9BlgRB_L-ePFzKfNQTXPRUKUtezvfxM',
            'accept' => 'application/json',
         ];
         $body = [
            "mobile"=> $validated['mobile'],
            "accno"=> $validated['accno'],
            "bankid"=> $validated['bankid'],
            "benename"=> $validated['benename'],
            "referenceid"=> $validated['referenceid'],
            "pincode"=> $validated['pincode'],
            "address"=> $validated['address'],
            "dob"=> $validated['dob'],
            "gst_state"=> $validated['gst_state'],
            "bene_id"=> $validated['bene_id'],
         ];

        try {
            $response = Http::withHeaders($headers)->post($url, $body);
            if($response->successful()){
                $response = [
                    'success' => true,
                    'message' => 'Transaction Successful',
                    'data' => $response->json()
                ];
            }
            else{
                $response = [
                    'success' => false,
                    'message' => 'Getting Somethings Wrong',
                    'data' => $response->json()
                ];
            }
            // Dummy response for demonstration purposes
            

            return response()->json($response);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Verification failed', 'error' => $e->getMessage()], 500);
        }
    }
    public function transactionSendOtpForm()
    {
        return Inertia::render('Transaction/Transactionsendotp');
    }
    public function transactionSendOtp(Request $request)
    {
        // dd($request->all());
        $validator = $request->validate([
            'mobile_number' => 'required|digits:10',
            'reference_id' => 'required|string',
            'bene_id' => 'required|string',
            'txntype' => 'required|in:imps,neft', // Updated here
            'amount' => 'required|numeric',
            'pincode' => 'nullable|digits:6',
            'address' => 'nullable|string',
            'gst_state' => 'nullable|string',
            'dob' => 'nullable|date',
            'lat' => 'nullable|numeric',
            'long' => 'nullable|numeric',
        ]);
        // dd('OTP');
        // if ($validator->fails()) {
        //     return response()->json(['errors' => $validator->errors()], 422);
        // }
        // dd('otp');
        $url = "http://127.0.0.1:8000/api/dmt2/Transaction2/transactionSentOtp";
        $headers = [
            'Authorisedkey' => 'Y2RkZTc2ZmNjODgxODljMjkyN2ViOTlhM2FiZmYyM2I=',
            'Content-Type' => 'application/json',
            'Token' => 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lc3RhbXAiOjE3NDMyMjk2MDcsInBhcnRuZXJJZCI6IlBTMDAxNTY4IiwicmVxaWQiOiIxNzQzMjI5NjA3In0.aczBhvb53rst9BlgRB_L-ePFzKfNQTXPRUKUtezvfxM',
            'accept' => 'application/json',
         ];
         $body = [
                'mobile' => $validator['mobile_number'],
                'referenceid' => $validator['reference_id'],
                'bene_id' => $validator['bene_id'],
                'txntype' => $validator['txntype'],
                'dob' => $validator['dob'],
                'amount' => $validator['amount'],
                'pincode' => $validator['pincode'] ?? '',
                'address' => $validator['address'] ?? '',
                'gst_state' => $validator['gst_state'] ?? '',
                'lat' => $validator['lat'] ?? '',
                'long' => $validator['long'] ?? '',
                // 'otp' => $validatedData['otp'],
                // 'stateresp' => $validatedData['stateresp'],
         ];
         try {
            $response = Http::withHeaders($headers)->post($url, $body);
            if($response->successful()){
                // dd('dhbfhf');
                $response = [
                    'success' => true,
                    'message' => 'Transaction Successful1',
                    'data' => $response->json()
                ];
            }
            else{
                $response = [
                    'success' => false,
                    'message' => 'Getting Somethings Wrong',
                    'data' => $response->json()
                ];
            }
            // Dummy response for demonstration purposes
            

            return response()->json($response);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Verification failed', 'error' => $e->getMessage()], 500);
        }
    }
    public function TranSaction(){
        return Inertia::render('Transaction/transaction');
    }
    public function TranSactionStore(Request $request){
        // dd('rGSDFGs');
        // dd($request->all());
        $validatedData = $request->validate([
            'mobile' => 'required|string',
            'referenceid' => 'required|string',
            'pincode' => 'required|string',
            'address' => 'required|string',
            'amount' => 'required|string',
            'txntype' => 'required|string',
            'dob' => 'required|string',
            'gst_state' => 'required|string',
            'bene_id' => 'required|string',
            'otp' => 'required|string',
            'stateresp' => 'required|string',
            'lat' => 'nullable|string',
            'long' => 'nullable|string',
        ]);

        try {
            $response = Http::withHeaders([
                'Authorisedkey' => 'Y2RkZTc2ZmNjODgxODljMjkyN2ViOTlhM2FiZmYyM2I=',
                'Content-Type' => 'application/json',
                'Token' => 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lc3RhbXAiOjE3NDMyMjk2MDcsInBhcnRuZXJJZCI6IlBTMDAxNTY4IiwicmVxaWQiOiIxNzQzMjI5NjA3In0.aczBhvb53rst9BlgRB_L-ePFzKfNQTXPRUKUtezvfxM',
                'accept' => 'application/json',
            ])->post('http://127.0.0.1:8000/api/dmt2/Transaction2/transaction', $validatedData);

            if ($response->successful()) {
                // dd('bdbd');
                return response()->json($response->json(), 200);
            }
            else{
                return response()->json($response->json(), 200);
            }

            return response()->json(['error' => 'Transaction failed', 'details' => $response->json()], $response->status());
        } catch (\Exception $e) {
            return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
        }
    }
    public function transactionStatus()
    {
        return Inertia::render('Transaction/Transactionstatus');
    }
    public function transactionstatusstore(Request $request){
        // dd('Transaction Store');
        $validatedData = $request->validate([
            'referenceid' => 'required|string',
        ]);

        try {
            $response = Http::withHeaders([
                'Authorisedkey' => 'Y2RkZTc2ZmNjODgxODljMjkyN2ViOTlhM2FiZmYyM2I=',
                'Content-Type' => 'application/json',
                'Token' => 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lc3RhbXAiOjE3NDMyMjk2MDcsInBhcnRuZXJJZCI6IlBTMDAxNTY4IiwicmVxaWQiOiIxNzQzMjI5NjA3In0.aczBhvb53rst9BlgRB_L-ePFzKfNQTXPRUKUtezvfxM',
                'accept' => 'application/json',
            ])->post('http://127.0.0.1:8000/api/dmt2/Transaction2/transactionStatus', $validatedData);

            if ($response->successful()) {
                return response()->json($response->json(), 200);
            }

            return response()->json(['error' => 'Status fetch failed', 'details' => $response->json()], $response->status());
        } catch (\Exception $e) {
            return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
        }
    }
    public function refundOtp()
    {
        return Inertia::render('Refund/Refundotp');
    }
    public function refundOtpStore(Request $request){
        // dd('jebbcbjcc');
        $validatedData = $request->validate([
            'referenceid' => 'required|string',
            'acknowledgmentno' => 'required|string',
        ]);
        $body = [
            'referenceid' => $validatedData['referenceid'],
            'ackno' => $validatedData['acknowledgmentno']
        ];

        try {
            $response = Http::withHeaders([
                "X-API-KEY" => "DyCiDJMcvTZgJLBcYohezUEPJNPXYzR5jNyrxQRi",
                // 'Authorisedkey' => 'Y2RkZTc2ZmNjODgxODljMjkyN2ViOTlhM2FiZmYyM2I=',
                // 'Content-Type' => 'application/json',
                // 'Token' => 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lc3RhbXAiOjE3NDMyMjk2MDcsInBhcnRuZXJJZCI6IlBTMDAxNTY4IiwicmVxaWQiOiIxNzQzMjI5NjA3In0.aczBhvb53rst9BlgRB_L-ePFzKfNQTXPRUKUtezvfxM',
                // 'accept' => 'application/json',
            ])->post('https://uat.nikatby.in/forwarding/public/api/dmt2/Refund2/refundOtp', $body);

            if ($response->successful()) {
                return response()->json($response->json(), 200);
            }
            else{
                return response()->json($response->json(), 412);
            }

            return response()->json(['error' => 'Resend OTP failed', 'details' => $response->json()], $response->status());
        } catch (\Exception $e) {
            return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
        }
    }
    public function claimRefund(){
        return Inertia::render('Refund/Claimrefund');
    }
    public function claimRefundStore(Request $request){
        // dd('fff');
        $validatedData = $request->validate([
            'ackno' => 'required|string',
            'referenceid' => 'required|string',
            'otp' => 'required|string',
        ]);
        $url = "https://uat.nikatby.in/forwarding/public/api/dmt2/Refund2/processRefund";
        $body = [
            'referenceid' => $validatedData['referenceid'],
            'ackno' => $validatedData['ackno'],
            'otp' => $validatedData['otp']
        ];

        try {
            $response = Http::withHeaders([
                "X-API-KEY" => "DyCiDJMcvTZgJLBcYohezUEPJNPXYzR5jNyrxQRi",
                // 'Authorisedkey' => 'Y2RkZTc2ZmNjODgxODljMjkyN2ViOTlhM2FiZmYyM2I=',
                // 'Content-Type' => 'application/json',
                // 'Token' => 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lc3RhbXAiOjE3NDMyMjk2MDcsInBhcnRuZXJJZCI6IlBTMDAxNTY4IiwicmVxaWQiOiIxNzQzMjI5NjA3In0.aczBhvb53rst9BlgRB_L-ePFzKfNQTXPRUKUtezvfxM',
                // 'accept' => 'application/json',
            ])->post($url, $body);

            if ($response->successful()) {
                return response()->json($response->json(), 200);
            }
            else
            {
                return response()->json($response->json(), 200);
            }

            // return response()->json(['error' => 'Claim Refund failed', 'details' => $response->json()], $response->status());
        } catch (\Exception $e) {
            return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
        }
        
    }
}

