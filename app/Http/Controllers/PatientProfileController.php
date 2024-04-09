<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileAvatarUpdateRequest;
use App\Models\Patient;
use App\Services\PatientService;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PatientProfileController extends Controller
{
    private $patientService;

    public function __construct(PatientService $patientService)
    {
        $this->patientService = $patientService;
    }

    public function index()
    {
        if (! Auth::guard('patient')->check()) {
            return redirect()->route('home');
        }

        return Inertia::render('Auth/Patient/PatientProfile');
    }

    public function uploadAvatar(ProfileAvatarUpdateRequest $request, Patient $patient)
    {
        $isUpdated = $this->patientService->updateAvatarForPatient($patient, $request->only('avatar'));

        if ($isUpdated) {
            return redirect()->back()->with('message', [
                'message' => 'Avatar updated successfully',
                'type' => 'success',
            ]);
        } else {
            return redirect()->back()->with('message', [
                'message' => 'Failed to update avatar',
                'type' => 'error',
            ]);
        }
    }
}
