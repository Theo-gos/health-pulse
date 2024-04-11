<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Icd extends Model
{
    use HasFactory;

    protected $table = 'icds';

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function diagnoses(): HasMany
    {
        return $this->hasMany(Diagnosis::class, 'icd_code', 'icd_code');
    }
}
