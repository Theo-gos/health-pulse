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
        Schema::create('schedules', function (Blueprint $table) {
            $table->foreignId('doctor_id')->constrained()->onUpdate('cascade')->onDelete('cascade');
            $table->date('date');
            $table->string('task');
            $table->time('start_time');
            $table->time('end_time');
            $table->timestamps();
            $table->primary('doctor_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('schedules');
    }
};