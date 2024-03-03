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
        Schema::create('notes', function (Blueprint $table) {
            $table->foreignId('appointment_id')->constrained()->onUpdate('cascade')->onDelete('cascade');
            $table->text('main_complaint');
            $table->text('objective_note');
            $table->text('subjective_note');
            $table->timestamps();
            $table->primary('appointment_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notes');
    }
};
