import React,{ useState } from 'react'
import { TextField } from '@mui/material'

const PlainTextField = (props) => {
  const [dirty, setIsDirty] = useState(false)
  const [isValid, setIsValid] = useState(false)

  // Function to update fields object in Form
  function handleChange(e) {
    props.onChange(e.target.name, e.target.value);
    setIsDirty(true)
    if (e.target.value == ''){
      setIsValid(false)
    }
    else setIsValid(true)
  }

  return (
    <div>
        <TextField 
        label={props.label}
        placeholder={props.placeholder}
        name={props.name}
        variant="outlined" 
        value={props.value}
        fullWidth={props.fullWidth} 
        multiline={props.multiline}
        minRows={props.minRows}
        maxRows={props.maxRows}
        error = {dirty && !isValid}
        helperText={dirty && !isValid ? 'This field cannot be left empty' : ' '}
        onChange= {handleChange}/> 
    </div>
  )
  
}

export default PlainTextField
