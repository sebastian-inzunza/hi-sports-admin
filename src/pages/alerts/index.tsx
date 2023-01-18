import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'

import Search from '@/components/common/search'
import Layout from '@/components/layout/admin'

export default function Alerts() {
  return (
    <div>
      <h1 className="font-montserrat">Lista de Alertas</h1>
      {/* Split on two columns with css */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow-lg p-4">
          {/* Put a searchbar with dropdown filters with tailwindcss, content search must be bigger than filter */}
          <div className="flex items-center justify-between">
            <Search onSearch={() => console.log('onsearch')} />
            {/* Put button with icon filter, border radius and shadow with tailwindcss */}
            <div className="flex items-center ml-4 space-x-2">
              <button className="bg-white shadow-lg p-2 rounded-md">
                <FontAwesomeIcon icon={faFilter} />
              </button>
            </div>
          </div>
          <h2 className="text-lg font-semibold text-heading">Alerta 1</h2>
          <p className="text-sm text-body mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quod.
          </p>
          {/* Create a list with Alerts */}
        </div>
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-lg font-semibold text-heading">Map</h2>
        </div>
      </div>
      {/* Create a component with map on background, in the bottom put a rounded card with information of user */}
    </div>
  )
}

Alerts.Layout = Layout
