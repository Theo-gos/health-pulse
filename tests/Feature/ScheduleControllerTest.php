<?php

namespace Tests\Feature;

use App\Models\Doctor;
use App\Models\Schedule;
use Database\Seeders\TestSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class ScheduleControllerTest extends TestCase
{
    use RefreshDatabase;

    protected $doctor;

    protected $schedules;

    public function setUp(): void
    {
        parent::setUp();

        $this->seed(TestSeeder::class);

        $this->doctor = Doctor::factory()->state(['id' => 1])->create();

        $this->schedules = \App\Models\Schedule::factory()
            ->count(4)
            ->state(['doctor_id' => 1])
            ->create();

        $this->actingAs($this->doctor);
    }

    public function testScheduleIndex(): void
    {
        $schedulesList = [];
        foreach ($this->schedules as $schedule) {
            $schedulesList[$schedule['date']][] = $schedule->only('doctor_id', 'id', 'task', 'location', 'date', 'start_time', 'end_time');
        }

        $response = $this->get(route('doctor.schedule'));

        $response->assertInertia(
            fn (Assert $page) => $page
                ->component('Auth/Doctor/Schedule')
                ->where('calendars', $schedulesList)
                ->where('aside', [])
        );
    }

    public function testScheduleStore(): void
    {
        date_default_timezone_set('Asia/Ho_Chi_Minh');

        $response = $this->post(route('schedule.store'), [
            'task' => 'Task 1',
            'office' => 'North Office',
            'floor' => 'floor 1',
            'room' => 'room C206',
            'date' => date('Y-m-d'),
            'time_start' => '08:00',
            'time_end' => '09:00',
        ]);

        $latestSchedule = Schedule::latest()->get()[0];
        $latestSchedule->wasRecentlyCreated = true;

        $response->assertRedirect();
        $response->assertSessionHas(
            'message',
            [
                'message' => 'Stored to database',
                'type' => 'success',
                'data' => $latestSchedule,
            ]
        );
    }

    public function testScheduleStore_overlapped(): void
    {
        date_default_timezone_set('Asia/Ho_Chi_Minh');

        $this->schedules = \App\Models\Schedule::factory()
            ->count(1)
            ->state([
                'doctor_id' => 1,
                'task' => 'Task 1',
                'location' => 'North Office, floor 1, room C206',
                'date' => date('Y-m-d'),
                'start_time' => '08:00:00',
                'end_time' => '09:00:00',
            ])
            ->create();

        $response = $this->post(route('schedule.store'), [
            'task' => 'Task 1',
            'office' => 'North Office',
            'floor' => 'floor 1',
            'room' => 'room C206',
            'date' => date('Y-m-d'),
            'time_start' => '08:00',
            'time_end' => '09:00',
        ]);

        $response->assertRedirect();
        $response->assertSessionHas(
            'message',
            [
                'message' => 'Overlapped schedule',
                'type' => 'error',
            ]
        );
    }

    public function testScheduleEdit(): void
    {
        $schedule = Schedule::select('doctor_id', 'id', 'task', 'location', 'date', 'start_time', 'end_time')
            ->where('id', $this->schedules[0]['id'])
            ->get();

        $response = $this->get(route('schedule.edit', ['id' => $this->schedules[0]['id']]));

        $response->assertRedirect();
        $response->assertSessionHas(
            'schedule',
            [
                'edit' => $schedule,
            ]
        );
    }

    public function testScheduleUpdate_Overlapped(): void
    {
        date_default_timezone_set('Asia/Ho_Chi_Minh');

        $response = $this->patch(route('schedule.update', ['id' => $this->schedules[0]['id']]), [
            'task' => 'Task 2',
            'office' => 'North Office',
            'floor' => 'floor 1',
            'room' => 'room C206',
            'date' => date('Y-m-d'),
            'time_start' => '08:00',
            'time_end' => '09:00',
        ]);

        $response->assertRedirect();
        $response->assertSessionHas(
            'message',
            [
                'message' => 'Item updated successfully',
                'type' => 'success',
            ]
        );
    }

    public function testScheduleDelete(): void
    {
        $response = $this->delete(route('schedule.delete', ['id' => $this->schedules[0]['id']]));

        $response->assertRedirect();
        $response->assertSessionHas(
            'message',
            [
                'message' => 'Item deleted successfully',
                'type' => 'success',
            ]
        );
    }
}
