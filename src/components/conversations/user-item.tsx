import { UsersResponse } from '@/types/users'
import Image from 'next/image'
import Link from 'next/link'

type UserItemProps = {
  user: UsersResponse
}
const UserItem = ({ user }: UserItemProps) => {
  console.log('User item', user)
  return (
    <li key={user.id}>
      <Link
        href="#"
        className="hover:bg-gray-100 block rounded-lg active:bg-gray-200"
      >
        {/* Avatar with circle if user is Connected (online property) */}
        <div className="flex items-center gap-4 p-4">
          <div className="relative">
            <Image
              src={user.image ?? '/images/avatar-placeholder.svg'}
              alt={user.firstName}
              className="w-12 h-12 rounded-full"
              width={48}
              height={48}
            />
            <span
              className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${
                user.online ? 'bg-green-500' : 'bg-gray-500'
              }`}
            ></span>
          </div>
        </div>
        <h5 className="font-bold">
          {user.firstName} {user.lastName}
        </h5>
        {/* put an small text with email */}
        <p className="text-gray-500 text-sm mb-2">{user.email}</p>
        {/* Transform updatedAt like: Yesterday, 14:35 hrs */}
        <span className="text-xs text-gray-400">
          {new Date(user.lastSeen).toLocaleDateString('es-MX', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </span>
      </Link>
    </li>
  )
}

export default UserItem
