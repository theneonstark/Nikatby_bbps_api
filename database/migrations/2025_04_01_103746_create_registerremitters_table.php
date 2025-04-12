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
        Schema::create('registerremitters', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('userId')->nullable();
            $table->foreign('userId')
                    ->references('id')
                    ->on('users')
                    ->onDelete('cascade');
            $table->string('mobile')->unique();
            $table->string('otp');
            $table->string('state_response');
            $table->string('pid');
            $table->string('accessMode')->default('NOTHING');
            $table->string('isIris')->default('0');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('registerremitters');
    }
};
