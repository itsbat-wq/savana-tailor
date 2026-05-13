<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Models\Category;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::active()
            ->ordered()
            ->withCount('products')
            ->get();

        return CategoryResource::collection($categories);
    }

    public function show(Category $category)
    {
        $category->load(['products' => fn ($q) => $q->active()->ordered()]);
        $category->loadCount('products');

        return new CategoryResource($category);
    }
}
