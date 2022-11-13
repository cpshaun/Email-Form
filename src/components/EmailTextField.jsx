import React, { useState } from 'react'
import { TextField } from '@mui/material'
import isEmail from 'validator/lib/isEmail'

const EmailTextField = (props) => {
    const [isValid,setIsValid] = useState(false)
    const [dirty, setIsDirty] = useState(false)

    function handleChange(e) {
        props.onChange(e.target.name, e.target.value);
        setIsDirty(true)
        const val = e.target.value
        if(isEmail(val)){
            setIsValid(true);
            console.log('Valid Email')
        } else {
            setIsValid(false);
            console.log('Invalid Email')
        }
      }
    
    

    return (
        <TextField 
            name="email" 
            label="Email Address" 
            value={props.value}
            placeholder="Email Address" 
            variant="outlined" 
            fullWidth = {props.fullWidth} 
            error = {dirty && !isValid}
            helperText={dirty && !isValid ? 'Please enter a valid email' : ' '}
            onChange = {handleChange}
        />
    )
}

export default EmailTextField


