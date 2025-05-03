<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class FundRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'txn_type',
        'credit_balance',
        'debit_balance',
        'txn_id',
        'deposite_date',
        'bank_name',
        'image_proff',
        'status',
    ];
}
