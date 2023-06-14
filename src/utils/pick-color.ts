export function getTailwindBgColor(hexColor: string): string {
  // Eliminar el carácter "#" del color hexadecimal
  // Verificar si el color tiene 3 o 6 caracteres y expandirlo a 6 caracteres si es necesario
  const expandedColor =
    hexColor.length === 3 ? hexColor.replace(/(.)/g, '$1$1') : hexColor

  // Devolver el color válido para la clase "bg-"
  return `bg-[${expandedColor}]`
}
