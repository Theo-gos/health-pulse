<?php

namespace App\Http\Controllers;

use App\Http\Requests\ScheduleRequest;
use App\Services\ScheduleService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ScheduleController extends Controller
{
    private $scheduleService;

    public function __construct(ScheduleService $scheduleService)
    {
        $this->scheduleService = $scheduleService;
    }

    public function store(ScheduleRequest $request)
    {
        $validated = $request->validated();

        $schedule = $this->scheduleService->store($validated);
        $message = array();

        if ($schedule) {
            $message = [
                'message' => 'Stored to database',
                'type' => 'success',
                'data' => $schedule,
            ];
        } else {
            $message = [
                'message' => 'Overlapped schedule',
                'type' => 'error',
            ];
        }

        return redirect()->back()->with('message', $message);
    }

    public function edit(string $id)
    {
        $schedule = $this->scheduleService->getById($id);

        return redirect()->back()->with('schedule', [
            'edit' => $schedule
        ]);
    }

    public function update(ScheduleRequest $request, int $id)
    {
        $validated = $request->validated();
        $status = $this->scheduleService->updateById($validated, $id);
        $message = array();

        if ($status) {
            $message = [
                'message' => 'Item updated successfully',
                'type' => 'success',
            ];
        } else {
            $message = [
                'message' => 'Overlapped schedule',
                'type' => 'error',
            ];
        }

        return redirect()->back()->with('message', $message);
    }

    public function delete(int $id)
    {
        $status = $this->scheduleService->deleteById($id);
        $message = array();

        if ($status) {
            $message = [
                'message' => 'Item deleted successfully',
                'type' => 'success',
            ];
        } else {
            $message = [
                'message' => 'Failed to delete item',
                'type' => 'error',
            ];
        }

        return redirect()->back()->with('message', $message);
    }

    public function index()
    {
        $data = $this->scheduleService->getScheduleAndAside();

        return Inertia::render('Auth/Doctor/Schedule', $data);
    }
}
