<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use App\Models\Rental;

class DashboardController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => [
                'total_products' => Product::count(),
                'active_products' => Product::active()->count(),
                'total_categories' => Category::count(),
                'total_rentals' => Rental::count(),
                'featured_products' => Product::featured()->count(),
                'recent_products' => Product::with('category')
                    ->latest()
                    ->limit(5)
                    ->get()
                    ->map(fn ($p) => [
                        'id' => $p->id,
                        'name' => $p->name,
                        'category' => $p->category->name,
                        'status' => $p->status,
                        'created_at' => $p->created_at->diffForHumans(),
                    ]),
            ],
        ]);
    }
}
