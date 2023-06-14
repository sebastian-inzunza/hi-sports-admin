import Link from 'next/link'
import { CloseFillIcon } from '../icons/close-fill'
import Button from '../ui/button'
import { useModalAction } from '../ui/modal/modal.context'
import TextArea from '../ui/text-area'

const UserContactView = () => {
  const { closeModal } = useModalAction()

  function handleSendMessage(e: React.FormEvent<HTMLFormElement>) {
    // Manage form data with preventDefault
    e.preventDefault()
    // Send message to user
  }
  return (
    <div className="flex h-full min-h-screen w-screen flex-col justify-center bg-light p-7 md:h-auto md:min-h-0 md:max-w-[590px] md:rounded-xl">
      <form
        method="POST"
        className="flex flex-col space-y-4"
        onSubmit={handleSendMessage}
      >
        <div className="space-y-4">
          {/* Create a div to view las 4 messages */}
          <div className="flex justify-between items-center">
            <h2 className="text-heading text-lg font-semibold">
              Contactar al usuario
            </h2>
            <button
              className="text-body-dark focus:outline-none"
              onClick={closeModal}
            >
              <CloseFillIcon width={20} />
            </button>
          </div>
          {/* Create a div to view las 4 messages */}
          <div className="flex flex-col space-y-4">
            {/* Must be a bubble message like whatsapp */}
            <div className="flex flex-col space-y-2">
              <p className="text-body text-sm">Envía un mensaje al usuario</p>
            </div>
          </div>
          <TextArea
            label=""
            placeholder="Escribe tu mensaje aquí..."
            name="message"
            rows={2}
          />
          {/* Put on the end of the component a link to go to the conversation */}
          <div className="flex justify-end">
            <Link href={'#'}>
              <p className="text-accent text-sm">Ver conversación</p>
            </Link>
          </div>
          <div className="flex justify-center space-x-4">
            <Button>Enviar</Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default UserContactView
