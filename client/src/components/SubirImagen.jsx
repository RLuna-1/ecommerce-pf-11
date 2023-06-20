import React, { useState } from 'react';
import axios from 'axios';
import styles from "../css/InfoCliente.module.css";

const SubirImagen = ({ handleSave, setProfilePicture }) => {
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
      const imageURL = response.data.secure_url;
      setImage(imageURL);
      setProfilePicture(imageURL); // Actualizar el estado de la imagen en InfoCliente
      console.log('URL de la imagen cargada:', imageURL);
      handleSave(imageURL); // Guardar la imagen en el backend
    } catch (error) {
      console.error('Error al subir la imagen:', error);
    }
  };

  return (
    <div className={styles.CargaImagen}>
      <input type="file" onChange={handleUpload} />
      {image && (
        <div className={styles.BotonesIMG}>
          <button onClick={() => handleSave(image)}>Guardar Imagen</button>
        </div>
      )}
    </div>
  );
};

export default SubirImagen;

