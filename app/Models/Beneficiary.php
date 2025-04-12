<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Beneficiary extends Model
{
    protected $fillable = [
        'mobile', 'benename', 'bankid', 'accno', 'ifsccode', 'verified',
    ];
}
