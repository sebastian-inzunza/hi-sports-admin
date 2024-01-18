//@ts-nocheck
import React, { useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment-timezone'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'moment/locale/es' // Importa la localización en español
import Button from '../ui/button'
import { DatePicker, Form, Input, Modal, Select } from 'antd'
import { useForm } from 'react-hook-form'
import { Toast } from 'react-toastify/dist/components'
import { toast } from 'react-toastify'
import Uploader from '../common/uploaderAntd'
import {
  useCreateProgrammingMutation,
  useUpdateProgrammingMutation,
  useProgrammingdQuery,
  useProgrammingDeleteMutation,
} from '@/data/programming'
moment.locale('es') // Configura Moment.js para usar el idioma español

const localizer = momentLocalizer(moment)

const MyCalendar = () => {
  const [events, setEvents] = useState([])
  const [selectedHour, setSelectedHour] = useState('00:00')

  const { mutate: createPrograming, isLoading: creating } =
    useCreateProgrammingMutation()
  const { mutate: updatePrograming, isLoading: updating } =
    useUpdateProgrammingMutation()
  const [searchTerm, setSearchTerm] = useState('')

  const { mutate: deleteProgramming, isLoading: deleteLoading } =
    useProgrammingDeleteMutation()

  const [page, setPage] = useState(1)
  const { programing, error, loading, paginatorInfo } = useProgrammingdQuery({
    limit: 1000,
    page,
    search: searchTerm,
  })

  const [imag, setImg] = useState('')
  const [idEventdele, setIdEventdele] = useState(0)

  useEffect(() => {
    if (programing) {
      const newEvents = programing.map((element) => {
        const startDate = moment(element.date[0])
        const endDate = moment(element.date[1])

        const duration = moment.duration(endDate.diff(startDate))
        //debido a la libreria de moment, cambia la zona horaria aunque le indiques la zona, la cambia y retraza por 6 horas.
        return {
          id: element.id,
          title: element.title,
          start: new Date(
            startDate._a[0],
            startDate._a[1],
            startDate._a[2],
            startDate._a[3]
          ),
          end: new Date(
            endDate._a[0],
            endDate._a[1],
            endDate._a[2],
            endDate._a[3]
          ),
          duration: String(duration.hours()),
          image: element.image,
        }
      })

      setEvents(newEvents)
    }
  }, [programing])

  const { control } = useForm()
  const [form] = Form.useForm()

  const [showModal, setShowModal] = useState(false)
  const openModal = (eventId) => {
    const eventToEdit = events.find((event) => event.id === eventId)

    if (eventToEdit) {
      const hourString = String(eventToEdit.start)

      form.setFieldsValue({
        title: eventToEdit.title,
        duration: eventToEdit.duration,
        dateRange: moment(eventToEdit.start),
        hour: hourString.split(' ')[4].split(':')[0] + ':00',
      })
      setImg(eventToEdit.image)
      setIdEventdele(eventToEdit.id)
      setSelectedHour(hourString.split(' ')[4].split(':')[0] + ':00')

      setShowModal(true)
    }
    setShowModal(true)
  }
  const closeModal = () => {
    setImg('')
    setIdEventdele(0)
    setShowModal(false)
    form.resetFields() // Resetea los campos del formulario al cerrar el modal
    setSelectedHour('00:00')
  }

  const handleAddEvent = (values: any) => {
    const { dateRange, duration, title, image, hour } = values

    dateRange.$H = parseInt(hour.split(':')[0])

    const formatoDeseado = 'YYYY-MM-DDTHH:00:00'
    const startDate = dateRange.format(formatoDeseado)

    // Calcula la fecha de finalización agregando la duración en horas
    const endDate = moment(startDate)
      .add(Number(duration), 'hours')
      .format('YYYY-MM-DDTHH:00:00')

    // Verifica si hay eventos en el mismo rango de fechas y horas, fue necesario formatearlo a la fecha que recibe con moment
    const isOverlapping = events.some((event) => {
      return (
        (startDate >= moment(event.start).format('YYYY-MM-DDTHH:mm:ss') &&
          startDate < moment(event.end).format('YYYY-MM-DDTHH:mm:ss')) ||
        (endDate > moment(event.start).format('YYYY-MM-DDTHH:mm:ss') &&
          endDate <= moment(event.end).format('YYYY-MM-DDTHH:mm:ss')) ||
        (startDate <= moment(event.start).format('YYYY-MM-DDTHH:mm:ss') &&
          endDate >= moment(event.end).format('YYYY-MM-DDTHH:mm:ss'))
      )
    })

    if (isOverlapping) {
      // Muestra un mensaje de error o toma la acción correspondiente
      toast.warning(
        'Ese día ya tiene un evento con esas horas, eliminelo y  vuelvalo a agregar.'
      )
    } else {
      const newEvent = {
        date: [startDate, endDate],
        image: image,
        title: title,
      }
      createPrograming(newEvent)

      // setEvents([...events, newEvent])
      closeModal()
    }
  }

  const handleDelete = () => {
    const id = String(idEventdele)
    deleteProgramming({ id: id })
    closeModal()
  }
  const handleHourChange = (hour) => {
    setSelectedHour(hour)
  }
  const generateHoursOptions = () => {
    const hoursOptions = []
    for (let i = 0; i < 24; i++) {
      const formattedHour = moment({ hour: i }).format('HH:mm')
      hoursOptions.push(
        <Option key={formattedHour} value={formattedHour}>
          {formattedHour}
        </Option>
      )
    }
    return hoursOptions
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
        onSelectEvent={(event, e) => openModal(event.id, e)}
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
        title={imag ? 'Detalles de programación' : 'Agregar Evento'}
        visible={showModal}
        onOk={() => form.submit()}
        onCancel={closeModal}
        footer={(_, { CancelBtn }) => (
          <>
            <CancelBtn />

            {imag ? (
              <button
                onClick={() => handleDelete()}
                className="mx-3 rounded-md bg-red-500 px-4 py-1 text-white"
              >
                Eliminar
              </button>
            ) : (
              <button
                onClick={() => form.submit()}
                className="hove:bg-purple-700 mx-2 rounded-md bg-purple-800 px-3 py-1 text-white hover:bg-purple-700"
              >
                Crear
              </button>
            )}
          </>
        )}
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
          <div className="grid grid-cols-2">
            <Form.Item
              className="mr-3"
              name="dateRange"
              label="Fecha"
              rules={[
                {
                  required: true,
                  message: 'Por favor, selecciona una fecha',
                },
              ]}
            >
              {/* <DatePicker
              showTime={{
                format: 'HH:mm',
                use12Hours: false,
                minuteStep: 60, // Esto establece la escala de minutos en 60, deshabilitando la selección de minutos.
              }}
              format="DD/MM/YYYY HH:mm" // Ajustado al formato de Moment.js
              style={{ width: '100%' }}
              placeholder="Seleccione una fecha"
            /> */}
              <DatePicker
                showToday={false}
                placeholder="Seleccione una fecha"
                style={{ width: '100%' }}
                format="DD/MM/YYYY" // Ajustado al formato de Moment.js
              />
            </Form.Item>

            <Form.Item
              name="hour"
              label="Hora"
              rules={[
                {
                  required: true,
                  message: 'Por favor, selecciona una hora',
                },
              ]}
            >
              <Select
                style={{ width: '100%' }}
                placeholder="Seleccione una hora"
                onChange={handleHourChange}
                value={selectedHour}
              >
                {generateHoursOptions()}
              </Select>
            </Form.Item>
          </div>

          {imag ? (
            <div className="flex items-center justify-center">
              <img
                src={imag}
                alt="Imagen programación"
                width={300}
                height={100}
              />
            </div>
          ) : (
            <Form.Item
              name="image"
              label="Imagen"
              rules={[
                { required: true, message: 'Por favor, ingresa una imagén' },
              ]}
            >
              <Uploader form={form} />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  )
}

export default MyCalendar
