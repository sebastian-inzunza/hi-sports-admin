import Card from '../common/card'
import Button from '../ui/button'
import Description from '../ui/description'
import Input from '../ui/input'
import PasswordInput from '../ui/password-input'

const UserCreateForm = () => {
  return (
    <form noValidate>
      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title="Usuario"
          details="Llena todos los campos para crear un nuevo usuario"
          className="sm:pe-4 md:pe-5 w-full px-0 pb-5 sm:w-4/12 sm:py-8 md:w-1/3"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input name="name" label="Nombre" className="mb-4" />
          <Input name="apellido" label="Apellido" className="mb-4" />
          <Input name="email" label="Email" className="mb-4" />
          <PasswordInput
            name="password"
            label="Contraseña"
            className="mb-4"
            error={undefined}
          />
        </Card>
      </div>
      <div className="text-end mb-4 sm:mb-8">
        <Button>Crear</Button>
      </div>
    </form>
  )
}

export default UserCreateForm
