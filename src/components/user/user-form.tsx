/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRegisterMutation } from '@/data/users'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

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

type FormValues = {
  firstName: string
  lastName: string
  email: string
  password: string
  middleName?: string
  username: string
  enviroment?: any
}

const defaultValues: FormValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  middleName: '',
  username: '',
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
    formState: { errors },
    setError,
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(userValidationSchema),
  })

  async function onSubmit({
    firstName,
    lastName,
    email,
    password,
    middleName,
    username,
  }: FormValues) {
    registerUser(
      {
        firstName,
        lastName,
        email,
        password,
        middleName: middleName || null,
        username,
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
            variant="outline"
            className="mb-4"
            error={errors.firstName?.message?.toString()}
          />
          <Input
            label="Segundo nombre"
            className="mb-4"
            variant="outline"
            {...register('middleName')}
          />
          <Input
            label="Apellido"
            className="mb-4"
            variant="outline"
            {...register('lastName')}
            error={errors.middleName?.message?.toString()}
          />
          <Input
            label="Email"
            className="mb-4"
            type="email"
            variant="outline"
            {...register('email')}
            error={errors.email?.message?.toString()}
          />
          <PasswordInput
            {...register('password')}
            label="Contraseña"
            className="mb-4"
            variant="outline"
            error={errors.password?.message?.toString()}
          />
          <Input
            label="Usuario"
            className="mb-4"
            variant="outline"
            {...register('username')}
            error={errors.username?.message?.toString()}
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
        <Button disabled={loading} loading={loading}>
          Crear
        </Button>
      </div>
    </form>
  )
}

export default UserCreateForm
