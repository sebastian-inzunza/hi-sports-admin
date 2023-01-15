/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment } from 'react'
import Link from 'next/link'
import cn from 'classnames'
import { Menu, Transition } from '@headlessui/react'
import Avatar from '@/components/common/avatar'
import { siteSettings } from '@/settings/site.settings'

export default function AuthorizedMenu() {
  // Again, we're using framer-motion for the transition effect
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="flex items-center focus:outline-none">
        <Avatar src={siteSettings?.avatar?.placeholder} alt="avatar" />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          as="ul"
          className="end-0 origin-top-end absolute mt-1 w-48 rounded bg-white shadow-md focus:outline-none"
        >
          <Menu.Item key={'user'}>
            <li
              className="flex w-full flex-col space-y-1 rounded-t
             bg-[#082f75] px-4 py-3 text-sm text-white"
            >
              <span className="font-semibold capitalize">Jhon Doe</span>
              <span className="text-xs">admin@kali.com</span>
            </li>
          </Menu.Item>

          {siteSettings.authorizedLinks.map(({ href, labelTransKey }) => (
            <Menu.Item key={`${href}${labelTransKey}`}>
              {({ active }: any) => (
                <li className="cursor-pointer border-b border-gray-100 last:border-0">
                  <Link
                    href={href}
                    className={cn(
                      'block px-4 py-3 text-sm font-semibold capitalize transition duration-200 hover:text-accent',
                      active ? 'text-accent' : 'text-heading'
                    )}
                  >
                    {labelTransKey}
                  </Link>
                </li>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
