<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\RentalResource;
use App\Models\Rental;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class RentalController extends Controller
{
    public function index()
    {
        return RentalResource::collection(Rental::ordered()->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price_per_day' => 'required|integer|min:0',
            'price_display' => 'nullable|string|max:255',
            'images' => 'nullable|array',
            'images.*' => 'string',
            'whatsapp_text' => 'nullable|string',
            'status' => 'in:available,rented,inactive',
            'sort_order' => 'integer',
        ]);

        $validated['slug'] = Str::slug($validated['name']) . '-' . Str::random(5);

        $rental = Rental::create($validated);
        return new RentalResource($rental);
    }

    public function show(Rental $rental)
    {
        return new RentalResource($rental);
    }

    public function update(Request $request, Rental $rental)
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'price_per_day' => 'sometimes|integer|min:0',
            'price_display' => 'nullable|string|max:255',
            'images' => 'nullable|array',
            'images.*' => 'string',
            'whatsapp_text' => 'nullable|string',
            'status' => 'in:available,rented,inactive',
            'sort_order' => 'integer',
        ]);

        if (isset($validated['name']) && $validated['name'] !== $rental->name) {
            $validated['slug'] = Str::slug($validated['name']) . '-' . Str::random(5);
        }

        $rental->update($validated);
        return new RentalResource($rental);
    }

    public function destroy(Rental $rental)
    {
        $rental->delete();
        return response()->json(['message' => 'Rental berhasil dihapus']);
    }
}
