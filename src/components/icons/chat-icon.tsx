/* eslint-disable @typescript-eslint/ban-types */

export const ChatIcon: React.FC<React.SVGAttributes<{}>> = ({
  width,
  height,
}) => {
  return (
    <svg
      width={width || '24'}
      height={height || '24'}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z"
        fill="currentColor"
      />
      <path
        d="M11 7C11 6.45 11.45 6 12 6C12.55 6 13 6.45 13 7V11C13 11.55 12.55 12 12 12C11.45 12 11 11.55 11 11V7Z"
        fill="currentColor"
      />
      <path
        d="M16 7C16 6.45 16.45 6 17 6C17.55 6 18 6.45 18 7V11C18 11.55 17.55 12 17 12C16.45 12 16 11.55 16 11V7Z"
        fill="currentColor"
      />
      <path
        d="M7 7C7 6.45 7.45 6 8 6C8.55 6 9 6.45 9 7V11C9 11.55 8.55 12 8 12C7.45 12 7 11.55 7 11V7Z"
        fill="currentColor"
      />
    </svg>
  )
}
