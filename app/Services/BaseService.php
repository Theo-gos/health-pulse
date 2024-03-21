<?php

namespace App\Services;

abstract class BaseService
{
    protected $model;

    public function __construct()
    {
        $this->model = app($this->getModel());
    }

    abstract public function getModel();

    // Delete a record using Id
    public function deleteById(int $id)
    {
        $item = $this->model->where('id', $id)->firstOrFail();

        return $item->delete();
    }

    // Get a record using Id
    public function getById(string $id)
    {
        return $this->model->findOrFail($id);
    }

    // Store a new record
    public function store($data)
    {
        return $this->model->create($data);
    }
}
