<?php

namespace App\Helpers;

use App\Models\Apilogs;

class Permission
{

    public static function curl($url, $method = 'POST', $parameters, $header, $log = "no", $modal = "none", $txnid = "none")
    {
        // dd('Curl');
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_MAXREDIRS, 10);
        curl_setopt($curl, CURLOPT_ENCODING, "");
        curl_setopt($curl, CURLOPT_TIMEOUT, 0);
        curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($curl, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
        curl_setopt($curl, CURLOPT_CUSTOMREQUEST, $method);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($curl, CURLOPT_VERBOSE, true);
        // ✅ Convert array to URL-encoded string if method is POST
        if (!empty($parameters)) {
            if (is_array($parameters)) {
                $parameters = http_build_query($parameters);
            }
            curl_setopt($curl, CURLOPT_POSTFIELDS, $parameters);
        }

        // ✅ Ensure headers are properly set
        if (!empty($header) && is_array($header)) {
            curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
        }

        $response = curl_exec($curl);
        $err = curl_error($curl);
        $code = curl_getinfo($curl, CURLINFO_HTTP_CODE);
        curl_close($curl);
        if ($log != "no") {
            Apilogs::create([
                "url" => $url,
                "modal" => $modal,
                "txnid" => $txnid,
                "header" => $header,
                "request" => $parameters,
                "response" => $response
            ]);
        }
        // dd($response);
        return ["response" => $response, "error" => $err, 'code' => $code];
    }

    public static function generateRequestId()
    {
        // Generate a random alphanumeric string of length 27
        $randomPart = substr(str_shuffle(str_repeat('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 10)), 0, 27);

        // Get the current date and time
        $now = now(); // Laravel helper for current timestamp

        // Format the timestamp part
        $yearLastDigit = substr($now->year, -1); // Last digit of the year
        $dayOfYear = str_pad($now->dayOfYear, 3, '0', STR_PAD_LEFT); // Day of the year (padded to 3 digits)
        $hourMinute = $now->format('Hi'); // HHmm format

        // Concatenate parts to form the requestId
        return $randomPart . $yearLastDigit . $dayOfYear . $hourMinute;
    }

    public static function generateTransactionId()
    {
        // Prefix 'CC'
        $prefix = 'CC';

        // Generate a 2-digit random number (e.g., 01)
        $randomNumber = str_pad(rand(1, 99), 2, '0', STR_PAD_LEFT);

        // Generate 3 random letters (A-Z)
        $randomLetters = strtoupper(bin2hex(random_bytes(2))); // Generates 3 characters in uppercase

        // Generate a 5-digit random number
        $randomDigits = str_pad(rand(10000, 99999), 5, '0', STR_PAD_LEFT);

        // Combine to form the 12-character transaction ID
        $transactionId = $prefix . $randomNumber . $randomLetters . $randomDigits;

        return $transactionId;
    }
    public static function generateComplaintId()
    {
        $prefix = 'CC';

        // Generate a 2-digit random number (e.g., 01)
        $randomNumber = str_pad(rand(1, 99), 2, '0', STR_PAD_LEFT);

        // Generate 4 random uppercase letters (A-Z)
        $randomLetters = strtoupper(bin2hex(random_bytes(3))); // Generates 4 characters in uppercase

        // Generate a 6-digit random number
        $randomDigits = str_pad(rand(100000, 999999), 6, '0', STR_PAD_LEFT);

        // Combine to form the 15-character Complaint ID
        $complaintId = $prefix . $randomNumber . $randomLetters . $randomDigits;

        return $complaintId;
    }
}
 