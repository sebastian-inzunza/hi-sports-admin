import * as yup from 'yup'

export const environmentValidationSchema = yup.object().shape({
  name: yup.string().required('El nombre del entorno es requerido'),
  primary_color: yup.string().required('El color primario es requerido'),
  secondary_color: yup.string().required('El color secondario es requerido'),
  active: yup.boolean(),
  logo: yup.string(),
})
