<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('remitter_aadhar_verifies', function (Blueprint $table) {
            $table->id();
            $table->boolean('status')->default(false);
            $table->integer('response_code')->default(null);
            $table->string('message')->default('No Message Yet');
            $table->string('stateresp')->default(null);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('remitter_aadhar_verifies');
    }
};
