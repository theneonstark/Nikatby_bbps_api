<?php

namespace App\Http\Controllers\Paysprint;

use App\Models\InsuranceBillDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class InsurancePremiumPaymentController
{
    public function fetchInsuranceBillDetails()
    {
        return Inertia::render('InsurancePremiumPayment/FetchInsuranceBillDetails');
    }
    public function fetchLICBill(Request $request)
{
    $request->validate([
        'canumber' => 'required|numeric',
        'ad1' => 'required|email',
        'ad2' => 'required|date',
        'mode' => 'required|in:online'
    ]);

    try {
        $response = Http::withHeaders([
            "X-API-KEY" => "DyCiDJMcvTZgJLBcYohezUEPJNPXYzR5jNyrxQRi",
            // 'Token' => 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lc3RhbXAiOjE3Mzk3OTc1MzUsInBhcnRuZXJJZCI6IlBTMDAxNTY4IiwicmVxaWQiOiIxNzM5Nzk3NTM1In0.d-5zd_d8YTFYC0pF68wG6qqlyrfNUIBEuvxZ77Rxc0M',
            // 'Authorisedkey' => 'Y2RkZTc2ZmNjODgxODljMjkyN2ViOTlhM2FiZmYyM2I=',
            // 'accept' => 'application/json',
            // 'content-type' => 'application/json'
        ])->post('https://uat.nikatby.in/forwarding/public/api/utility/InsurancePremiumPayment/fetchLICBill', [
            'canumber' => $request->canumber,
            'ad1' => $request->ad1,
            'ad2' => $request->ad2,
            'mode' => $request->mode
        ]);

        $data = $response->json();

        if ($data['response_code'] == 1 && $data['status'] === true) {
            InsuranceBillDetail::create([
                'canumber' => $request->canumber,
                'ad1' => $request->ad1,
                'ad2' => $request->ad2,
                'mode' => $request->mode,
                'status' => $data['status'],
                'amount' => $data['amount'],
                'name' => $data['name'],
                'duedate' => $data['duedate'],
                'bill_fetch' => json_encode($data['bill_fetch']),
                'ad3' => $data['ad3'] ?? null,
                'message' => $data['message'],
                'billAmount' => $data['bill_fetch']['billAmount'],
                'billnetamount' => $data['bill_fetch']['billnetamount'],
                'bill_dueDate' => $data['bill_fetch']['dueDate'],
                'maxBillAmount' => $data['bill_fetch']['maxBillAmount'],
                'acceptPayment' => $data['bill_fetch']['acceptPayment'],
                'acceptPartPay' => $data['bill_fetch']['acceptPartPay'],
                'cellNumber' => $data['bill_fetch']['cellNumber'],
                'userName' => $data['bill_fetch']['userName'],
            ]);
        }

        return response()->json($data);
    } catch (\Exception $e) {
        return response()->json([
            'error' => 'Failed to fetch bill details',
            'message' => $e->getMessage()
        ], 500);
    }
}


    public function payInsuranceBill(Request $request)
    {
        if ($request->isMethod('get')) {
            return Inertia::render('InsurancePremiumPayment/PayInsuranceBill');
        }

        $response = Http::withHeaders([
            "X-API-KEY" => "DyCiDJMcvTZgJLBcYohezUEPJNPXYzR5jNyrxQRi",
            // 'Authorisedkey' => 'Y2RkZTc2ZmNjODgxODljMjkyN2ViOTlhM2FiZmYyM2I=',
            // 'Token' => 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lc3RhbXAiOjE3Mzk3OTc1MzUsInBhcnRuZXJJZCI6IlBTMDAxNTY4IiwicmVxaWQiOiIxNzM5Nzk3NTM1In0.d-5zd_d8YTFYC0pF68wG6qqlyrfNUIBEuvxZ77Rxc0M',
            // 'accept' => 'application/json',
            // 'content-type' => 'application/json',
        ])->post('https://uat.nikatby.in/forwarding/public/api/utility/InsurancePremiumPayment/payInsuranceBill', [
            'canumber' => $request->canumber,
            'mode' => 'online',
            'amount' => $request->amount,
            'ad1' => "nitesh@rnfiservices.com",
            'ad2' => "DD/MM/YYYY",
            'ad3' => "HGAYV15E560507155",
            'referenceid' => $request->referenceid,
            'latitude' => 27.2232,
            'longitude' => 78.26535,
            'bill_fetch' => [
                'billNumber' => "LICI2122000037468013",
                'billAmount' => "1548.00",
                'billnetamount' => "1548.00",
                'billdate' => "25-05-2021 00:44:29",
                'acceptPayment' => true,
                'acceptPartPay' => false,
                'cellNumber' => "905514651",
                'dueFrom' => "11/05/2021",
                'dueTo' => "11/05/2021",
                'validationId' => "HGA8V00A110382264047",
                'billId' => "HGA8V00A110382264047B"
            ]
        ]);

        return response()->json($response->json());
    }

    public function insuranceStatusEnquiry()
    {
        return Inertia::render('InsurancePremiumPayment/InsuranceStatusEnquiry');
    }
    public function fetchInsuranceStatus(Request $request)
    {
        // Validate input
        $request->validate([
            'referenceid' => 'required|string',
        ]);

        $referenceId = $request->input('referenceid');

        // API request
        $response = Http::withHeaders([
            "X-API-KEY" => "DyCiDJMcvTZgJLBcYohezUEPJNPXYzR5jNyrxQRi",
            // 'Token' => 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lc3RhbXAiOjE3Mzk3OTc1MzUsInBhcnRuZXJJZCI6IlBTMDAxNTY4IiwicmVxaWQiOiIxNzM5Nzk3NTM1In0.d-5zd_d8YTFYC0pF68wG6qqlyrfNUIBEuvxZ77Rxc0M',
            // 'Authorisedkey' => 'Y2RkZTc2ZmNjODgxODljMjkyN2ViOTlhM2FiZmYyM2I=',
            // 'Accept' => 'application/json',
            // 'Content-Type' => 'application/json',
        ])->post('https://uat.nikatby.in/forwarding/public/api/utility/InsurancePremiumPayment/fetchInsuranceStatus', [
            'referenceid' => $referenceId,
        ]);

        return response()->json($response->json());
    }
}
