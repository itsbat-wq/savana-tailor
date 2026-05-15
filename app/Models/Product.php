<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'name',
        'slug',
        'description',
        'price',
        'price_display',
        'images',
        'features',
        'whatsapp_text',
        'status',
        'is_featured',
        'sort_order',
        'type',
    ];

    protected function casts(): array
    {
        return [
            'images' => 'array',
            'features' => 'array',
            'price' => 'integer',
            'is_featured' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Generate the full WhatsApp URL for this product.
     */
    public function getWhatsappUrlAttribute(): string
    {
        $phone = SiteSetting::getValue('whatsapp', '6281317935360');
        $text = $this->whatsapp_text
            ?? "Halo Savana Tailor, saya tertarik dengan produk: {$this->name} ({$this->category->name}) - {$this->price_display}. Mohon info lebih lanjut.";

        return "https://wa.me/{$phone}?text=" . urlencode($text);
    }

    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order');
    }
}
