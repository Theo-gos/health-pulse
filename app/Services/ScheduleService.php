<?php

namespace App\Services;

use App\Models\Schedule;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Carbon;

class ScheduleService extends BaseService
{
    public function getModel()
    {
        return Schedule::class;
    }

    // Check if schedule is overlapped
    protected function isOverlapped(string $checkTimeStart, string $checkTimeEnd, string $startTime, string $endTime)
    {
        return (strtotime($checkTimeStart) >= strtotime($startTime)
            && strtotime($checkTimeStart) < strtotime($endTime))
            || (strtotime($checkTimeEnd) > strtotime($startTime)
                && strtotime($checkTimeEnd) <= strtotime($endTime));
    }

    // Get all schedules between two given dates
    public function getAllBetweenDates(string $date_start, string $date_end)
    {
        $user = Auth::user();

        $schedules = $this->model->where('doctor_id', $user->id)
            ->select('doctor_id', 'id', 'task', 'location', 'date', 'start_time', 'end_time')
            ->havingBetween('date', [$date_start, $date_end])
            ->orderBy('date', 'asc')
            ->orderBy('start_time', 'asc')
            ->get();

        $schedulesList = array();

        foreach ($schedules as $schedule) {
            $schedulesList[$schedule['date']][] = $schedule;
        };

        return $schedulesList;
    }

    // Get all schedules of a given day
    public function getAllByDate(string $date)
    {
        $user = Auth::user();

        $schedules = $this->model->where('doctor_id', $user->id)
            ->select('doctor_id', 'id', 'task', 'location', 'date', 'start_time', 'end_time')
            ->where('date', $date)
            ->orderBy('start_time', 'asc')
            ->get();

        return $schedules;
    }


    public function getById(string $id)
    {
        $user = Auth::user();

        $schedule = $this->model->where('doctor_id', $user->id)
            ->select('doctor_id', 'id', 'task', 'location', 'date', 'start_time', 'end_time')
            ->where('id', $id)
            ->get();

        return $schedule;
    }

    public function store($data)
    {
        $user = Auth::user();

        $schedules = array_filter($this->getAllByDate($data['date'])->toArray(), function ($var) use ($data) {
            return $this->isOverlapped($var['start_time'], $var['end_time'], $data['time_start'], $data['time_end']);
        });

        if (count($schedules) == 0) {
            $schedule = $this->model->create([
                'doctor_id' => $user->id,
                'task' => $data['task'],
                'date' => $data['date'],
                'location' => $data['office'] . ', ' . $data['floor'] . ', ' . $data['room'],
                'start_time' => $data['time_start'] . ':00',
                'end_time' => $data['time_end'] . ':00',
            ]);

            return $schedule;
        } else {
            return null;
        }
    }

    public function updateById($data, int $id)
    {
        $user = Auth::user();

        $schedules = array_filter($this->getAllByDate($data['date'])->toArray(), function ($var) use ($data, $id) {
            return $this->isOverlapped($var['start_time'], $var['end_time'], $data['time_start'], $data['time_end'])
                && ($var['id'] !== $id);
        });

        if (count($schedules) == 0) {
            $item = $this->model->where('id', $id)->firstOrFail();

            $item->task = $data['task'];
            $item->date = $data['date'];
            $item->location = $data['office'] . ', ' . $data['floor'] . ', ' . $data['room'];
            $item->start_time = $data['time_start'];
            $item->end_time = $data['time_end'];

            $item->save();

            return true;
        }

        return false;
    }

    public function getScheduleAndAside()
    {
        $first_day_this_month = date('Y-m-01');
        $last_day_this_month  = date('Y-m-t');

        $calendars = $this->getAllBetweenDates($first_day_this_month, $last_day_this_month);
        $aside = array_filter($calendars, function ($k) {
            return strtotime($k) >= strtotime(date('Y-m-d')) && strtotime($k) <= strtotime(date('Y-m-d', strtotime('tomorrow + 1 day')));
        }, ARRAY_FILTER_USE_KEY);

        return [
            'calendars' => $calendars,
            'aside' => $aside,
        ];
    }
}
