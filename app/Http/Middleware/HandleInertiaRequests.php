<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'doctor' => $request->user(),
                'patient' => Auth::guard('patient')->user(),
            ],
            'data' => fn () => $request->session()->get('data'),
            'flash' => [
                'appointment' => fn () => $request->session()->get('appointment'),
                'schedule' => fn () => $request->session()->get('schedule'),
            ],
            'message' => fn () => $request->session()->get('message'),
        ];
    }
}
