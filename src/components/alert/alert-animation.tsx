import Lottie from 'react-lottie'
import animationData from '@/assets/lottie/alert.json'

const AlertAnimation = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  return <Lottie options={defaultOptions} height={250} width={250} />
}

export default AlertAnimation
