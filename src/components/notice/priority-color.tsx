const PriorityColor = (status: string) => {
  let statusColor = ''
  if (status === 'HIGHT') {
    statusColor = 'bg-[#ed2524]'
  } else if (status?.toLowerCase() === 'MEDIUM') {
    statusColor = 'bg-[#FFAA2C]'
  } else {
    statusColor = 'bg-[#FFD361]'
  }

  return statusColor
}

export default PriorityColor
