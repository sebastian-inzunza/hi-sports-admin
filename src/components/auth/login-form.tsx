/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Input from '@/components/ui/input'
import PasswordInput from '@/components/ui/password-input'
import { useLogin } from '@/data/users'
import { useState } from 'react'
import Router from 'next/router'
import { useForm } from 'react-hook-form'

import { Routes } from '@/config/routes'
import { allowedRoles, hasAccess, setAuthCredentials } from '@/utils/auth-utils'
import Button from '../ui/button'
import { LoginInput } from '@/types/index'
import { STAFF, STORE_OWNER, SUPER_ADMIN } from '@/utils/constants'

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const { register, handleSubmit } = useForm<LoginInput>()

  const { mutate: login, isLoading } = useLogin()

  const onSubmit = handleSubmit((data) => {
    login(data, {
      onSuccess: ({ token }: any) => {
        if (hasAccess(allowedRoles, [SUPER_ADMIN, STORE_OWNER, STAFF])) {
          setAuthCredentials(token, [SUPER_ADMIN, STORE_OWNER, STAFF])
          console.log('token', token)
          Router.push(Routes.dashboard)
          return
        }
        setErrorMessage(null)
      },
      onError: (error: any) => {
        setErrorMessage(error.response?.data?.message)
      },
    })
  })

  return (
    <>
      <form noValidate onSubmit={onSubmit} method="POST">
        <Input
          {...register('identifier')}
          label="Correo"
          error={errorMessage ? errorMessage : undefined}
        />
        <PasswordInput
          label={'Contraseña'}
          {...register('password')}
          error={errorMessage ? errorMessage : undefined}
          className="mt-2"
        />

        <Button
          className="w-full mt-5 bg-sky-600"
          type="submit"
          loading={isLoading}
          disabled={isLoading}
        >
          <span className="text-sm font-semibold text-white">
            Inicia sesión
          </span>
        </Button>
      </form>
    </>
  )
}

export default LoginForm
