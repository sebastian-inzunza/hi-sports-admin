import dynamic from 'next/dynamic'
const AdminLayout = dynamic(() => import('@/components/layout/admin'))

export default function AppLayout({ ...props }) {
  return <AdminLayout {...props} />
}
