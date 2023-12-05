/* eslint-disable @typescript-eslint/no-explicit-any */
import pick from 'lodash/pick'

import { useUpdateUserMutation } from '@/data/users'
import { useMeQuery } from '@/data/users'

import { UsersResponse } from '@/types/users'
import { useForm } from 'react-hook-form'
import Card from '../common/card'
import Description from '../ui/description'
import FileInput from '../ui/file-input'
import Input from '../ui/input'
import Button from '../ui/button'
import { useRouter } from 'next/router'
import { Role } from '@/types/users'
import Select from '../ui/select/select'
import { useState } from 'react'

export default function ProfileUpdateForm({ me }: UsersResponse | any) {
  const { mutate: updateUser, isLoading: loading } = useUpdateUserMutation()
  const { data } = useMeQuery()
  const [role, setRole] = useState('')

  const { register, control, handleSubmit, setValue } = useForm({
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

  const roleOptions = [
    {
      label: 'Redactores',
      value: Role.ADMIN_MEDIA,
    },
    {
      label: 'Ventas',
      value: Role.ADMIN_PUBLICITY,
    },
    {
      label: 'Coordinador',
      value: Role.ADMIN_NOTES,
    },
  ]

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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

          {/* <Input
            label="Rol"
            {...register('role')}
            variant="outline"
            disabled={true}
            className="mb-5"
          /> */}

          <div className="mb-3 flex flex-col">
            <span style={{ color: '#4b5563' }} className="text-sm font-bold">
              Rol
            </span>
            <input
              className="rounded-md py-3"
              disabled={true}
              style={{ backgroundColor: '#eff1f4', borderColor: '#d1d5db' }}
              type="text"
              value={
                me.role === 'SUPER_ADMIN'
                  ? 'Administrador'
                  : me.role === 'ADMIN_MEDIA'
                  ? 'Redactor'
                  : me.role === 'ADMIN_PUBLICITY'
                  ? 'Ventas'
                  : me.role === 'ADMIN_NOTES'
                  ? 'Coordinador'
                  : ''
              }
            />
          </div>

          {data?.role === 'SUPER_ADMIN' ? (
            <>
              <span style={{ color: '#4b5563' }} className="text-sm font-bold">
                Cambiar Rol
              </span>
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
            </>
          ) : null}

          <div className="mb-4"></div>
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
