<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class ExternalUser extends Authenticatable
{
    protected $connection = 'external_mysql'; // 👈 second DB
    protected $table = 'users'; // table name in second DB

    protected $fillable = ['name', 'email', 'password'];

    protected $hidden = ['password', 'remember_token'];
}

