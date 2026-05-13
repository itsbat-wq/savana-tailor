<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Baju Dinas',
                'slug' => 'baju-dinas',
                'description' => 'Koleksi baju dinas kejaksaan — PDU, PDL, PDH, dan seragam resmi lainnya.',
                'sort_order' => 1,
            ],
            [
                'name' => 'Men Collection',
                'slug' => 'men-collection',
                'description' => 'Koleksi pakaian formal pria — jas custom, kemeja, celana, dan one set formal.',
                'sort_order' => 2,
            ],
            [
                'name' => 'Women Collection',
                'slug' => 'women-collection',
                'description' => 'Koleksi pakaian formal wanita — blazer, jas, kebaya modern, dress, dan formal wear.',
                'sort_order' => 3,
            ],
            [
                'name' => 'Custom Tailor',
                'slug' => 'custom-tailor',
                'description' => 'Layanan custom tailoring premium — jas, baju dinas, kebaya, sesuai keinginan Anda.',
                'sort_order' => 4,
            ],
        ];

        foreach ($categories as $cat) {
            Category::updateOrCreate(['slug' => $cat['slug']], $cat);
        }
    }
}
