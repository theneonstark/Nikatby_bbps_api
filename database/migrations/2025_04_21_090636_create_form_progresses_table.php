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
        Schema::create('form_progresses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->string('country');
            $table->string('state');
            $table->string('pincode');
            $table->text('address');
            $table->string('aadhar_card')->nullable();
            $table->string('pan_card')->nullable();
            $table->string('user_image')->nullable();
            $table->string('bank_name');
            $table->string('ifsc_code');
            $table->string('account_number');
            $table->string('branch');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('form_progresses');
    }
};
