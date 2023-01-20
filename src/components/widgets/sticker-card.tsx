import React from 'react'
// import { IosArrowDown } from '@/components/icons/ios-arrow-down'
// import { IosArrowUp } from '@/components/icons/ios-arrow-up'

type Props = {
  title: string
  subtitle: string
  icon: React.ReactNode
  iconBgStyle: React.CSSProperties
  total: number
}
export default function StickerCard({
  title,
  subtitle,
  iconBgStyle,
  icon,
  total,
}: Props) {
  return (
    <div className="flex h-full w-full flex-col rounded bg-light p-7">
      <div className="mb-auto flex w-full justify-between pb-8">
        <div className="flex w-full flex-col">
          <span className="mb-1 text-base font-semibold text-heading">
            {title}
          </span>
          <span className="text-xs font-semibold text-body">{subtitle}</span>
        </div>

        <div
          className="ms-3 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-200"
          style={iconBgStyle}
        >
          {icon}
        </div>
      </div>
      <span className="mb-2 text-xl font-semibold text-heading">{total}</span>
    </div>
  )
}
