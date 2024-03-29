<?php

namespace App\Services;

use App\Models\Note;

class AppointmentNoteService extends BaseService
{
    public function getModel()
    {
        return Note::class;
    }

    public function getByAppointmentId(int $appointment_id)
    {
        return $this->model->where('appointment_id', $appointment_id)->get()->all();
    }
}
