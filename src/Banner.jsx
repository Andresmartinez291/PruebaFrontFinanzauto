import { useState } from 'react'
import { Button, Container, Row, Col, Form } from 'react-bootstrap'
import { FaRegUserCircle } from "react-icons/fa"
import './App.css'

function Banner() {

    return (
        <div className="banner">
            <Container fluid>
                <Row className="align-items-center" >
                    <Col md={10} className= "text-start"> <h5 className='fuenteBanner'>Módulo de Consulta y Registro de Usuarios al Sistema</h5></Col>
                    <Col md={2} className="text-end"> <FaRegUserCircle className= "iconoBanner" /> </Col>

                </Row>
            </Container>


        </div>
    )
}

export default Banner
