<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Patient;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Http\Request;
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

    public function callback(Request $request): Response
    {
        // $state = $request->input('state');
        // parse_str($state, $result);
        $googleUser = Socialite::driver('google')->user();
        dd($googleUser);

        $user = Patient::firstOrCreate([
            'email' => $googleUser->email
        ], [
            'name' => $googleUser->name,
            'email' => $googleUser->email,
            'google_id' => $googleUser->id
        ]);

        return Inertia::render('Home', [
            'data' => $user,
            'auth' => true
        ]);
    }
}
