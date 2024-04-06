<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;

class Diagnosis extends Pivot
{
    use HasFactory;

    public $incrementing = true;

    protected $table = 'diagnoses';

    protected $fillable = [
        'date',
        'icd_code',
        'doctor_id',
        'patient_id',
    ];

    public function patient(): BelongsTo
    {
        return $this->belongsTo(Patient::class);
    }

    public function doctor(): BelongsTo
    {
        return $this->belongsTo(Doctor::class);
    }

    public function icd(): BelongsTo
    {
        return $this->belongsTo(Icd::class, 'icd_code', 'icd_code');
    }
}
