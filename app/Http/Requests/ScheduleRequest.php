<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ScheduleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'task' => 'required|max:255',
            'office' => 'required',
            'floor' => 'required',
            'room' => 'required',
            'date' => 'required|date|after_or_equal:today',
            'time_start' => 'required',
            'time_end' => 'required|after:time_start',
        ];
    }
}
