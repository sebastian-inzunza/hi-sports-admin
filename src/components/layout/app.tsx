import dynamic from 'next/dynamic'
import { SUPER_ADMIN } from '@/utils/constants'

const AdminDashboard = dynamic(() => import('@/components/layout/admin'))

export default function AppLayout({
  userPermissions,
  ...props
}: {
  userPermissions: string
}) {
  return <AdminDashboard {...props} />

  // if (userPermissions === SUPER_ADMIN) {
  //   return <AdminDashboard {...props} />;
  // }
  // return (
  //   <div className="mt-2 bg-black">
  //     <div className="container mx-auto">
  //       <h1 className="text-2xl text-white">Hello World</h1>
  //     </div>
  //   </div>
  // );
}
