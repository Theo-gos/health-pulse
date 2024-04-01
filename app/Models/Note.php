<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Note extends Model
{
    use HasFactory;

    protected $fillable = [
        'appointment_id',
        'main_complaint',
        'subjective_note',
        'objective_note',
        'image_url',
        'signature',
    ];

    protected $casts = [
        'image_url' => 'array',
        'appointment_id' => 'integer',
    ];

    public function patient(): BelongsTo
    {
        return $this->belongsTo(Patient::class);
    }
}
