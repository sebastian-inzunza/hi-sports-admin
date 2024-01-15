// // //@ts-nocheck
// // import {
// //   Table,
// //   TimePicker,
// //   Space,
// //   Upload,
// //   Image,
// //   Select,
// //   Form,
// //   Input,
// // } from 'antd'
// // import FileInput from '../ui/file-input'
// // import { useForm } from 'react-hook-form'
// // import Button from '../ui/button'
// // import { useState } from 'react'

// // const ProgramacionTV = () => {
// //   const { TextArea } = Input
// //   const [programacion, setProgramacion] = useState([])

// //   const horas = [
// //     { hora: '00:00' },
// //     { hora: '01:00' },
// //     { hora: '02:00' },
// //     { hora: '03:00' },
// //     { hora: '04:00' },
// //     { hora: '05:00' },
// //     { hora: '06:00' },
// //     { hora: '07:00' },
// //     { hora: '08:00' },
// //     { hora: '09:00' },
// //     { hora: '10:00' },
// //     { hora: '11:00' },
// //     { hora: '12:00' },
// //     { hora: '13:00' },
// //     { hora: '14:00' },
// //     { hora: '15:00' },
// //     { hora: '16:00' },
// //     { hora: '17:00' },
// //     { hora: '18:00' },
// //     { hora: '19:00' },
// //     { hora: '20:00' },
// //     { hora: '21:00' },
// //     { hora: '22:00' },
// //     { hora: '23:00' },
// //     { hora: '24:00' },
// //   ]

// //   const handleEliminarFila = (index) => {
// //     const newProgramacion = [...programacion]
// //     newProgramacion.splice(index, 1)
// //     setProgramacion(newProgramacion)
// //   }

// //   const handleImageChange = (info, index) => {
// //     if (info.file.status === 'done') {
// //       const newProgramacion = [...programacion]
// //       newProgramacion[index].imagen = info.file.originFileObj
// //       newProgramacion[index].nombreImagen = info.file.name // Almacena el nombre de la imagen
// //       setProgramacion(newProgramacion)
// //     }
// //   }

// //   const { Option } = Select
// //   const { control } = useForm()

// //   const columns = [
// //     {
// //       title: 'Hora',
// //       dataIndex: 'hora',
// //       key: 'hora',
// //       render: (text, record, index) => (
// //         <Form.Item
// //           label="Hora"
// //           name={`hour_${index}`} // Usa el índice para hacerlo único
// //           rules={[
// //             {
// //               required: true,
// //               message: 'Por favor, seleccione una opción',
// //             },
// //           ]}
// //         >
// //           <Select
// //             showSearch={false}
// //             mode="multiple"
// //             style={{ width: 200 }}
// //             placeholder="Selecciona un elemento"
// //           >
// //             {horas.map((element) => (
// //               <Option value={element.hora} key={element.hora}>
// //                 {element.hora}
// //               </Option>
// //             ))}
// //           </Select>
// //         </Form.Item>
// //       ),
// //     },
// //     {
// //       title: 'Programa',
// //       dataIndex: 'programa',
// //       key: 'programa',
// //       render: (text, record, index) => (
// //         <Form.Item
// //           label="Título"
// //           name={`title_${index}`} // Usa el índice para hacerlo único
// //           rules={[
// //             {
// //               required: true,
// //               message: 'Por favor, escribe el título',
// //             },
// //           ]}
// //         >
// //           <TextArea placeholder="Título" autoSize />
// //         </Form.Item>
// //       ),
// //     },
// //     {
// //       title: 'Imagen',
// //       dataIndex: 'imagen',
// //       key: 'imagen',
// //       height: 250, // Ajusta el ancho de la columna 'Imagen'
// //       render: (text, record, index) => (
// //         <Form.Item
// //           name={`image_${index}`}
// //           label="Logo"
// //           name={`image_${index}`} // Usa el índice para hacerlo único
// //           rules={[
// //             {
// //               required: true,
// //               message: 'Por favor, ingresa la imagen',
// //             },
// //           ]}
// //         >
// //           <FileInput
// //             name={`image_${index}`}
// //             control={control}
// //             multiple={false}
// //           />
// //         </Form.Item>
// //       ),
// //     },
// //     {
// //       title: 'Acciones',
// //       dataIndex: 'acciones',
// //       key: 'acciones',
// //       render: (text, record, index) => (
// //         <Space>
// //           <Button type="link" onClick={() => handleEliminarFila(index)}>
// //             Eliminar
// //           </Button>
// //         </Space>
// //       ),
// //     },
// //   ]

