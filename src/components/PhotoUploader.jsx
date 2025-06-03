import React, { useRef, useState, useEffect } from 'react'
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, Slider } from '@mui/material'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import Cropper from 'react-easy-crop'
import getCroppedImg from './cropImage'

export default function PhotoUploader({ value, onChange, label = "Changer la photo", size = 90 }) {
  const inputFileRef = useRef()
  const [previewUrl, setPreviewUrl] = useState(null)
  const [cropModalOpen, setCropModalOpen] = useState(false)
  const [fileToCrop, setFileToCrop] = useState(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  // Affiche la preview quand value change
  useEffect(() => {
    if (value && typeof value !== 'string') {
      const objectUrl = URL.createObjectURL(value)
      setPreviewUrl(objectUrl)
      return () => URL.revokeObjectURL(objectUrl)
    } else if (typeof value === 'string') {
      setPreviewUrl(value)
    } else {
      setPreviewUrl(null)
    }
  }, [value])

  // Ouvre le modal crop quand un fichier est choisi
  const handleChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFileToCrop(file)
      setCropModalOpen(true)
    }
  }

  // Après crop → génère le fichier final
  const handleCropDone = async () => {
    const imageSrc = URL.createObjectURL(fileToCrop)
    const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels)
    onChange(croppedBlob)
    setCropModalOpen(false)
    setFileToCrop(null)
    URL.revokeObjectURL(imageSrc)
  }

  return (
    <div style={{ textAlign: 'center', marginBottom: 18 }}>
      <input
        type="file"
        ref={inputFileRef}
        style={{ display: 'none' }}
        accept="image/*"
        onChange={handleChange}
      />
      <Avatar
        src={previewUrl || undefined}
        alt="photo"
        sx={{
          width: size,
          height: size,
          margin: 'auto',
          boxShadow: 2,
          mb: 1,
          cursor: 'pointer',
          border: '2px solid #e3e8f3'
        }}
        onClick={() => inputFileRef.current.click()}
      >
        <PhotoCameraIcon fontSize="large" />
      </Avatar>
      <Button
        size="small"
        variant="outlined"
        onClick={() => inputFileRef.current.click()}
        sx={{ mt: 0.5, fontSize: 13 }}
      >
        {label}
      </Button>

      {/* Modal crop */}
      <Dialog
        open={cropModalOpen}
        onClose={() => setCropModalOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Recadrer la photo</DialogTitle>
        <DialogContent>
          {fileToCrop && (
            <div style={{ position: 'relative', width: '100%', height: 280, background: '#222' }}>
              <Cropper
                image={fileToCrop && URL.createObjectURL(fileToCrop)}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onCropComplete={(_, areaPixels) => setCroppedAreaPixels(areaPixels)}
                onZoomChange={setZoom}
                cropShape="round"
                showGrid={false}
              />
            </div>
          )}
          <Slider
            min={1}
            max={3}
            step={0.01}
            value={zoom}
            onChange={(_, val) => setZoom(val)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCropModalOpen(false)} color="secondary">Annuler</Button>
          <Button onClick={handleCropDone} variant="contained" color="primary">Valider</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
