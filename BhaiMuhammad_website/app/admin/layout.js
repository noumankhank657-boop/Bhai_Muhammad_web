import AdminAuth from '@/components/AdminAuth';

export const metadata = {
  title: 'Admin Panel - Bhai Muhammad',
  robots: 'noindex, nofollow',
};

export default function AdminLayout({ children }) {
  return (
    <AdminAuth>
      {children}
    </AdminAuth>
  );
}
