import React, { useState, useEffect, useImperativeHandle } from 'react'
import { Button, IconButton } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

import './ImageUploader.css'
import { forwardRef } from 'react';

// Wrap component in forwardRef to gain access to ref object that is assigned using `ref` prop.
const ImageUploader = forwardRef((props,ref) => {
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    props.onChange(props.name, selectedImages);
  },[selectedImages])

  const handleUpload = e => {
    console.log('uploading');
    const selectedFiles = e.target.files;
    const selectedFilesArray = Array.from(selectedFiles);
    console.log(selectedFilesArray)

    const imagesArray = selectedFilesArray.map((file) => {
      return [file.name,URL.createObjectURL(file)];
    })
    setSelectedImages([...selectedImages,imagesArray]);
  }

  // Allow parent component to use clearState() method
  // useImperativeHandle customizes the instance value that is exposed to parent components when using ref. 
  // useImperativeHandle should be used with forwardRef:
  useImperativeHandle(ref, () => ({
    clearState(){
      setSelectedImages([]);
    }
  }))
  
  const handleDelete = (e) => {
    const img = e.currentTarget.parentNode.firstChild.src
    let newArray = selectedImages.filter(file => {
      return file[0][1] != img;
    } )
    setSelectedImages(newArray)
    console.log('deleting')
    console.log(newArray)
  }

  return (
    <div className="image-uploader" name={props.name}>
      <div className="images">
        {selectedImages && (
          selectedImages.map((blob,id) => {
            return (
              <div className="image" key={id}>
                <img src={blob[0][1]} alt={blob[0][0]} />
                <IconButton className='cancel-icon' aria-label="delete" onClick={handleDelete}>
                  <DeleteForeverIcon  /> 
                </IconButton>                
              </div>
            )
          }
        ))}
      </div>
      <Button className="image_upload-button" component="label" aria-label="upload picture" startIcon={<AddPhotoAlternateIcon />}>
        ADD IMAGE
        <input hidden accept="image/*" type="file" 
          onChange={handleUpload}
        />
      </Button>
    </div>
  )
})

export default ImageUploader