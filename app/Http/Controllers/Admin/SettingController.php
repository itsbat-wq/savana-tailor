<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => SiteSetting::allGrouped(),
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'settings' => 'required|array',
            'settings.*.key' => 'required|string',
            'settings.*.value' => 'nullable|string',
            'settings.*.group' => 'nullable|string',
        ]);

        foreach ($request->settings as $setting) {
            SiteSetting::setValue(
                $setting['key'],
                $setting['value'] ?? null,
                $setting['group'] ?? 'general'
            );
        }

        return response()->json([
            'message' => 'Settings berhasil diperbarui',
            'data' => SiteSetting::allGrouped(),
        ]);
    }
}
