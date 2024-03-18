<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Allergy extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'type',
        'severity',
    ];

    public function patient(): BelongsTo
    {
        return $this->belongsTo(Patient::class);
    }
}
