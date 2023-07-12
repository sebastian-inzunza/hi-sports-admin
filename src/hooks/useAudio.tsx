import { useState, useEffect } from 'react'
import useInteraction from './useInteraction'

export default function useAudio(options: any) {
  const [audio, setAudio] = useState<any>()

  const interacted = useInteraction()

  useEffect(() => {
    async function createAudoContext() {
      const { Howl } = await import('howler')
      setAudio(new Howl(options))
    }

    if (interacted) {
      createAudoContext()
    }

    return () => {
      if (audio) {
        audio.unload()
      }
    }
  }, [options])

  const ready = Boolean(interacted && audio)

  return { audio, ready }
}
