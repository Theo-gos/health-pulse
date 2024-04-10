<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Allergy extends Model
{
    use HasFactory;

    protected $fillable = [
        'patient_id',
        'name',
        'type',
        'severity',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function patient(): BelongsTo
    {
        return $this->belongsTo(Patient::class);
    }
}
