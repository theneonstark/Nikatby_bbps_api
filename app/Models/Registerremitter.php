<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Registerremitter extends Model
{
    protected $fillable = [
        'mobile', 'otp', 'state_response', 'pid', 'access_mode', 'is_iris', 'userId',
    ];
}
