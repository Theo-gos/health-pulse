<?php

namespace App\Models;

// use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Patient extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'google_id',
        'address',
        'phone',
        'email',
        'date_of_birth',
        'sex',
        'age',
        'last_visit',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [];

    public function allergies(): HasMany
    {
        return $this->hasMany(Allergy::class);
    }

    public function Insurances(): HasMany
    {
        return $this->hasMany(Insurance::class);
    }

    public function diagnose_doctors(): BelongsToMany
    {
        return $this->belongsToMany(Doctor::class)->using(Diagnosis::class);
    }

    public function prescribe_doctors(): BelongsToMany
    {
        return $this->belongsToMany(Doctor::class)->using(Prescription::class);
    }

    public function test_doctors(): BelongsToMany
    {
        return $this->belongsToMany(Doctor::class)->using(Test::class);
    }
}
