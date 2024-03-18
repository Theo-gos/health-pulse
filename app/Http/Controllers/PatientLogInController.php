<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Patient;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

// use App\Providers\RouteServiceProvider;
// use Exception;
// use Illuminate\Auth\Events\Registered;
// use Illuminate\Support\Facades\Auth;
// use Illuminate\Support\Facades\Hash;
// use Illuminate\Validation\Rules;

class PatientLogInController extends Controller
{
    public function redirect(): RedirectResponse
    {
        return Socialite::driver('google')->redirect();
    }

    public function callback(): RedirectResponse
    {
        $googleUser = Socialite::driver('google')->user();

        $user = Patient::firstOrCreate([
            'email' => $googleUser->email
        ], [
            'name' => $googleUser->name,
            'email' => $googleUser->email,
            'google_id' => $googleUser->id
        ]);

        return redirect()->route('home')->with('data', [
            'name' => $user->name,
            'email' => $user->email,
            'patient_id' => $user->id,
            'google_id' => $googleUser->id,
            'token' => $googleUser->token,
            'refresh_token' => $googleUser->refreshToken,
            'expire_in' => $googleUser->expiresIn,
        ]);
    }

    public function destroy(Request $request): RedirectResponse
    {

        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
