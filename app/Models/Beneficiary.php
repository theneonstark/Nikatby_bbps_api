<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Beneficiary extends Model
{
    use HasFactory;
    protected $fillable = [
        'mobile', 'status', 'responsecode', 'beneid', 'bankid', 'bankname', 'beneficiary_name','accountnumber','ifsccode','verified','banktype','userstatus','bank3','message',
    ];
}
