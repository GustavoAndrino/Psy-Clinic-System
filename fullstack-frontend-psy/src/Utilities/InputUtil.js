import React from 'react'

export const InputUtil = (paid) => {

    const [tf, setTf] = useState(paid)

    const handleChange = (event) => {
        setTf(event)
    } 
    
  return (
    <div>
        <input
    type="radio"
    name="option"
    value="true"
    checked={tf === "true"}
    onChange={handleChange}/>
    
  
  <input
    type="radio"
    name="option2"
    value="false"
    checked={selectedOption === "false"}
    onChange={handleChange}/>
    </div>
  )
}
