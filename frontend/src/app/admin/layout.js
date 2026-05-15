import '../globals.css';
import Providers from '../providers';
import { Toaster } from 'sonner';

export const metadata = {
  title: 'Admin Panel - Savana Tailor Boutique',
};

/* Admin section has its own layout — no public Navbar/Footer */
export default function AdminRootLayout({ children }) {
  return (
    <div style={{ margin: 0, background: '#f5f5f5', fontFamily: 'Montserrat, sans-serif', minHeight: '100vh' }}>
      {children}
      <Toaster position="top-right" richColors />
    </div>
  );
}
