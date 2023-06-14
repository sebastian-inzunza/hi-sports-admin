import { useState } from 'react'

import Card from '../common/card'
import Description from '../ui/description'
import Input from '../ui/input'
import PickColorComponent from './pick-color'
import { useClickOutside } from '@/hooks/useClickListener'
import Label from '../ui/label'
import FileInput from '../ui/file-input'
import { useForm } from 'react-hook-form'
import Button from '../ui/button'
import { slugify } from '@/utils/slugify'

type FormValue = {
  name: string
  primary_color: string
  secondary_color: string
  segment: string
  logo?: string
}

export default function EnvironmentForm() {
  const [showPrimaryColorPicker, setShowPrimaryColorPicker] = useState(false)
  const [showSecondaryColorPicker, setShowSecondaryColorPicker] =
    useState(false)

  const handleClickOutside = () => {
    setShowPrimaryColorPicker(false)
    setShowSecondaryColorPicker(false)
  }
  const divRef = useClickOutside(handleClickOutside)

  const [primaryColor, setPrimaryColor] = useState('#000000')
  const [secondaryColor, setSecondaryColor] = useState('#000000')
  const [segment, setSegment] = useState('')

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>({
    defaultValues: {
      name: '',
      primary_color: '',
      secondary_color: '',
      segment: segment,
    },
  })

  async function onSubmit(values: FormValue) {
    const newValues = {
      name: values.name,
      primary_color: primaryColor,
      secondary_color: secondaryColor,
      segment: segment,
      logo: values.logo,
    }

    console.log(newValues)
  }

  return (
    <>
      <form ref={divRef} onSubmit={handleSubmit(onSubmit)}>
        <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
          <Description
            title="Ambiente"
            details="Crea un ambiente para tu negocio."
            className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
          />
          <Card
            className="w-full sm:w-8/12 md:w-2/3"
            onClickOutside={() => {
              setShowPrimaryColorPicker(false)
              setShowSecondaryColorPicker(false)
            }}
          >
            <Label className="mb-2">Logo</Label>
            <FileInput name="logo" control={control} multiple={false} />
            <Input
              label="Nombre"
              variant="outline"
              className="mb-5 mt-5"
              {...register('name')}
              error={errors.name?.message}
              onChange={(e) => {
                setSegment(slugify(e.target.value))
              }}
            />
            <Input
              label="Segmento"
              note="El segmento no se puede modificar. Es el identificador único de tu ambiente y se usa para enviar notificaciones a los usuarios suscritos"
              variant="outline"
              className="mb-5"
              {...register('segment')}
              error={errors.segment?.message}
              value={segment}
              disabled
            />

            <Label className="mb-2">Color primario</Label>
            <PickColorComponent
              color={primaryColor}
              onChange={setPrimaryColor}
              showPicker={showPrimaryColorPicker}
              setShowPicker={setShowPrimaryColorPicker}
            />

            <Label className="mt-5">Color secundario</Label>

            <PickColorComponent
              color={secondaryColor}
              onChange={setSecondaryColor}
              showPicker={showSecondaryColorPicker}
              setShowPicker={setShowSecondaryColorPicker}
            />
          </Card>
        </div>

        <div className="mb-4 text-end">
          <Button>Crear ambiente</Button>
        </div>
      </form>
    </>
  )
}
