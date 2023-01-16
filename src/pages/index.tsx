import dynamic from 'next/dynamic'
import AppLayout from '@/components/layout/app'
const AdminDashboard = dynamic(() => import('@/components/dashboard/admin'))

export default function Dashboard() {
  return <AdminDashboard />
}

Dashboard.Layout = AppLayout
