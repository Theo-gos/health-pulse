<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Diagnosis extends Model
{
    use HasFactory;

    protected $fillable = [
        'date',
        'icd_code',
        'icd_name',
        'doctor_id',
        'patient_id',
    ];
}
