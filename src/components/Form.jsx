import React, { useState, useEffect, useRef } from 'react'
import emailjs from '@emailjs/browser';

import './Form.css'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import PlainTextField from './PlainTextField'
import EmailTextField from './EmailTextField'
import ImageUploader from './ImageUploader'
import LoadingScreen from './LoadingScreen'
import NotificationModal from './NotificationModal';
import isEmail from 'validator/lib/isEmail'

const Form = () => {

    // Default state of form
    const emptyForm = {
        firstName: '',
        lastName: '',
        description: '',
        email: '',
        uploadedImages:[],
    }
    // fields is the object containing all relevant fields 
    const [fields,setFields] = useState(emptyForm)

    const successModal = {
        header: 'Email Sent',
        body: '🎉 Email is successfully sent, please check your inbox for the form details'
    }

    // To set whether submit button is disabled 
    // Condition: firstName, lastName, description and email must be filled AND email must be validated
    const [disabled,setDisabled] = useState(true)

    const [submitting,setSubmitting] = useState(false)
    const [submitted,setSubmitted] = useState(false)

    // useEffect to check on change of fields object whether condition is fulfilled and rerender accordingly
    useEffect(()=> {
        if(fields.firstName != '' && fields.lastName != '' && fields.description != '' && fields.email != '' && isEmail(fields.email)){
            setDisabled(false)
        }
        else setDisabled(true)
    },[fields])

    // Event handler to be passed as props to update fields object values
    const onChange = (name,value) => {
        setFields(currValue => ({
            ...currValue,
            [name]:value
        }))
    }

    const loadingTime = 2000;

    // Gain access to child component instance(ImageUploader) to use ImageUploader function clearState()
    const imagesRef = useRef()

    const closeModal = (e) => {
        setSubmitted(false);
        setFields(emptyForm);
        imagesRef.current.clearState();
    }

    // console.log(fields);
    
    const form = useRef();
    const sendEmail = (e) => {
        e.preventDefault();
        setSubmitting(true);
        emailjs.
        sendForm(
            import.meta.env.VITE_SERVICE_ID, 
            import.meta.env.VITE_TEMPLATE_ID, 
            form.current, 
            import.meta.env.VITE_API_KEY)
          .then((result) => {
            setSubmitting(true);
            console.log(result.text);
            return new Promise(() => {
                setTimeout(() => {
                    setSubmitting(false)
                    setSubmitted(true)
                },loadingTime)
            });            
          }, (error) => {
              console.log(error.text);
          });
      };


    return (
        <Card className="card">
            <form encType="multipart/form-data" ref={form} onSubmit={sendEmail}>
                <div className="name">
                    <PlainTextField 
                        name="firstName" 
                        label="First Name" 
                        placeholder="First Name" 
                        fullWidth
                        value={fields.firstName}
                        onChange={onChange}/>
                        <PlainTextField 
                        name="lastName" 
                        label="Last Name" 
                        value={fields.lastName}
                        placeholder="Last Name" 
                        fullWidth
                        onChange={onChange}
                    />
                </div>
                <div className="description">
                    <PlainTextField 
                        name="description" 
                        label="Description" 
                        placeholder="Message Body" 
                        multiline 
                        fullWidth 
                        value={fields.description}
                        minRows="4"
                        maxRows="10" 
                        onChange={onChange}
                    />
                </div>
                <div className="email">
                    <EmailTextField 
                        value={fields.email}
                        fullWidth 
                        onChange={onChange}
                    />
                </div>
                <div className="uploaded-images">
                    <ImageUploader 
                        ref={imagesRef}
                        onChange={onChange}
                        name="uploadedImages"
                    />
                </div>
                <Button 
                    className="submit" 
                    variant="contained"
                    disabled={disabled}
                    type="submit"
                    value="submit"
                >
                    SEND
                </Button>
                {submitting && (
                    <LoadingScreen loadingTime={loadingTime}/>
                )}
                {submitted && (
                    <NotificationModal header={successModal.header} body={successModal.body} closeModal={closeModal}/>
                )}
            </form>
        </Card>
    )
}

export default Form