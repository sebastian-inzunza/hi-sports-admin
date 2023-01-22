import { RiSendPlaneLine } from 'react-icons/ri'
import Layout from '@/components/layout/app'
import Card from '@/components/common/card'
import Link from 'next/link'

function ConversationsPage() {
  return (
    <Card>
      {/* Main */}
      {/* Two columns */}
      <main className="flex-1 flex flex-col lg:flex-row">
        {/* Left column */}
        {/* Established a height to scroll */}
        <ul className="hidden lg:block col-span-1 p-4 h-full overflow-y-scroll max-h-[calc(100vh-1rem)] min-w-[230px]">
          <li>
            <Link
              href="#"
              className="hover:bg-gray-100 block rounded-lg active:bg-gray-200"
            >
              <h5 className="font-bold">Jhon Doe</h5>
              <p className="text-gray-500 text-sm mb-2">
                {' '}
                Latest message here{' '}
              </p>
              <span className="text-xs text-gray-400">
                Yesterday, 14:35 hrs
              </span>
            </Link>
          </li>
        </ul>
        {/* All messages */}
        <div className="col-span-1 lg:col-span-3 relative p-4 h-full max-h-full overflow-y-scroll">
          <div className="h-full lg:h-[650px] overflow-y-scroll pb-28 lg:pb-10">
            <div className="flex justify-center">
              <p className="text-center border py-2 px-4 my-6 rounded-full">
                Yesterday
              </p>
            </div>
            {/* Message 1 User */}
            <div className="flex items-start gap-4">
              <span className="bg-blue-100 text-blue-900 font-bold py-2 px-[10px] rounded-full">
                RT
              </span>
              <div>
                <p className="text-gray-500 border p-4 mb-2 rounded-tr-2xl rounded-br-2xl rounded-bl-2xl">
                  Lorem Ipsum ha sido el texto de relleno estándar de las
                  industrias desde el año 1500, cuando un impresor (N. del T.
                  persona que se dedica a la imprenta) desconocido usó una
                  galería de textos y los mezcló de tal manera{' '}
                </p>
                <span className="text-gray-400 text-xs">
                  09 septiembre 2021, 15:30 hrs
                </span>
              </div>
            </div>
            <div className="flex justify-center">
              <p className="text-center border py-2 px-4 my-6 rounded-full">
                Today
              </p>
            </div>
            {/* Message 2 Admin */}
            <div className="flex items-start flex-row-reverse gap-4">
              <span className="bg-blue-100 text-blue-900 font-bold py-2 px-[10px] rounded-full">
                RT
              </span>
              <div>
                <p className="text-white bg-blue-600 p-4 mb-2 rounded-tl-2xl rounded-br-2xl rounded-bl-2xl">
                  Lorem Ipsum ha sido el texto de relleno estándar de las
                  industrias desde el año 1500
                </p>
                <span className="text-gray-400 text-xs flex justify-end">
                  09 septiembre 2021, 15:30 hrs
                </span>
              </div>
            </div>
          </div>
          {/* Send message Input */}
          <form className="absolute bg-gray-100 w-full bottom-0 left-0 p-6">
            <div className="relative">
              <RiSendPlaneLine className="absolute right-4 top-1/2 -translate-y-1/2 text-lg hover:cursor-pointer" />
              <input
                type="text"
                className="bg-white w-full outline-none py-2 pl-6 pr-10 rounded-full"
                placeholder="Escribe tu mensaje"
              />
            </div>
          </form>
        </div>
      </main>
    </Card>
  )
}

ConversationsPage.Layout = Layout

export default ConversationsPage
