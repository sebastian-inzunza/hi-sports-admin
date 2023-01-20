import BottomInput from '@/components/conversations/bottom-input'

const Conversations = () => {
  // Create a chat client, with side list and chat components
  return (
    // create a chat page with side list and chat components use tailwindcss
    <div className="flex flex-col h-screen">
      {/* UI like whatsapp web */}
      <div className="flex flex-col flex-1">
        <div className="flex-1 flex flex-row">
          <div className="flex flex-col w-1/4 border-r border-gray-100">
            {/* Iteration start */}
            <div className="flex flex-row items-center justify-between border-b border-gray-100 px-4 py-2">
              <div className="flex flex-row items-center">
                <img
                  src="https://i.pravatar.cc/150?img=1"
                  className="rounded-full w-10 h-10"
                />
                <div className="flex flex-col ml-2">
                  <span className="text-sm font-medium">John Doe</span>
                  <span className="text-xs text-gray-500">Active now</span>
                  <span className="text-xs text-gray-500">
                    Last seen 2 hours ago
                  </span>
                </div>
              </div>
              <div className="flex flex-row items-center">
                <svg
                  className="w-6 h-6 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </div>
            </div>

            <div className="flex flex-col flex-1 overflow-y-auto">
              <div className="flex flex-row items-center justify-between border-b border-gray-100 px-4 py-2">
                <div className="flex flex-row items-center">
                  <img
                    src="https://i.pravatar.cc/150?img=1"
                    className="rounded-full w-10 h-10"
                  />
                  <div className="flex flex-col ml-2">
                    <span className="text-sm font-medium">John Doe</span>
                    <span className="text-xs text-gray-500">Active now</span>
                    <span className="text-xs text-gray-500">
                      Last seen 2 hours ago
                    </span>
                  </div>
                </div>
                <div className="flex flex-row items-center">
                  <svg
                    className="w-6 h-6 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
            {/* Iteration End */}
          </div>
          {/* Body chat */}
          <div className="flex flex-col flex-1">
            <div className="flex flex-row items-center justify-between border-b border-gray-50 px-4 py-2 bg-slate-300">
              <div className="flex flex-row items-center">
                <img
                  src="https://i.pravatar.cc/150?img=1"
                  className="rounded-full w-10 h-10"
                />
                <div className="flex flex-col ml-2">
                  <span className="text-sm font-medium">John Doe</span>
                  <span className="text-xs">Active now</span>
                  <span className="text-xs text-gray-500">
                    Last seen 2 hours ago
                  </span>
                </div>
              </div>
              <div className="flex flex-row items-center">
                <svg
                  className="w-6 h-6 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </div>
            </div>
            {/* Put a input on bottom with icon to send message */}
            <div className="flex flex-col flex-1 overflow-y-auto">
              <BottomInput />
            </div>
          </div>
          {/* End Body */}
        </div>
      </div>
    </div>
  )
}

export default Conversations
