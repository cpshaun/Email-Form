import React, { useState, useEffect, useImperativeHandle } from 'react'
import { Button } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

import './ImageUploader.css'
import { forwardRef } from 'react';

// Wrap component in forwardRef to gain access to ref object that is assigned using `ref` prop.
const ImageUploader = forwardRef((props,ref) => {
  const [selectedImages, setSelectedImages] = useState(props.uploadedImages);

  useEffect(() => {
    props.onChange(props.name, selectedImages);
  },[selectedImages])


  const handleUpload = e => {
    const selectedFiles = e.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

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
    var newArray = selectedImages.filter(file => {
      return file[0][1] != e.target.src;
    } )
    setSelectedImages(newArray)
  }

  return (
    <div className="image-uploader" name={props.name}>
      <div className="images">
        {selectedImages && (
          selectedImages.map((blob,id) => {
            return (
              <div className="image" key={id} onClick={handleDelete}>
                <img src={blob[0][1]} alt={blob[0][0]} />
                <DeleteForeverIcon className='cancel-icon'/>
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