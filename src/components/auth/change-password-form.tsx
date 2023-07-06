/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUpdatePasswordMutation } from '@/data/users'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import Card from '../common/card'
import Button from '../ui/button'
import Description from '../ui/description'
import PasswordInput from '../ui/password-input'

interface FormValues {
  oldPassword: string
  newPassword: string
  passwordConfirmation: string
}

const changePasswordSchema = yup.object().shape({
  oldPassword: yup.string().required('El campo es requerido'),
  newPassword: yup.string().required('El campo es requerido'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'La contraseña no coincide')
    .required('El campo es requerido'),
})

const ChangePasswordForm = () => {
  const { mutate: changePassword, isLoading: loading } =
    useUpdatePasswordMutation()

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(changePasswordSchema),
  })

  async function onSubmit(values: FormValues) {
    changePassword(
      {
        newPassword: values.newPassword,
      },
      {
        onSuccess: (data: any) => {
          reset()
        },
        onError: (error: any) => {
          Object.keys(error?.response?.data).forEach((field: any) => {
            setError(field, {
              type: 'manual',
              message: error?.response?.data[field][0],
            })
          })
        },
      }
    )
  }
  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title="Contraseña"
          details="Actualiza tu contraseña"
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        <Card className="mb-5 w-full sm:w-8/12 md:w-2/3">
          <PasswordInput
            label="Contraseña actual"
            {...register('oldPassword')}
            variant="outline"
            className="mb-5"
            error={errors.oldPassword?.message}
          />

          <PasswordInput
            label="Nueva contraseña"
            {...register('newPassword')}
            variant="outline"
            className="mb-5"
            error={errors.newPassword?.message}
          />

          <PasswordInput
            label="Confirmar contraseña"
            {...register('passwordConfirmation')}
            variant="outline"
            className="mb-5"
            error={errors.passwordConfirmation?.message}
          />
        </Card>
        <div className="w-full text-end">
          <Button loading={loading} disabled={loading}>
            Actualizar contraseña
          </Button>
        </div>
      </div>
    </form>
  )
}

export default ChangePasswordForm
