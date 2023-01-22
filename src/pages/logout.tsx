import Loader from '@/components/ui/loader'
import { Routes } from '@/config/routes'
import { useLogoutMutation } from '@/data/users'
import { AUTH_CRED } from '@/utils/constants'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

function SignOut() {
  const router = useRouter()
  const { message } = useLogoutMutation()

  useEffect(() => {
    Cookies.remove(AUTH_CRED)
    router.replace(Routes.login)
    toast.success('Hasta luego')
  }, [])

  return <Loader text={message} />
}
export default SignOut
