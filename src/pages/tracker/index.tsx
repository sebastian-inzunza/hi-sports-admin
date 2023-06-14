// Tracker user view
import React, { useContext, useState } from 'react'
import { SocketContext } from '@/contexts/sockets.context'

import Layout from '@/components/layout/admin'
import ListUsers from '@/components/tracker/list-users'
import { useUsersQuery } from '@/data/users'
import Search from '@/components/common/search'
import Loader from '@/components/ui/loader'
import ErrorMessage from '@/components/ui/error-message'
import TrackMap from '@/components/tracker/map-track'

export default function Tracker() {
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const { user, userLocation } = useContext(SocketContext)

  const { users, loading, error } = useUsersQuery({
    limit: 15,
    page,
    search: searchTerm,
  })

  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText)
    setPage(1)
  }

  if (error) return <ErrorMessage message={error.message} />

  return (
    <>
      {/* Must be two columns with more width map component and sidebar with a list of user to track*/}
      <div className="flex flex-row bg-white rounded-lg shadow-sm -mx-4">
        <div className="w-1/4">
          <div className="flex flex-row items-center justify-between mb-4 p-4 bg-white max-h-16">
            <Search onSearch={handleSearch} />
          </div>
          {loading ? (
            <Loader text="Cargando usuarios..." />
          ) : (
            <ListUsers users={users ?? []} />
          )}
        </div>
        {/* Must be map component */}
        <div className="w-3/4 h-screen">
          <div className="w-full">
            {/* If not select a user, show a message with instructions to view conversation */}
            {/* put on container map with card data */}
            {user ? (
              <div className="flex flex-row items-center justify-between mb-4 p-4 bg-white">
                <div className="flex flex-row items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200" />
                  <div className="ml-2">
                    <p className="text-sm font-semibold">{user.firstName}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
                <div className="flex flex-row items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  <p className="text-xs text-gray-500">Online</p>
                </div>
              </div>
            ) : null}

            {/* Border radius */}
            <div className="rounded-lg overflow-hidden m-4">
              {userLocation ? (
                <TrackMap lat={userLocation.lat} lng={userLocation.lng} />
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <p className="text-gray-500 text-center">
                    Selecciona un usuario para ver su ubicación
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

Tracker.Layout = Layout
