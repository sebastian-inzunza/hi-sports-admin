import * as yup from 'yup'

export const noteValidationSchema = yup.object().shape({
  title: yup.string().required('El título es requerido'),
  autor: yup.string().required('El autor es requerido'),
})
