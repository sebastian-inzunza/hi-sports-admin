/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRegisterMutation } from '@/data/users'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'

import Card from '../common/card'
import Button from '../ui/button'
import Description from '../ui/description'
import Input from '../ui/input'
import PasswordInput from '../ui/password-input'
import { userValidationSchema } from './user-validation-schema'
import { useEnviromentQuery } from '@/data/enviroment'
import Select from '../select/select'
import Loader from '../ui/loader/loader'
import Label from '../ui/label'
import { Role } from '@/types/users'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

type FormValues = {
  firstName: string
  lastName: string
  email: string
  password: string
  middleName?: string
  username: string
  enviroment?: any
  role: string
}

const defaultValues: FormValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  middleName: '',
  username: '',
  role: '',
  enviroment: null,
}

const UserCreateForm = () => {
  const { mutate: registerUser, isLoading: loading } = useRegisterMutation()
  const { enviroments, loading: loadEnviroment } = useEnviromentQuery({
    limit: 15,
    page: 1,
    search: '',
  })

  const {
    register,
    handleSubmit,
    setValue, // Asegúrate de incluir setValue
    formState: { errors },
    setError,
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(userValidationSchema),
  })

  const roleOptions = [
    {
      label: 'Usuario',
      value: Role.User,
    },
    {
      label: 'Operador',
      value: Role.Operator,
    },
  ]

  async function onSubmit({
    firstName,
    lastName,
    email,
    password,
    middleName,
    username,
    role,
  }: FormValues) {
    const body = {
      firstName,
      lastName,
      email,
      password,
      middleName: middleName || null,
      username,
      role,
    }

    registerUser(
      {
        firstName,
        lastName,
        email,
        password,
        middleName: middleName || null,
        username,
        role,
      },
      {
        onError: (error: any) => {
          if (error.response?.data?.errors) {
            error.response.data.errors.forEach((error: any) => {
              setError(error.field, {
                type: 'manual',
                message: error.message,
              })
            })
          }
        },
      }
    )
  }

  if (loadEnviroment) {
    return <Loader />
  }

  const router = useRouter()

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title="Usuario"
          details="Llena todos los campos para crear un nuevo usuario"
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label="Nombre"
            {...register('firstName')}
            type="text"
            placeholder="Nombre"
            variant="outline"
            className="mb-4"
            error={errors.firstName?.message?.toString()}
          />
          <Input
            label="Apellido"
            className="mb-4"
            variant="outline"
            placeholder="Apellido"
            {...register('lastName')}
            error={errors.lastName?.message?.toString()}
          />
          <Input
            label="Email"
            className="mb-4"
            placeholder="Email"
            type="email"
            variant="outline"
            {...register('email')}
            error={errors.email?.message?.toString()}
          />
          <PasswordInput
            {...register('password')}
            label="Contraseña"
            placeholder="Contraseña"
            className="mb-4"
            variant="outline"
            error={errors.password?.message?.toString()}
          />
          <Input
            label="Usuario"
            placeholder="Usuario"
            className="mb-4"
            variant="outline"
            {...register('username')}
            error={errors.username?.message?.toString()}
          />
          <Select
            name="role"
            isLoading={loading}
            options={roleOptions}
            getOptionLabel={(option: any) => option?.label}
            getOptionValue={(option: any) => option?.value}
            placeholder="Rol del usuario"
            isClearable={true}
            onChange={(selectedOption) =>
              setValue('role', selectedOption?.value)
            }
          />

          {/* <Label className="mb-4">Selecciona el Ambiente</Label>
          <Select
            options={enviroments ?? []}
            isLoading={loading}
            getOptionLabel={(option: any) => option?.name ?? ''}
            getOptionValue={(option: any) => option?.id ?? ''}
            placeholder="Encuentra a un usuario"
            onChange={(value: any) => console.log(value)}
            isClearable={true}
          /> */}
        </Card>
      </div>

      <div className="mb-4 text-end sm:mb-8">
        <Button
          variant="outline"
          onClick={router.back}
          className="me-4"
          type="button"
        >
          Atrás
        </Button>

        <Button disabled={loading} loading={loading}>
          Agregar cliente
        </Button>
      </div>
    </form>
  )
}

export default UserCreateForm
