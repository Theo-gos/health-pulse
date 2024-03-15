<?php

namespace App\Services;

use App\Models\Schedule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ScheduleService
{
    protected function isOverlapped(string $checkTimeStart, string $checkTimeEnd, string $startTime, string $endTime)
    {
        return (strtotime($checkTimeStart) >= strtotime($startTime)
            && strtotime($checkTimeStart) < strtotime($endTime))
            || (strtotime($checkTimeEnd) > strtotime($startTime)
                && strtotime($checkTimeEnd) <= strtotime($endTime));
    }

    public function getAllBetweenDates(string $date_start, string $date_end)
    {
        $user = Auth::user();

        $schedules = Schedule::where('doctor_id', $user->id)
            ->select('doctor_id', 'id', 'task', 'location', 'date', 'start_time', 'end_time')
            ->havingBetween('date', [$date_start, $date_end])
            ->orderBy('date', 'asc')
            ->orderBy('start_time', 'asc')
            ->get();

        $return = array();

        foreach ($schedules as $schedule) {
            $return[$schedule['date']][] = $schedule;
        };

        return $return;
    }

    public function getAllByDate(string $date)
    {
        $user = Auth::user();

        $schedules = Schedule::where('doctor_id', $user->id)
            ->select('doctor_id', 'id', 'task', 'location', 'date', 'start_time', 'end_time')
            ->where('date', $date)
            ->orderBy('start_time', 'asc')
            ->get();

        return $schedules;
    }

    public function getItemById(string $id)
    {
        $user = Auth::user();

        $schedule = Schedule::where('doctor_id', $user->id)
            ->select('doctor_id', 'id', 'task', 'location', 'date', 'start_time', 'end_time')
            ->where('id', $id)
            ->get();

        return $schedule;
    }

    public function storeItemToDatabase(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'task' => 'required|max:255',
            'office' => 'required',
            'floor' => 'required',
            'room' => 'required',
            'date' => 'required|date|after_or_equal:today',
            'time_start' => 'required|date_format:H:i',
            'time_end' => 'required|date_format:H:i|after:time_start',
        ]);

        $schedules = array_filter($this->getAllByDate($validated['date'])->toArray(), function ($var) use ($validated) {
            return $this->isOverlapped($var['start_time'], $var['end_time'], $validated['time_start'], $validated['time_end']);
        });

        if (count($schedules) == 0) {
            $schedule = Schedule::create([
                'doctor_id' => $user->id,
                'task' => $validated['task'],
                'date' => $validated['date'],
                'location' => $validated['office'] . ', ' . $validated['floor'] . ', ' . $validated['room'],
                'start_time' => $validated['time_start'] . ':00',
                'end_time' => $validated['time_end'] . ':00',
            ]);

            return [
                'message' => 'Stored to database',
                'data' => $schedule,
                'type' => 'success',
            ];
        } else {
            return [
                'message' => 'Overlapped schedule',
                'type' => 'error',
            ];
        }
    }

    public function updateItemById(Request $request, int $id)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'task' => 'required|max:255',
            'office' => 'required',
            'floor' => 'required',
            'room' => 'required',
            'date' => 'required|date|after_or_equal:today',
            'time_start' => 'required',
            'time_end' => 'required|after:time_start',
        ]);

        $schedules = array_filter($this->getAllByDate($validated['date'])->toArray(), function ($var) use ($validated, $id) {
            return $this->isOverlapped($var['start_time'], $var['end_time'], $validated['time_start'], $validated['time_end'])
                && ($var['id'] !== $id);
        });

        if (count($schedules) == 0) {
            $item = Schedule::where('id', $id)->firstOrFail();

            $item->task = $validated['task'];
            $item->date = $validated['date'];
            $item->location = $validated['office'] . ', ' . $validated['floor'] . ', ' . $validated['room'];
            $item->start_time = $validated['time_start'];
            $item->end_time = $validated['time_end'];

            $item->save();

            return [
                'message' => 'Item updated successfully',
                'type' => 'success',
            ];
        } else {
            return [
                'message' => 'Overlapped schedule',
                'type' => 'error',
            ];
        }
    }

    public function deleteItemById(int $id)
    {
        $item = Schedule::where('id', $id)->firstOrFail();

        $item->delete();

        return [
            'message' => 'Item deleted successfully',
            'type' => 'success',
        ];
    }

    public function index()
    {
        $first_day_this_month = date('Y-m-01');
        $last_day_this_month  = date('Y-m-t');

        $calendar = $this->getAllBetweenDates($first_day_this_month, $last_day_this_month);
        $aside = array_filter($calendar, function ($k) {
            return strtotime($k) >= strtotime(date('Y-m-d')) && strtotime($k) <= strtotime(date('Y-m-d', strtotime('tomorrow + 1 day')));
        }, ARRAY_FILTER_USE_KEY);

        return [
            'calendar' => $calendar,
            'aside' => $aside,
        ];
    }
}
