import React, { useState, useEffect } from 'react'
import ColorPicker from 'react-pick-color'

type PickColorProps = {
  color: string
  onChange: (color: string) => void
  showPicker: boolean
  setShowPicker: (showPicker: boolean) => void
}

const Rectangle: React.FC<PickColorProps> = ({ color, setShowPicker }) => {
  const [bgColor, setBgColor] = useState('')

  useEffect(() => {
    setBgColor(color)
  }, [color])

  const rectangleStyle = {
    height: '30px',
    width: '30px',
    cursor: 'pointer',
    borderRadius: '10px',
    backgroundColor: bgColor,
    marginRight: '10px',
    // Center the rectangle
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  }

  return <div style={rectangleStyle} onClick={() => setShowPicker(true)} />
}

const PickColorComponent: React.FC<PickColorProps> = ({
  color,
  onChange,
  showPicker,
  setShowPicker,
}) => {
  function setColor(color: string) {
    onChange(color)
  }

  return (
    <div className="mt-3 flex">
      <Rectangle
        color={color}
        setShowPicker={setShowPicker}
        onChange={onChange}
        showPicker={showPicker}
      />
      {showPicker && (
        <div className="absolute z-10">
          <ColorPicker
            color={color}
            onChange={(newColor) => {
              setColor(newColor.hex)
            }}
          />
        </div>
      )}
      <input
        className="mt-2 rounded-md border border-border-base p-2"
        type="text"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        disabled
      />
    </div>
  )
}

export default PickColorComponent
