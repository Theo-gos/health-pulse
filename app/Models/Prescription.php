<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;

class Prescription extends Pivot
{
    use HasFactory;

    protected $table = 'prescriptions';

    protected $fillable = [
        'doctor_id',
        'patient_id',
        'date',
        'medication_name',
        'dose',
        'pill_per_day',
        'recommendation',
    ];

    protected $attributes = [
        'doctor_id' => '1',
        'patient_id' => '1',
        'date' => '2020-03-22',
        'medication_name' => 'Atenolol',
        'dose' => '200 mg oral',
        'pill_per_day' => '1 tablet',
        'recommendation' => '1 tablet every morning for 10 days',
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
