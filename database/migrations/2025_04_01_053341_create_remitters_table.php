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
        Schema::create('remitters', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('userId')->nullable();
            $table->foreign('userId')
                    ->references('id')
                    ->on('users')
                    ->onDelete('cascade');
            $table-> string('status')->default(false);
            $table->string('mobile')->unique();
            $table->integer('responsecode')->default(0);
            $table->string('message')->default('NO Message Yet.');
            $table->string('limit')->default(0);
            $table->string('apihitcount')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('remitters');
    }
};
