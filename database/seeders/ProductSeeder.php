<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $dinasId = Category::where('slug', 'baju-dinas')->first()->id;
        $menId = Category::where('slug', 'men-collection')->first()->id;
        $womenId = Category::where('slug', 'women-collection')->first()->id;
        $customId = Category::where('slug', 'custom-tailor')->first()->id;

        $products = [
            // === BAJU DINAS ===
            [
                'category_id' => $dinasId,
                'name' => 'PDUK Pimpinan',
                'price' => 2500000,
                'price_display' => 'Rp 2.500.000',
                'images' => ['/Foto Produk/Man paling atas PDUK PIMPINAN.PNG'],
                'features' => ['Cutting modern & sleek', 'Bahan tactical premium', 'Custom ukuran presisi', 'Tampil berwibawa & profesional'],
                'whatsapp_text' => 'Halo Savana Tailor, saya tertarik dengan PDUK Pimpinan (Rp 2.500.000). Saya ingin konsultasi ukuran dan detail pemesanan.',
                'is_featured' => true,
                'sort_order' => 1,
            ],
            [
                'category_id' => $dinasId,
                'name' => 'PDU Kejaksaan Pria',
                'price' => 2000000,
                'price_display' => 'Rp 2.000.000',
                'images' => ['/Foto Produk/PDU Man_ taro juga di jejeran utama paling atas setengah pduk dan pdub man tadi.PNG'],
                'features' => ['Cutting modern & sleek', 'Nyaman dipakai', 'Bisa custom ukuran', 'Tampil profesional'],
                'whatsapp_text' => 'Halo Savana Tailor, saya tertarik dengan PDU Kejaksaan Pria (Rp 2.000.000). Mohon info pemesanan.',
                'is_featured' => true,
                'sort_order' => 2,
            ],
            [
                'category_id' => $dinasId,
                'name' => 'PDUK Jaksa Perempuan',
                'price' => 2200000,
                'price_display' => 'Rp 2.200.000',
                'images' => ['/Foto Produk/PDUK Jaksa Perempuan.PNG'],
                'features' => ['Cutting modern & feminim', 'Bahan premium breathable', 'Custom ukuran', 'Tampil elegan & profesional'],
                'whatsapp_text' => 'Halo Savana Tailor, saya tertarik dengan PDUK Jaksa Perempuan (Rp 2.200.000). Mohon info pemesanan.',
                'is_featured' => true,
                'sort_order' => 3,
            ],
            [
                'category_id' => $dinasId,
                'name' => 'PDUB Jaksa Perempuan',
                'price' => 2000000,
                'price_display' => 'Rp 2.000.000',
                'images' => ['/Foto Produk/PDUB Jaksa Perempuan.PNG'],
                'features' => ['Cutting modern', 'Nyaman dipakai', 'Bisa custom ukuran', 'Tampil profesional'],
                'whatsapp_text' => 'Halo Savana Tailor, saya tertarik dengan PDUB Jaksa Perempuan (Rp 2.000.000). Mohon info pemesanan.',
                'is_featured' => true,
                'sort_order' => 4,
            ],
            [
                'category_id' => $dinasId,
                'name' => 'Baju Dinas Lapangan (PDL)',
                'price' => 1500000,
                'price_display' => 'Rp 1.500.000',
                'images' => ['/Foto Produk/Baju Dinas Lapagan.PNG'],
                'features' => ['Bahan tactical premium', 'Nyaman untuk lapangan', 'Custom ukuran', 'Tahan lama & awet'],
                'whatsapp_text' => 'Halo Savana Tailor, saya tertarik dengan Baju Dinas Lapangan/PDL (Rp 1.500.000). Mohon info pemesanan.',
                'sort_order' => 5,
            ],
            [
                'category_id' => $dinasId,
                'name' => 'Kemeja Dinas (PDH)',
                'price' => 800000,
                'price_display' => 'Rp 800.000',
                'images' => ['/Foto Produk/Kemeja.PNG'],
                'features' => ['Bahan premium', 'Nyaman dipakai harian', 'Custom ukuran', 'Finishing rapi'],
                'whatsapp_text' => 'Halo Savana Tailor, saya tertarik dengan Kemeja Dinas/PDH (Rp 800.000). Mohon info pemesanan.',
                'sort_order' => 6,
            ],

            // === MEN COLLECTION ===
            [
                'category_id' => $menId,
                'name' => 'Jas Formal Custom',
                'price' => 2800000,
                'price_display' => 'Rp 2.800.000',
                'images' => ['/Foto Produk/IMG_7054.PNG'],
                'features' => ['Full custom ukuran', 'Bahan wool/semi wool', 'Detail finishing premium', 'Konsultasi desain personal'],
                'whatsapp_text' => 'Halo Savana Tailor, saya tertarik dengan Jas Formal Custom pria (Rp 2.800.000). Saya ingin konsultasi desain dan ukuran.',
                'sort_order' => 1,
            ],
            [
                'category_id' => $menId,
                'name' => 'Kemeja Formal',
                'price' => 800000,
                'price_display' => 'Rp 800.000',
                'images' => ['/Foto Produk/Lengan Pendek.PNG'],
                'features' => ['Bahan premium', 'Cutting modern', 'Custom ukuran', 'Cocok untuk formal & semi-formal'],
                'whatsapp_text' => 'Halo Savana Tailor, saya tertarik dengan Kemeja Formal pria (Rp 800.000). Mohon info pemesanan.',
                'sort_order' => 2,
            ],
            [
                'category_id' => $menId,
                'name' => 'One Set Formal',
                'price' => 3500000,
                'price_display' => 'Rp 3.500.000',
                'images' => ['/Foto Produk/IMG_7058.PNG'],
                'features' => ['Jas + celana + kemeja', 'Full custom ukuran', 'Bahan premium', 'Tampil sempurna dari atas ke bawah'],
                'whatsapp_text' => 'Halo Savana Tailor, saya tertarik dengan One Set Formal pria (Rp 3.500.000). Saya ingin konsultasi paket lengkap.',
                'sort_order' => 3,
            ],
            [
                'category_id' => $menId,
                'name' => 'Celana Formal',
                'price' => 600000,
                'price_display' => 'Rp 600.000',
                'images' => ['/Foto Produk/IMG_7059.PNG'],
                'features' => ['Custom ukuran', 'Bahan premium', 'Cutting modern', 'Nyaman dipakai seharian'],
                'whatsapp_text' => 'Halo Savana Tailor, saya tertarik dengan Celana Formal pria (Rp 600.000). Mohon info pemesanan.',
                'sort_order' => 4,
            ],
            [
                'category_id' => $menId,
                'name' => 'Tactical Uniform',
                'price' => 1500000,
                'price_display' => 'Rp 1.500.000',
                'images' => ['/Foto Produk/IMG_6943.PNG'],
                'features' => ['Bahan tactical premium', 'Desain fungsional', 'Custom ukuran', 'Tahan lama'],
                'whatsapp_text' => 'Halo Savana Tailor, saya tertarik dengan Tactical Uniform (Rp 1.500.000). Mohon info pemesanan.',
                'sort_order' => 5,
            ],

            // === WOMEN COLLECTION ===
            [
                'category_id' => $womenId,
                'name' => 'Blazer Wanita',
                'price' => 2500000,
                'price_display' => 'Rp 2.500.000',
                'images' => ['/Foto Produk/IMG_7134.PNG'],
                'features' => ['Cutting modern & feminim', 'Bahan premium', 'Custom ukuran', 'Tampil elegan & percaya diri'],
                'whatsapp_text' => 'Halo Savana Tailor, saya tertarik dengan Blazer Wanita (Rp 2.500.000). Saya ingin konsultasi desain dan ukuran.',
                'sort_order' => 1,
            ],
            [
                'category_id' => $womenId,
                'name' => 'Jas Wanita Custom',
                'price' => 2800000,
                'price_display' => 'Rp 2.800.000',
                'images' => ['/Foto Produk/IMG_7135.PNG'],
                'features' => ['Full custom design', 'Bahan wool/semi wool', 'Detail finishing premium', 'Konsultasi personal'],
                'whatsapp_text' => 'Halo Savana Tailor, saya tertarik dengan Jas Wanita Custom (Rp 2.800.000). Saya ingin konsultasi desain.',
                'sort_order' => 2,
            ],
            [
                'category_id' => $womenId,
                'name' => 'Kebaya Modern',
                'price' => 2000000,
                'price_display' => 'Rp 2.000.000',
                'images' => ['/Foto Produk/IMG_7137.PNG'],
                'features' => ['Desain modern', 'Bahan premium', 'Custom ukuran', 'Cocok untuk acara formal'],
                'whatsapp_text' => 'Halo Savana Tailor, saya tertarik dengan Kebaya Modern (Rp 2.000.000). Mohon info pemesanan.',
                'sort_order' => 3,
            ],
            [
                'category_id' => $womenId,
                'name' => 'Dress Formal',
                'price' => 1800000,
                'price_display' => 'Rp 1.800.000',
                'images' => ['/Foto Produk/IMG_7140.PNG'],
                'features' => ['Cutting elegan', 'Bahan premium', 'Custom ukuran', 'Tampil anggun & profesional'],
                'whatsapp_text' => 'Halo Savana Tailor, saya tertarik dengan Dress Formal (Rp 1.800.000). Mohon info pemesanan.',
                'sort_order' => 4,
            ],
            [
                'category_id' => $womenId,
                'name' => 'Women Professional Set',
                'price' => 3000000,
                'price_display' => 'Rp 3.000.000',
                'images' => ['/Foto Produk/IMG_7141.PNG'],
                'features' => ['Set lengkap profesional', 'Full custom ukuran', 'Bahan premium', 'Tampil sempurna'],
                'whatsapp_text' => 'Halo Savana Tailor, saya tertarik dengan Women Professional Set (Rp 3.000.000). Saya ingin konsultasi paket lengkap.',
                'sort_order' => 5,
            ],
            [
                'category_id' => $womenId,
                'name' => 'Rok & Celana Formal',
                'price' => 700000,
                'price_display' => 'Rp 700.000',
                'images' => ['/Foto Produk/IMG_7142.PNG'],
                'features' => ['Custom ukuran', 'Bahan premium', 'Cutting modern', 'Nyaman dipakai seharian'],
                'whatsapp_text' => 'Halo Savana Tailor, saya tertarik dengan Rok/Celana Formal wanita (Rp 700.000). Mohon info pemesanan.',
                'sort_order' => 6,
            ],

            // === CUSTOM TAILOR ===
            [
                'category_id' => $customId,
                'name' => 'Custom Jas Premium',
                'price' => 2500000,
                'price_display' => 'Mulai Rp 2.500.000',
                'images' => ['/Foto Produk/IMG_7062.PNG'],
                'features' => ['Full custom design', 'Pilihan bahan premium', 'Konsultasi personal', 'Fitting sampai pas'],
                'whatsapp_text' => 'Halo Savana Tailor, saya ingin custom jas premium (Mulai Rp 2.500.000). Saya ingin konsultasi desain dan bahan.',
                'sort_order' => 1,
            ],
            [
                'category_id' => $customId,
                'name' => 'Custom Baju Dinas',
                'price' => 1500000,
                'price_display' => 'Mulai Rp 1.500.000',
                'images' => ['/Foto Produk/IMG_7065.PNG'],
                'features' => ['Sesuai regulasi instansi', 'Bahan tactical premium', 'Custom ukuran presisi', 'Konsultasi langsung'],
                'whatsapp_text' => 'Halo Savana Tailor, saya ingin custom baju dinas (Mulai Rp 1.500.000). Saya ingin konsultasi kebutuhan seragam instansi saya.',
                'sort_order' => 2,
            ],
            [
                'category_id' => $customId,
                'name' => 'Custom Kebaya',
                'price' => 2000000,
                'price_display' => 'Mulai Rp 2.000.000',
                'images' => ['/Foto Produk/IMG_7173.PNG'],
                'features' => ['Desain custom sesuai keinginan', 'Bahan premium pilihan', 'Detail bordir & payet', 'Fitting sampai sempurna'],
                'whatsapp_text' => 'Halo Savana Tailor, saya ingin custom kebaya (Mulai Rp 2.000.000). Saya ingin konsultasi desain kebaya impian saya.',
                'sort_order' => 3,
            ],
        ];

        foreach ($products as $product) {
            $product['slug'] = Str::slug($product['name']) . '-' . Str::random(5);
            $product['status'] = 'active';
            Product::updateOrCreate(
                ['name' => $product['name']],
                $product,
            );
        }
    }
}
