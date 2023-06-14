interface Props {
  message?: string | undefined
}

export const Error = ({ message }: Props) => {
  return <p className="my-2 text-xs text-red-500 text-start">{message}</p>
}

const ErrorMessage = ({ message }: Props) => {
  return (
    <p className="mx-auto mt-16 min-w-min max-w-sm rounded bg-red-400 p-5 text-center text-sm font-semibold text-light">
      {message}
    </p>
  )
}

export default ErrorMessage
