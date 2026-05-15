<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rental extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'price_per_day',
        'price_display',
        'images',
        'whatsapp_text',
        'status',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'images' => 'array',
            'price_per_day' => 'integer',
            'sort_order' => 'integer',
        ];
    }

    public function getWhatsappUrlAttribute(): string
    {
        $phone = SiteSetting::getValue('whatsapp', '6281317935360');
        $text = $this->whatsapp_text
            ?? "Halo Savana Tailor, saya ingin bertanya tentang rental: {$this->name} - {$this->price_display}.";

        return "https://wa.me/{$phone}?text=" . urlencode($text);
    }

    public function scopeAvailable($query)
    {
        return $query->where('status', 'available');
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order');
    }
}
