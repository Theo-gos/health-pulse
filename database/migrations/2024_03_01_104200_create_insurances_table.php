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
        Schema::create('insurances', function (Blueprint $table) {
            $table->foreignId('patient_id')->constrained()->onUpdate('cascade')->onDelete('cascade');
            $table->string('code')->unique();
            $table->string('provider');
            $table->date('expiry_date');
            $table->timestamps();
            $table->primary(['patient_id', 'code']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('insurances');
    }
};
