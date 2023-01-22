// User contact modal view with Tailwind CSS classes, put input to send message to user

// src/components/user/user-contact-view.tsx

// import { CloseFillIcon } from '@/components/icons/close-fill'
import { CloseFillIcon } from '../icons/close-fill'
import Button from '../ui/button'
import TextArea from '../ui/text-area'

const UserContactView = () => {
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
            <h2 className="text-heading text-lg font-semibold">Contacto</h2>
            <button className="text-body-dark focus:outline-none">
              <CloseFillIcon width={20} />
            </button>
          </div>
          {/* Create a div to view las 4 messages */}
          <div className="flex flex-col space-y-4">
            {/* Must be a bubble message like whatsapp */}
            <div className="flex flex-col space-y-2">
              <p className="text-body text-sm">Hola, ¿cómo puedo ayudarte?</p>
            </div>
          </div>
          <TextArea
            label=""
            placeholder="Type your message here"
            name="message"
            rows={2}
          />
          <Button>Send</Button>
        </div>
      </form>
    </div>
  )
}

export default UserContactView
