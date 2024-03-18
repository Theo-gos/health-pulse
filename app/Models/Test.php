<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Test extends Model
{
    use HasFactory;

    protected $fillable = [
        'date',
        'file',
        'result',
        'doctor_id',
        'patient_id',
    ];
}
