/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import Image from 'next/image'
// import { useState } from 'react'
// import { useForm } from 'react-hook-form'
// import isEmpty from 'lodash/isEmpty'

// import { MessageAvatarPlaceholderIcon } from '@/components/icons/message-avatar-placeholder-icon'
import Button from '@/components/ui/button'
// import ErrorMessage from '@/components/ui/error-message'
import Select from '@/components/ui/select/select'
// import { adminOnly, getAuthCredentials, hasAccess } from '@/utils/auth-utils'

// type FormatOptionLabelProps = {
//   name: string
//   logo: {
//     thumbnail: string
//   }
// }

// const formatOptionLabel = ({ logo, name }: FormatOptionLabelProps) => (
//   <div className="flex items-center">
//     <div className="relative mr-3 h-6 w-6 shrink-0 overflow-hidden rounded-full">
//       {!isEmpty(logo?.thumbnail) ? (
//         <Image
//           src={logo?.thumbnail}
//           alt={name}
//           className="product-image object-contain"
//           fill
//           sizes="(max-width: 768px) 100vw"
//         />
//       ) : (
//         <MessageAvatarPlaceholderIcon
//           className="text-[1.5rem]"
//           color="#DDDDDD"
//         />
//       )}
//     </div>
//     <div className="truncate">{name}</div>
//   </div>
// )

const ComposeMessageModal = () => {
  //   const [shop, setShop] = useState(null)
  //   const [active, setIsActive] = useState<boolean>(Boolean(0))
  //   const { permissions } = getAuthCredentials()
  //   const permission = hasAccess(adminOnly, permissions)

  //   const options = {
  //     limit: 1000,
  //     page: 1,
  //     orderBy: 'created_at',
  //   }
  //   const { handleSubmit } = useForm()

  //   if (errorState) return <ErrorMessage message={error?.message} />

  const onTypeFilter = () => {}
  return (
    <div className="m-auto block max-w-lg rounded bg-light p-6 md:w-[32.5rem]">
      <h2 className="mb-6 text-base font-medium">
        Iniciar conversación con un usuario
      </h2>
      <form>
        <Select
          options={[]}
          isLoading={false}
          getOptionLabel={(option: any) => option.name}
          getOptionValue={(option: any) => option.slug}
          placeholder="Find Vendor"
          onChange={onTypeFilter as any}
          isClearable={true}
          //   formatOptionLabel={formatOptionLabel}
        />
        <div className="mt-6 text-right">
          <Button
            className="px-4 text-base "
            // loading={creating}
            // disabled={!!creating || !shop || !Boolean(active)}
          >
            Iniciar conversación
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ComposeMessageModal
