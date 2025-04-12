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
        Schema::create('beneficiaries', function (Blueprint $table) {
            $table->id();
            $table->string('mobile')->unique();
            $table->string('status')->nullable()->default(0);
            $table->integer('responsecode')->nullable();
            $table->string('beneid')->nullable();
            $table->string('bankid')->nullable();
            $table->string('bankname')->nullable();
            $table->string('beneficiary_name')->nullable();
            $table->string('accountnumber')->nullable();
            $table->string('ifsccode')->nullable();
            $table->enum('verified', ['0', '1'])->default('0');  // 0 = Not Verified, 1 = Verified
            $table->string('banktype')->nullable();
            $table->integer('userstatus')->nullable();
            $table->integer('bank3')->nullable();
            $table->string('message')->default('No Message');
            $table->timestamps();  // Automatically adds created_at and updated_at columns
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('beneficiaries');
    }
};
