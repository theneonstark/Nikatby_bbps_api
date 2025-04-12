<?php

// app/Http/Controllers/IpAddressController.php
namespace App\Http\Controllers;

use App\Models\IpAddress;
use Illuminate\Http\Request;

class IpAddressController extends Controller
{
    // Get all IP addresses
    public function index()
    {
        try {
            $ipAddresses = IpAddress::with('user') // Include user relationship if needed
                ->orderBy('created_at', 'desc')
                ->get();

            return response()->json([
                'success' => true,
                'data' => $ipAddresses
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching IP addresses: ' . $e->getMessage()
            ], 500);
        }
    }

    // Update IP address status
    public function updateStatus(Request $request, $id)
    {
        try {
            // Validate the request
            $request->validate([
                'status' => 'required|boolean' // Assuming status is 0 or 1
            ]);

            $ipAddress = IpAddress::findOrFail($id);
            
            $ipAddress->update([
                'status' => $request->status,
                'updated_at' => now()
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Status updated successfully',
                'data' => $ipAddress
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error updating status: ' . $e->getMessage()
            ], 500);
        }
    }
}