// //   const handleTimeChange = (value, index) => {
// //     const newProgramacion = [...programacion]
// //     newProgramacion[index].hora = value.format('HH:mm')
// //     setProgramacion(newProgramacion)
// //   }

// //   const handleAgregarFila = () => {
// //     setProgramacion((prevProgramacion) => [
// //       ...prevProgramacion,
// //       { hora: '00:00', programa: '', imagen: null },
// //     ])
// //   }

// //   const onFinish = (values) => {
// //     // Aquí puedes manejar la lógica cuando el formulario se envía
// //     console.log('Formulario enviado:', values)
// //   }

// //   return (
// //     <Form onFinish={onFinish} layout="vertical">
// //       <Table
// //         dataSource={programacion}
// //         columns={columns}
// //         pagination={false}
// //         rowKey={(record, index) => index}
// //       />

// //       <Form.Item className='mt-3'>
// //         <div style={{ display: 'flex', justifyContent: 'space-between' }}>
// //           <div>
// //             <Button type="primary" onClick={handleAgregarFila}>
// //               Agregar Fila
// //             </Button>
// //             <Button
// //               className="ml-3"
// //               type="danger"
// //               onClick={() => setProgramacion([])}
// //             >
// //               Eliminar Todas las Filas
// //             </Button>
// //           </div>
// //           <Button type="secondary" htmlType="submit">
// //             Enviar Formulario
// //           </Button>
// //         </div>
// //       </Form.Item>
// //     </Form>
// //   )
// // }

// // export default ProgramacionTV

// import React from 'react'
// import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
// import { Button, Card, Form, Input, Select, Space } from 'antd'
// import { useForm } from 'react-hook-form'
// import FileInput from '../ui/file-input'
// import Uploader from '../common/uploaderAntd'
// import ButtonMy from '../ui/button'

// const onFinish = (values: any) => {
//   console.log('Received values of form:', values)
// }

// const horas = [
//   { hora: '00:00' },
//   { hora: '01:00' },
//   { hora: '02:00' },
//   { hora: '03:00' },
//   { hora: '04:00' },
//   { hora: '05:00' },
//   { hora: '06:00' },
//   { hora: '07:00' },
//   { hora: '08:00' },
//   { hora: '09:00' },
//   { hora: '10:00' },
//   { hora: '11:00' },
//   { hora: '12:00' },
//   { hora: '13:00' },
//   { hora: '14:00' },
//   { hora: '15:00' },
//   { hora: '16:00' },
//   { hora: '17:00' },
//   { hora: '18:00' },
//   { hora: '19:00' },
//   { hora: '20:00' },
//   { hora: '21:00' },
//   { hora: '22:00' },
//   { hora: '23:00' },
//   { hora: '24:00' },
// ]

// const dias = [
//   { dia: 'Lunes' },
//   { dia: 'Martes' },
//   { dia: 'Miercoles' },
//   { dia: 'Jueves' },
//   { dia: 'Viernes' },
//   { dia: 'Sabado' },
//   { dia: 'Domingo' },
// ]

// const ProgramaTv = () => {
//   const { control } = useForm()
//   const [form] = Form.useForm()

