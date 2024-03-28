<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Services\AppointmentService;
use App\Services\IcdService;
use App\Services\PatientService;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AppointmentController extends Controller
{
    private $appointmentService;

    private $patientService;

    private $icdService;

    public function __construct(AppointmentService $appointmentService, PatientService $patientService, IcdService $icdService)
    {
        $this->appointmentService = $appointmentService;
        $this->patientService = $patientService;
        $this->icdService = $icdService;
    }

    public function show(string $date_start, string $date_end)
    {
        $user = Auth::user();
        $appointments = $this->appointmentService->getAllBetweenDates($date_start, $date_end, $user->id, null);

        return redirect()->back()->with('appointment', [
            'list' => $appointments,
        ]);
    }

    public function showAppointmentNote(Appointment $appointment)
    {
        $medicalInfo = $this->patientService->getMedicalInformationById([$appointment->patient_id]);
        $icd = $this->icdService->getAll();

        return Inertia::render('Auth/Doctor/AppointmentNote', [
            'medicalInfo' => $medicalInfo,
            'appointment' => $appointment,
            'icd' => $icd,
        ]);
    }

    public function storeAppointmentNote(Request $request, Appointment $appointment)
    {
        // dd($request->files->all()['files'][0]['originFileObj']->getRealPath());
        $uploadedFileUrl = Cloudinary::upload($request->files->all()['files'][0]['originFileObj']->getRealPath())->getSecurePath();
        dd($uploadedFileUrl);
    }

    public function index()
    {
        $appointments = $this->appointmentService->getAllOfThisWeek();

        return Inertia::render('Auth/Doctor/Appointments', [
            'appointments' => $appointments,
        ]);
    }
}
