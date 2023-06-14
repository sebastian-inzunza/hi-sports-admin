import { useRef, useEffect, MutableRefObject } from 'react'

export const useClickOutside = (
  callback: () => void
): MutableRefObject<any> => {
  const ref = useRef<any>(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      callback()
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [])

  return ref
}