//   return (
//     <Card>
//       <Form
//         onFinish={onFinish}
//         labelCol={{ span: 24 }}
//         wrapperCol={{ span: 24 }}
//       >
//         <Form.Item
//           name="day"
//           rules={[{ required: true, message: 'Selecciona una opción' }]}
//         >
//           <Select
//             showSearch={false}
//             style={{ width: 200 }}
//             placeholder="Selecciona un elemento"
//           >
//             {dias.map((element) => (
//               <Option value={element.dia} key={element.dia}>
//                 {element.dia}
//               </Option>
//             ))}
//           </Select>
//         </Form.Item>
//         <Form.List name="hours">
//           {(fields, { add, remove }) => (
//             <>
//               {fields.map(({ key, name, ...restField }) => (
//                 <div>
//                   <div className="flex items-center justify-center">
//                     <Form.Item
//                       label="Hora"
//                       className="w-1/3"
//                       {...restField}
//                       name={[name, 'hour']}
//                       rules={[
//                         { required: true, message: 'Selecciona una opción' },
//                       ]}
//                     >
//                       <Select
//                         showSearch={false}
//                         mode="multiple"
//                         style={{ width: 250 }}
//                         placeholder="Selecciona un elemento"
//                       >
//                         {horas.map((element) => (
//                           <Option value={element.hora} key={element.hora}>
//                             {element.hora}
//                           </Option>
//                         ))}
//                       </Select>
//                     </Form.Item>
//                     <Form.Item
//                       className="mx-3 w-1/3"
//                       label="Titulo"
//                       {...restField}
//                       name={[name, 'title']}
//                       rules={[
//                         {
//                           required: true,
//                           message: 'Por favor escriba el titulo',
//                         },
//                       ]}
//                     >
//                       <Input.TextArea
//                         autoSize
//                         placeholder="Escriba el titulo"
//                       />
//                     </Form.Item>
//                     <Form.Item
//                       label="Logo"
//                       className="mx-3 w-1/2"
//                       {...restField}
//                       name={[name, 'thumbnailUrl']}
//                       rules={[
//                         {
//                           required: true,
//                           message: 'Por favor ingrese la imagen',
//                         },
//                       ]}
//                     >
//                       <Uploader form={form} />
//                     </Form.Item>

//                     <div className="w-1/12">
//                       <MinusCircleOutlined onClick={() => remove(name)} />
//                     </div>
//                   </div>
//                 </div>
//               ))}
//               <Form.Item>
//                 <Button
//                   type="dashed"
//                   onClick={() => add()}
//                   block
//                   icon={<PlusOutlined />}
//                 >
//                   Add field
//                 </Button>
//               </Form.Item>
//             </>
//           )}
//         </Form.List>
//         <Form.Item>
//           <ButtonMy type="primary" htmlType="submit">
//             Guardar
//           </ButtonMy>
//         </Form.Item>
//       </Form>
//     </Card>
//   )
// }
// export default ProgramaTv

// import React, { useState } from 'react'
// import { Calendar, momentLocalizer } from 'react-big-calendar'
// import moment from 'moment'
// import 'react-big-calendar/lib/css/react-big-calendar.css'
// import 'moment/locale/es' // Importa la localización en español

// const localizer = momentLocalizer(moment)

// const EventCalendar = () => {
//   const [events, setEvents] = useState([
//     {
//       title: 'Evento 1',
//       start: new Date(2024, 0, 10, 10, 0),
//       end: new Date(2024, 0, 10, 12, 0),
//     },
//     {
//       title: 'Evento 2',
//       start: new Date(2024, 0, 15, 14, 0),
//       end: new Date(2024, 0, 15, 16, 0),
//     },
//   ])

//   const handleSelect = ({ start, end }) => {
//     const title = window.prompt('Nombre del evento:')
//     if (title) {
//       const newEvent = {
//         title,
//         start,
//         end,
//       }
//       setEvents([...events, newEvent])
//     }
//   }

//   return (
//     <div>
//       <h2>Calendario de Eventos</h2>
//       <Calendar
//         localizer={localizer}
//         events={events}
//         startAccessor="start"
//         endAccessor="end"
//         style={{ height: 500 }}
//         selectable
//         onSelectSlot={handleSelect}
//         messages={{
//           today: 'Hoy',
//           previous: 'Anterior',
//           next: 'Siguiente',
//           month: 'Mes',
//           week: 'Semana',
//           day: 'Día',
//           showMore: (total) => `+ Ver más (${total})`,
//         }}
//       />
//     </div>
//   )
// }

// export default EventCalendar

// import React, { useState } from 'react'
// import { Calendar, momentLocalizer } from 'react-big-calendar'
// import moment from 'moment'
// import { Modal, Button } from 'antd'
// import 'antd/dist/antd.css'
// import 'moment/locale/es' // Importa el idioma español para Moment.js

