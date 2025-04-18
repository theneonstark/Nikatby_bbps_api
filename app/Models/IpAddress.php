<?php
// app/Models/IpAddress.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class IpAddress extends Model
{
    protected $fillable = [
        'ip_address',
        'user_id',
        'status',
        'created_at',
        'updated_at'
    ];

    // If you want to use a different table name
    protected $table = 'whitelisted_ips';

    // Relationship with User model (assuming you have one)
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}