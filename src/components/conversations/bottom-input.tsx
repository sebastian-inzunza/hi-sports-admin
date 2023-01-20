const BottomInput = () => {
  // Use TailwindCSS to style the component
  return (
    <div className="flex flex-row items-center justify-between w-full h-16 px-4 bg-white border-t border-gray-200">
      <div className="flex flex-row items-center w-full h-full bg-gray-100 rounded-full">
        <svg
          className="w-6 h-6 ml-2 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 12a3 3 0
                        11-6 0 3 3 0 016 0z"
          ></path>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 12a3 3 0
                        11-6 0 3 3 0 016 0z"
          ></path>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 12a3 3 0
                        11-6 0 3 3 0 016 0z"
          ></path>
        </svg>
        <input
          className="flex-1 ml-2 text-sm text-gray-500 bg-transparent outline-none"
          placeholder="Type a message..."
        />
      </div>
      {/* Button to send */}
      <div className="flex flex-row items-center justify-center w-12 h-12 ml-2 bg-blue-500 rounded-full">
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 19l9 2-9-18-9 18 9-2zm0
                        0v-8"
          ></path>
        </svg>
      </div>
    </div>
  )
}

export default BottomInput
