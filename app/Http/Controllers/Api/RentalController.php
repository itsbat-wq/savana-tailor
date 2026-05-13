<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\RentalResource;
use App\Models\Rental;

class RentalController extends Controller
{
    public function index()
    {
        $rentals = Rental::available()->ordered()->get();
        return RentalResource::collection($rentals);
    }

    public function show(Rental $rental)
    {
        return new RentalResource($rental);
    }
}
