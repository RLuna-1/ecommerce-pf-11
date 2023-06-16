import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "../css/InfoCliente.module.css";
import PerfilDefault from "../img/PerfilDefault.png";
import loader from "../css/Loader.module.css";
import Editar from "../img/Editar.png";

const InfoCliente = () => {
  const [userData, setUserData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  const id = userData?.id;

  const cookiesUsers = async () => {
    try {
      const response = await axios.get("/auth/user", {
        withCredentials: true,
      });
      setUserData(response.data.user);
      setName(response.data.user.name);
      setLastName(response.data.user.last_name);
      setPhoneNumber(response.data.user.phone);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    cookiesUsers();
  }, []);

  const enableEditing = () => {
    setEditing(true);
  };

  const disableEditing = () => {
    setEditing(false);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };

  const saveChanges = async () => {
    try {
      await axios.put(`/users/${id}`, {
        name,
        last_name: lastName,
        phone: phoneNumber,
        email: userData.email,
      });
      disableEditing();
      setUserData({ ...userData, name, lastName, phone: phoneNumber });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className={styles.Info}>
        <div className={styles.Perfil}>
          {userData ? (
            <img
              src={userData.profilePicture ? userData.profilePicture : PerfilDefault}
              alt="Usuario"
            />
          ) : (
            <img src={PerfilDefault} alt="Usuario" />
          )}
          <h1>{`${name} ${lastName}`}</h1>
        </div>
        {userData ? (
          <div className={styles.Datos}>
            <div className={styles.Editar}><button onClick={enableEditing}><img src={Editar} alt="Editar"  /></button> <p>Editar</p> </div>
            {editing ? (
              <div>
                <input type="text" value={name} onChange={handleNameChange} />
                <input
                  type="text"
                  value={lastName}
                  onChange={handleLastNameChange}
                />
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                />
                <h1>Correo: {userData.email}</h1>
              </div>
            ) : (
              <div>
                <h2>Nombre: </h2><h1>{userData.name}</h1>
                <h2>Apellido: </h2><h1>{userData.last_name}</h1>
                <h2>Teléfono: </h2><h1>{userData.phone}</h1>
                <h2>Correo: </h2><h1>{userData.email}</h1>
              </div>
            )}
            <div className={styles.Botones}>
              <Link to="/compracliente">
                <button>Mis Compras</button>
              </Link>
              {editing && (
                <>
                  <button onClick={saveChanges}>Guardar</button>
                  <button onClick={disableEditing}>Cancelar</button>
                </>
              )}
              <button>Cerrar Sesión</button>
            </div>
          </div>
        ) : (
          <div className={loader.loaderLarge}></div>
        )}
        {!userData && <div className={loader.loaderLarge}></div>}
      </div>
    </div>
  );
};

export default InfoCliente;


/* Reemplazar luego que mejoren el BACKEND

const saveChanges = async () => {
  try {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("last_name", lastName);
    formData.append("phone", phoneNumber);
    formData.append("email", userData.email);
    formData.append("image", profilePicture); // Agrega la imagen al formData

    await axios.put(`/users/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    disableEditing();
    setUserData({ ...userData, name, last_name: lastName, phone: phoneNumber });
  } catch (error) {
    console.error(error);
  }
};

*/