import  { React,useEffect, useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap'
import Banner from './Banner'
import ListaUsuarios from './ListaUsuarios'
import { Component } from 'react'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import  UsuarioModal   from './UsuarioModal'     


function App() {

  const [usuarios,setUsuarios] = useState([])

  //función de consulta de usuarios a la API con el correspondiente app id
  const obtenerUsuarios = async () => {
    const API_BASE_URL = 'https://dummyapi.io/data/v1';
    const APP_ID = '6112dc7c3f812e0d9b6679dd';

    try {
      const response = await fetch(`${API_BASE_URL}/user?limit=*`, {
        headers: {
          'app-id': APP_ID
        }
      });

      const data = await response.json();
      return data.data;

    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      return [];
    }

  };


  useEffect(() => {
    const cargarUsuarios = async () => {
      const data = await obtenerUsuarios();
      setUsuarios(data);
      console.log("Usuarios obtenidos:", data); // prueba de funcionalidad de obtencion de datos
    };

    cargarUsuarios();
 
  }, []);


  return (
    <>
      <Banner />

      <ListaUsuarios usuarios={usuarios} setUsuarios={setUsuarios} />

    </>
  )
}

export default App;
