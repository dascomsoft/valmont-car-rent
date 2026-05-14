import AdminHeader from '@/components/AdminHeader.jsx';

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      {children}
    </div>
  );
}