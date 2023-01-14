/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import Input from '@/components/ui/input'
import PasswordInput from '@/components/ui/password-input'
import Button from '../ui/button'

const LoginForm = () => {
  function onSubmit() {
    console.log('Submit')
  }

  return (
    <div>
      <form noValidate onSubmit={onSubmit} method="POST">
        <Input name={'Email'} label="Correo" error={undefined} />
        <PasswordInput
          name={'Password'}
          label={'Contraseña'}
          error={undefined}
          className="mt-2"
        />

        <Button className="w-full mt-5 bg-sky-600" type="submit">
          <span className="text-sm font-semibold text-white">
            Inicia sesión
          </span>
        </Button>
      </form>
    </div>
  )
}

export default LoginForm
