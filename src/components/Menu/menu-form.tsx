import { useForm } from 'react-hook-form'
import Card from '../common/card'
import Button from '../ui/button'
import Description from '../ui/description'
import Input from '../ui/input'
import { useCreateMenuMutation } from '@/data/menu'

import TextArea from '../ui/text-area'
import Label from '../ui/label'
import FileInput from '../ui/file-input'
import { slugglify } from '@/utils/slugglify'
import SwitchInput from '../ui/switch-input copy'
import { CreateCategoryInput } from '@/types/category'
import Image from 'next/image'
import { CreateMenuInput } from '@/types/menu'

const MenuForm = ({ defaultValues }: { defaultValues?: any }) => {
  console.log('===== MenuForm =====')
  console.log('defaultValues', defaultValues)
  console.log('===== MenuForm =====')

  const { mutate: createMenu, isLoading: creating } = useCreateMenuMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<CreateMenuInput>({
    defaultValues: defaultValues ?? {
      titulo: '',
      source: '',
    },
  })

  async function onSubmit(values: CreateMenuInput) {
    const body: any = {
      source: values.source,
      titulo: values.titulo,
    }
    createMenu(body)
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title="Titulo y Ruta"
          details="Este menu es el que se visualiza a en la esquina superior, del menu de hamburguesa, son esas opcione, el cual tambien tiene una ruta que redirige."
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label="Titulo"
            type="text"
            variant="outline"
            className="mb-4"
            error={errors.titulo?.message?.toString()}
          />
          <Input
            label="Ruta o Url"
            type="text"
            variant="outline"
            className="mb-4"
            error={errors.source?.message?.toString()}
          />
        </Card>
      </div>

      <div className="mb-4 text-end sm:mb-8">
        <Button>Crear</Button>
      </div>
    </form>
  )
}

export default MenuForm
