<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;

class Appointment extends Pivot
{
    use HasFactory;

    public $incrementing = true;

    protected $table = 'appointments';

    protected $fillable = [
        'id',
        'doctor_id',
        'patient_id',
        'date',
        'start_time',
        'end_time',
        'status',
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
}
