<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;

class Diagnosis extends Pivot
{
    use HasFactory;

    protected $table = 'diagnoses';

    protected $fillable = [
        'date',
        'icd_code',
        'icd_name',
        'doctor_id',
        'patient_id',
        'severity',
        'color',
    ];

    public function patient(): BelongsTo
    {
        return $this->belongsTo(Patient::class);
    }

    public function doctor(): BelongsTo
    {
        return $this->belongsTo(Doctor::class);
    }
}
