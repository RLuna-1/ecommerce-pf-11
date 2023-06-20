import React, { useState } from 'react';
import axios from 'axios';
import { Image } from 'cloudinary-react';

const SubirImagen = ({ handleSave }) => {
  const [image, setImage] = useState('');

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'presetPerfil');

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dq9qehsik/image/upload',
        formData
      );
      setImage(response.data.secure_url);
      console.log('URL de la imagen cargada:', response.data.secure_url);
    } catch (error) {
      console.error('Error al subir la imagen:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleUpload} />
      {image && <Image cloudName="dq9qehsik" publicId={image} width="300" />}
      {image && <button onClick={() => handleSave(image)}>Guardar imagen</button>}
    </div>
  );
};

export default SubirImagen;

