<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;

class UserIpAdd extends Model
{
    use HasFactory, Notifiable;
    protected $fillable = [
        'user_id',
        'ip_address',
        'status',
    ];
}
