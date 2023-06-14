import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

import { useUI } from '@/contexts/ui.context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faExclamationCircle,
  faEye,
  faFire,
} from '@fortawesome/free-solid-svg-icons'
import { Alert } from '@/types/alerts'

type ToastProps = {
  alert: Alert
  viewAlert: (alert: Alert) => void
}

export default function Toast({ alert, viewAlert }: ToastProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const { displayToaster, closeToaster } = useUI()

  useEffect(() => {
    if (displayToaster) {
      // Show toast and put it in the DOM tree after 100ms
      if (alert?.content?.includes('S.O.S')) {
        setTimeout(() => {
          closeToaster()
        }, 10000)
      } else {
        setTimeout(() => {
          closeToaster()
        }, 5000)
      }
    }
  }, [displayToaster])

  useEffect(() => {
    audioRef.current?.play()
  }, [alert])

  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.6 }}
      className="fixed top-20 right-0 z-50 flex flex-col items-end justify-end w-full max-w-sm p-4 mx-4 mb-4 space-y-4 bg-white border border-gray-200 rounded-lg shadow-lg sm:mx-0 sm:max-w-sm"
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center space-x-2">
          <div
            className={`flex items-center justify-center w-10 h-10 text-white rounded-full ${
              alert?.content?.includes('S.O.S') ? 'bg-red-500' : 'bg-yellow-400'
            }`}
          >
            <FontAwesomeIcon
              icon={
                alert?.content?.includes('S.O.S') ? faFire : faExclamationCircle
              }
            />
          </div>
          <h4 className="text-sm font-semibold text-gray-700">
            {alert?.content?.includes('S.O.S')
              ? 'Alerta de emergencia!'
              : 'Alerta nueva'}
          </h4>
        </div>
        <button
          className="text-gray-400 transition-colors duration-200 transform rounded-md hover:text-gray-600 focus:outline-none focus:text-gray-600"
          onClick={() => viewAlert(alert)}
        >
          <FontAwesomeIcon icon={faEye} />
        </button>
      </div>
      {/* If alert?.content?.includes('S.O.S') not show content alert */}
      {!alert?.content?.includes('S.O.S') && (
        <p className="text-sm text-gray-500">{alert?.content}</p>
      )}
      <audio ref={audioRef} src="/alert.mp3" />
    </motion.div>
  )
}
