/* eslint-disable @typescript-eslint/no-explicit-any */
import pick from 'lodash/pick'

import { useUpdateUserMutation } from '@/data/users'
import { UsersResponse } from '@/types/users'
import { useForm } from 'react-hook-form'
import Card from '../common/card'
import Description from '../ui/description'
import FileInput from '../ui/file-input'
import Input from '../ui/input'
import Button from '../ui/button'
import { useRouter } from 'next/router'

export default function ProfileUpdateForm({ me }: UsersResponse | any) {
  const { mutate: updateUser, isLoading: loading } = useUpdateUserMutation()
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      ...(me &&
        pick(me, [
          'username',
          'email',
          'image',
          'role',
          'firstName',
          'lastName',
          'birthDate',
          'registrationDate',
        ])),
    },
  })

  async function onSubmit(values: UsersResponse) {
    if (me.id !== undefined) {
      updateUser({
        id: me.id,
        input: values,
      })
    }
  }

  const router = useRouter()

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title="Avatar"
          details="Actualiza tu foto de perfil"
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <FileInput name="image" control={control} />
        </Card>
      </div>
      <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title="Nombre"
          details="Actualiza tu nombre"
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        <Card className="mb-5 w-full sm:w-8/12 md:w-2/3">
          <Input
            label="Correo electrónico"
            {...register('email')}
            variant="outline"
            className="mb-5"
            disabled={true}
          />
          {/* Column with Nombre and Apellido Input */}
          <div className="flex flex-wrap">
            <div className="w-full sm:w-1/2">
              <Input
                label="Nombre"
                {...register('firstName')}
                variant="outline"
                className="mb-5 mr-5"
              />
            </div>
            <div className="w-full sm:w-1/2">
              <Input
                label="Apellido"
                {...register('lastName')}
                variant="outline"
                className="mb-5 ml-5"
              />
            </div>
          </div>

          <Input
            label="Fecha de nacimiento"
            {...register('birthDate')}
            variant="outline"
            className="mb-5"
          />

          <Input
            label="Fecha de registro"
            {...register('registrationDate')}
            variant="outline"
            className="mb-5"
            disabled={true}
          />

          <Input
            label="Rol"
            {...register('role')}
            variant="outline"
            className="mb-5"
            disabled={true}
          />

          <Input
            label="Nombre de usuario"
            {...register('username')}
            variant="outline"
            className="mb-5"
            disabled={true}
          />
        </Card>
        <div className="w-full text-end">
          <Button
            variant="outline"
            onClick={router.back}
            className="me-4"
            type="button"
          >
            Atrás
          </Button>

          <Button loading={loading} disabled={loading}>
            Actualizar
          </Button>
        </div>
      </div>
    </form>
  )
}
