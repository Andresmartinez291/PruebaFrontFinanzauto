import { useState } from 'react'
import { Button, Container, Row, Col, Form } from 'react-bootstrap'
import { FaRegUserCircle } from "react-icons/fa"
import './App.css' 

function Banner() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Container>
        <Row>
            <Col md={8} className='fuenteBanner'>Módulo de Consulta y Registro de Usuarios al Sistema</Col>
            <Col md={2}></Col>
            <Col md={2}> <FaRegUserCircle /> </Col>

        </Row>
      </Container>


    </>
  )
}

export default Banner
