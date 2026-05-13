<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;

class SettingController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => SiteSetting::allGrouped(),
        ]);
    }
}
