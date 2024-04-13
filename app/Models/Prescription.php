<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;

class Prescription extends Pivot
{
    use HasFactory;

    public $incrementing = true;

    protected $table = 'prescriptions';

    protected $fillable = [
        'doctor_id',
        'patient_id',
        'medication_id',
        'date',
        'amount',
        'recommendation',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function patient(): BelongsTo
    {
        return $this->belongsTo(Patient::class);
    }

    public function doctor(): BelongsTo
    {
        return $this->belongsTo(Doctor::class);
    }

    public function medication(): BelongsTo
    {
        return $this->belongsTo(Medication::class);
    }
}
