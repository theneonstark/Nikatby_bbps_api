<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class RemitterAadharVerify extends Model
{
    use HasFactory;

    protected $fillable = [
        'mobile',
        'message',
        'status',
        'response_code',
        'message',
        'stateresp',
        'aadhaar_no',
        // Add any other fields you're using for mass assignment
    ];
}
