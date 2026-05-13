<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with('category')->ordered();

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->has('search')) {
            $query->where('name', 'like', "%{$request->search}%");
        }

        return ProductResource::collection($query->paginate($request->per_page ?? 50));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'description' => 'nullable|string',
            'price' => 'required|integer|min:0',
            'price_display' => 'nullable|string|max:255',
            'images' => 'nullable|array',
            'images.*' => 'string',
            'features' => 'nullable|array',
            'features.*' => 'string',
            'whatsapp_text' => 'nullable|string',
            'status' => 'in:active,inactive',
            'is_featured' => 'boolean',
            'sort_order' => 'integer',
        ]);

        $validated['slug'] = Str::slug($validated['name']) . '-' . Str::random(5);

        if (empty($validated['sort_order'])) {
            $validated['sort_order'] = Product::max('sort_order') + 1;
        }

        $product = Product::create($validated);
        $product->load('category');

        return new ProductResource($product);
    }

    public function show(Product $product)
    {
        $product->load('category');
        return new ProductResource($product);
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'category_id' => 'sometimes|exists:categories,id',
            'description' => 'nullable|string',
            'price' => 'sometimes|integer|min:0',
            'price_display' => 'nullable|string|max:255',
            'images' => 'nullable|array',
            'images.*' => 'string',
            'features' => 'nullable|array',
            'features.*' => 'string',
            'whatsapp_text' => 'nullable|string',
            'status' => 'in:active,inactive',
            'is_featured' => 'boolean',
            'sort_order' => 'integer',
        ]);

        if (isset($validated['name']) && $validated['name'] !== $product->name) {
            $validated['slug'] = Str::slug($validated['name']) . '-' . Str::random(5);
        }

        $product->update($validated);
        $product->load('category');

        return new ProductResource($product);
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json(['message' => 'Produk berhasil dihapus']);
    }

    public function reorder(Request $request)
    {
        $request->validate([
            'items' => 'required|array',
            'items.*.id' => 'required|exists:products,id',
            'items.*.sort_order' => 'required|integer',
        ]);

        foreach ($request->items as $item) {
            Product::where('id', $item['id'])->update(['sort_order' => $item['sort_order']]);
        }

        return response()->json(['message' => 'Urutan berhasil diperbarui']);
    }
}
