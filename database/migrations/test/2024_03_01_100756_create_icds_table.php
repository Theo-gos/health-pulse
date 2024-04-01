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
        Schema::create('icds', function (Blueprint $table) {
            $table->string('icd_code');
            $table->string('icd_name');
            $table->string('severity');
            $table->string('color');
            $table->primary('icd_code');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('icds');
    }
};
