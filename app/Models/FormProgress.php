<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class FormProgress extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'name', 'country', 'state', 'pincode', 'address',
        'aadhar_card', 'pan_card', 'user_image',
        'bank_name', 'ifsc_code', 'account_number', 'branch', 'verified',
    ];
}
