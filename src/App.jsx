import { useState } from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap'
import Banner from './Banner'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Banner/>

      <Container>
        <Row xs="auto">
          <Col>
            <Button variant="primary"> crear</Button>
          </Col>
          <Col>
            <Button variant="warning"> Editar</Button>
          </Col>
          <Col>
            <Button variant="danger"> Eliminar</Button>
          </Col>
        </Row>

      </Container>


    </>
  )
}

export default App
