const StatusColor = (banned: boolean) => {
  let bg_class = ''

  if (banned) {
    bg_class = 'bg-[#9CA3AF]'
  } else {
    bg_class = 'bg-[#10B981]'
  }

  return bg_class
}

export default StatusColor
