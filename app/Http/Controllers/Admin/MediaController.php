<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class MediaController extends Controller
{
    public function upload(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:5120', // max 5MB
            'folder' => 'nullable|string',
        ]);

        $folder = $request->input('folder', 'products');
        $file = $request->file('image');

        // Generate unique filename
        $filename = Str::random(20) . '.' . $file->getClientOriginalExtension();
        $path = $file->storeAs("uploads/{$folder}", $filename, 'public');

        return response()->json([
            'path' => "/storage/{$path}",
            'filename' => $filename,
            'url' => "/storage/{$path}",
            'message' => 'Gambar berhasil diupload',
        ]);
    }

    public function destroy(string $filename)
    {
        // Search in common upload directories
        $folders = ['uploads/products', 'uploads/categories', 'uploads/rentals', 'uploads/general'];

        foreach ($folders as $folder) {
            $path = "{$folder}/{$filename}";
            if (Storage::disk('public')->exists($path)) {
                Storage::disk('public')->delete($path);
                return response()->json(['message' => 'Gambar berhasil dihapus']);
            }
        }

        return response()->json(['message' => 'Gambar tidak ditemukan'], 404);
    }
}
