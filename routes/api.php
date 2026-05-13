<?php

use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\RentalController;
use App\Http\Controllers\Api\SettingController;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ProductController as AdminProductController;
use App\Http\Controllers\Admin\CategoryController as AdminCategoryController;
use App\Http\Controllers\Admin\RentalController as AdminRentalController;
use App\Http\Controllers\Admin\SettingController as AdminSettingController;
use App\Http\Controllers\Admin\MediaController;
use Illuminate\Support\Facades\Route;

// ===== PUBLIC API =====
Route::prefix('v1')->group(function () {
    Route::get('products', [ProductController::class, 'index']);
    Route::get('products/featured', [ProductController::class, 'featured']);
    Route::get('products/{product:slug}', [ProductController::class, 'show']);

    Route::get('categories', [CategoryController::class, 'index']);
    Route::get('categories/{category:slug}', [CategoryController::class, 'show']);

    Route::get('rentals', [RentalController::class, 'index']);
    Route::get('rentals/{rental}', [RentalController::class, 'show']);

    Route::get('settings', [SettingController::class, 'index']);
});

// ===== ADMIN AUTH =====
Route::prefix('admin')->group(function () {
    Route::post('login', [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('logout', [AuthController::class, 'logout']);
        Route::get('me', [AuthController::class, 'me']);

        Route::get('dashboard', [DashboardController::class, 'index']);

        Route::apiResource('products', AdminProductController::class);
        Route::patch('products-reorder', [AdminProductController::class, 'reorder']);

        Route::apiResource('categories', AdminCategoryController::class);

        Route::apiResource('rentals', AdminRentalController::class);

        Route::get('settings', [AdminSettingController::class, 'index']);
        Route::put('settings', [AdminSettingController::class, 'update']);

        Route::post('media/upload', [MediaController::class, 'upload']);
        Route::delete('media/{filename}', [MediaController::class, 'destroy']);
    });
});
