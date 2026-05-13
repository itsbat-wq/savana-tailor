<?php

namespace Database\Seeders;

use App\Models\SiteSetting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            // Contact
            ['key' => 'phone', 'value' => '081317935360', 'group' => 'contact'],
            ['key' => 'whatsapp', 'value' => '6281317935360', 'group' => 'contact'],
            ['key' => 'instagram', 'value' => '@savanatailorboutique', 'group' => 'contact'],
            ['key' => 'tiktok', 'value' => '@savanatailorboutique', 'group' => 'contact'],
            ['key' => 'location', 'value' => 'Jakarta Utara', 'group' => 'contact'],

            // Hero
            ['key' => 'hero_title', 'value' => 'Crafting Elegance, Defining Excellence', 'group' => 'hero'],
            ['key' => 'hero_subtitle', 'value' => 'Custom Made • Exclusive • Elegant • Timeless', 'group' => 'hero'],
            ['key' => 'hero_description', 'value' => 'Spesialis baju dinas kejaksaan, formal wear premium, dan custom tailoring untuk profesional yang menghargai kualitas dan keanggunan.', 'group' => 'hero'],
            ['key' => 'hero_image', 'value' => '/Foto Produk/IMG_7054.PNG', 'group' => 'hero'],

            // Stats
            ['key' => 'stat_years', 'value' => '10+', 'group' => 'stats'],
            ['key' => 'stat_years_label', 'value' => 'Tahun Pengalaman', 'group' => 'stats'],
            ['key' => 'stat_cities', 'value' => '30+', 'group' => 'stats'],
            ['key' => 'stat_cities_label', 'value' => 'Kota Dilayani', 'group' => 'stats'],
            ['key' => 'stat_custom', 'value' => '100%', 'group' => 'stats'],
            ['key' => 'stat_custom_label', 'value' => 'Custom Made', 'group' => 'stats'],

            // About
            ['key' => 'about_text', 'value' => 'Savana Taylor Boutique adalah premium tailor boutique yang bergerak di bidang custom formal wear dan professional uniform untuk pria dan wanita. Selama kurang lebih 10 tahun, kami telah melayani berbagai kebutuhan pakaian formal dengan konsep eksklusif, elegan, dan profesional.', 'group' => 'about'],
        ];

        foreach ($settings as $setting) {
            SiteSetting::updateOrCreate(
                ['key' => $setting['key']],
                $setting,
            );
        }
    }
}
