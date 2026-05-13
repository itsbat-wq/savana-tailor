<?php

use Illuminate\Support\Facades\Route;

// SPA catch-all route — serves the React app for all frontend routes
Route::get('/{any?}', function () {
    return view('app');
})->where('any', '^(?!api).*$');
