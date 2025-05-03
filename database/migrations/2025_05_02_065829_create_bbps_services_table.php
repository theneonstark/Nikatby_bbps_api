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
        Schema::create('bbps_service', function (Blueprint $table) {
            // $table->id();
            $table->string('blr_id');
            $table->string('blr_name');
            $table->string('blr_category_name');
            $table->string('blr_coverage');
            $table->string('Country');
            $table->string('State');
            $table->string('City');
            // $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bbps_services');
    }
};
