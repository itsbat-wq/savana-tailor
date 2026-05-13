import React from 'react';
import { useParams } from 'react-router-dom';

export default function ProductDetailPage() {
    const { slug } = useParams();
    return (
        <section className="section" style={{paddingTop:'120px'}}>
            <div className="container" style={{textAlign:'center'}}>
                <p className="text-body">Detail produk: <strong>{slug}</strong></p>
                <p style={{opacity:0.6,marginTop:'10px'}}>Halaman ini akan menampilkan detail produk setelah backend API tersedia.</p>
            </div>
        </section>
    );
}
