<?php

namespace App\Http\Controllers;

use App\Services\ScheduleService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ScheduleController extends Controller
{
    public function __construct(private ScheduleService $scheduleService)
    {
    }

    public function store(Request $request)
    {
        $message = $this->scheduleService->storeItemToDatabase($request);

        return redirect()->back()->with('message', $message);
    }

    public function edit(string $id)
    {
        $item = $this->scheduleService->getItemById($id);

        return redirect()->back()->with('schedule', [
            'edit' => $item
        ]);
    }

    public function update(Request $request, int $id)
    {
        $message = $this->scheduleService->updateItemById($request, $id);

        return redirect()->back()->with('message', $message);
    }

    public function delete(int $id)
    {
        $message = $this->scheduleService->deleteItemById($id);

        return redirect()->back()->with('message', $message);
    }

    public function index()
    {
        $data = $this->scheduleService->index();

        return Inertia::render('Auth/Doctor/Schedule', $data);
    }
}
