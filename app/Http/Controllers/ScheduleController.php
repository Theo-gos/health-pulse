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
        return $this->scheduleService->store($request);
    }

    public function edit(string $id)
    {
        return $this->scheduleService->edit($id);
    }

    public function update(Request $request, int $id)
    {
        return $this->scheduleService->update($request, $id);
    }

    public function delete(int $id)
    {
        return $this->scheduleService->delete($id);
    }

    public function index()
    {
        return $this->scheduleService->index();
    }
}
