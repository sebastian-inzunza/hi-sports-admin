import * as yup from 'yup'

export const userValidationSchema = yup.object().shape({
  email: yup.string().email('Email invalido').required('Email es requerido'),
  username: yup.string().required('Username es requerido'),
  password: yup.string().required('Password es requerido'),
  firstName: yup.string().required('Nombre es requerido'),
  middleName: yup.string().nullable(),
  lastName: yup.string().required('Apellido es requerido'),
})
