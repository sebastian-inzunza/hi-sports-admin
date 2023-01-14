/* eslint-disable @typescript-eslint/ban-types */
import React from 'react'
import Navbar from '../navigation/top-navbar'

export default function AdminLayout({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-100 transition-colors duration-150">
      <Navbar />
      <div className="flex flex-1 pt-20">
        {/* TODO: Add aside HERE */}
        <main className="ltr:lg:pl-72 ltr:xl:pl-76 rtl:lg:pr-72 rtl:xl:pr-76 rtl:lg:pl-0 w-full">
          <div className="h-full p-5 md:p-8">{children}</div>
        </main>
      </div>
    </div>
  )
}
