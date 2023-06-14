import { useSuggestion } from '@/data/suggestions'
import Image from 'next/image'
import Button from '../ui/button'
import { useModalAction, useModalState } from '../ui/modal/modal.context'

const SuggestionView = () => {
  const { data } = useModalState()
  const { suggestion } = useSuggestion(data)
  const { closeModal } = useModalAction()

  console.log('======= Sugestion =======')
  console.log(suggestion)
  console.log('======= Sugestion =======')

  return (
    <div className="m-auto w-full max-w-lg rounded bg-light sm:w-[32rem]">
      <div className="flex items-center border-b border-border-200 p-7">
        {/* Avatar */}
        <div className="flex-shrink-0 rounded border border-border-100">
          <Image
            src={'./avatar-placeholder.svg'}
            alt="Avatar"
            width={60}
            height={60}
            className="overflow-hidden rounded object-fill"
          />
        </div>

        <div className="ms-7">
          <h3 className="mb-2 text-sm font-semibold text-heading md:text-base">
            {suggestion?.user?.firstName} {suggestion?.user?.lastName}
          </h3>
          {/* Email user and created at */}
          <div className="text-sm text-body text-opacity-80 mb-2">
            {suggestion?.user?.email}
            {/* {new Date(suggestion?.createdAt).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })} */}
          </div>
          {/* Created At */}
          <div className="text-sm text-body text-opacity-80">
            Creada:{' '}
            <span className="font-semibold text-accent">
              {new Date(suggestion?.createdAt).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
        </div>
      </div>
      <div className="px-7 pt-6 pb-7">
        {/* Border on suggestion content */}
        <div className="border border-border-200 rounded p-5">
          <h3 className="mb-2 text-sm font-semibold text-heading md:text-base">
            Sugerencia
          </h3>
          <div className="text-sm text-body text-opacity-80">
            {suggestion?.content}
          </div>
        </div>
      </div>

      {/* Button to close modal */}
      <div className="flex justify-end px-7 py-5">
        <Button
          className="text-sm font-semibold text-accent hover:text-accent-hover"
          onClick={closeModal}
          variant="outline"
        >
          Cerrar
        </Button>
      </div>
    </div>
  )
}

export default SuggestionView