import React, { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'moment/locale/es' // Importa la localización en español
import Button from '../ui/button'
import { DatePicker, Form, Input, Modal, Select } from 'antd'
import { useForm } from 'react-hook-form'
import { Toast } from 'react-toastify/dist/components'
import { toast } from 'react-toastify'
import Uploader from '../common/uploaderAntd'

moment.locale('es') // Configura Moment.js para usar el idioma español

const localizer = momentLocalizer(moment)

const MyCalendar = () => {
  const [events, setEvents] = useState([])

  const [selectedDate, setSelectedDate] = useState(null)

  const { control } = useForm()
  const [form] = Form.useForm()

  const [showModal, setShowModal] = useState(false)
  const openModal = (index) => {
    const eventToEdit = events[index]
    if (eventToEdit) {
      form.setFieldsValue({
        title: eventToEdit.title,
        duration: eventToEdit.duration,
        dateRange: moment(eventToEdit.start),
      })
      setShowModal(true)
    }
    setShowModal(true)
  }
  const closeModal = () => {
    setShowModal(false)
    form.resetFields() // Resetea los campos del formulario al cerrar el modal
  }

  const handleAddEvent = (values: any) => {
    const { dateRange, duration, title } = values

    // Parsea la fecha utilizando Moment.js
    const startDate = new Date(
      dateRange.$y,
      dateRange.$M,
      dateRange.$D,
      dateRange.$H,
      0
    )

    // Calcula la fecha de finalización agregando la duración en horas
    const endDate = moment(startDate)
      .add(Number(duration), 'hours')
      .format('YYYY-MM-DD HH:mm')

    // Verifica si hay eventos en el mismo rango de fechas y horas
    const isOverlapping = events.some((event) => {
      return (
        (startDate >= event.start && startDate <= event.end) ||
        (endDate >= event.start && endDate <= event.end) ||
        (startDate <= event.start && endDate >= event.end)
      )
    })

    if (isOverlapping) {
      // Muestra un mensaje de error o toma la acción correspondiente
      toast.warning('Ese día ya tiene un evento con esas horas.')
    } else {
      // Agrega el nuevo evento solo si no hay superposiciones
      const newEvent = {
        start: startDate,
        end: endDate,
        duration: duration,
        title: title,
      }

      setEvents([...events, newEvent])
      closeModal()
    }
  }

  return (
    <div>
      <div className="my-3 flex justify-end">
        <Button type="primary" onClick={openModal}>
          Agregar Evento
        </Button>
      </div>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable
        onSelectEvent={(event, e) => openModal(events.indexOf(event), e)}
        messages={{
          today: 'Hoy',
          previous: 'Anterior',
          next: 'Siguiente',
          month: 'Mes',
          week: 'Semana',
          day: 'Día',
          showMore: (total) => `+ Ver más (${total})`,
        }}
      />

      <Modal
        width={'45%'}
        title="Agregar Evento"
        visible={showModal}
        onOk={() => form.submit()}
        onCancel={closeModal}
      >
        <Form form={form} onFinish={handleAddEvent}>
          <Form.Item
            name="title"
            label="Título"
            rules={[
              { required: true, message: 'Por favor, ingresa un título' },
            ]}
          >
            <Input.TextArea autoSize placeholder="Escribe un titulo" />
          </Form.Item>

          <Form.Item
            name="duration"
            label="Duracion del programa"
            rules={[
              { required: true, message: 'Por favor, ingresa la duración' },
            ]}
          >
            <Select
              showSearch={false}
              style={{ width: '100%' }}
              placeholder="Selecciona un elemento"
            >
              <Option value="1" key="1">
                1 Hora
              </Option>
              <Option value="2" key="2">
                2 Horas
              </Option>
              <Option value="3" key="3">
                3 Horas
              </Option>
              <Option value="4" key="4">
                4 Horas
              </Option>
              <Option value="5" key="5">
                5 Horas
              </Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="dateRange"
            label="Fecha y Hora"
            rules={[
              {
                required: true,
                message: 'Por favor, selecciona una fecha y hora',
              },
            ]}
          >
            <DatePicker
              showTime={{
                format: 'HH:mm',
                use12Hours: false,
                minuteStep: 60, // Esto establece la escala de minutos en 60, deshabilitando la selección de minutos.
              }}
              format="DD/MM/YYYY HH:mm" // Ajustado al formato de Moment.js
              style={{ width: '100%' }}
              placeholder="Seleccione una fecha"
            />
          </Form.Item>

          <Form.Item
            name="image"
            label="Título"
            rules={[
              { required: false, message: 'Por favor, ingresa una imagén' },
            ]}
          >
            <Uploader form={form} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default MyCalendar
