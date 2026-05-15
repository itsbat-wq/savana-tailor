import CatalogClient from '@/components/ui/CatalogClient';
export const metadata = { title: "Men's Collection - Savana Tailor Boutique" };
export default function MenPage() {
  return <CatalogClient categorySlug="men-collection" title="Men's Collection" subtitle="Koleksi Pria" />;
}
