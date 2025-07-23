import { Table, Button, Form, Row, Col, Image, Pagination } from 'react-bootstrap';
import { FaTrash, FaEdit, FaEye } from 'react-icons/fa';
import './App.css';

function ListaUsuarios() {
  // Datos quemados mientras se hace la conexion con la API
  const users = [
    {
      id: "60d0fe4f5311236168a109ca",
      name: "Sra. Sara Andersen",
      picture: "https://randomuser.me/api/portraits/women/10.jpg"
    },
    {
      id: "",
      name: "",
      picture: ""
    },
    {
      id: "",
      name: "",
      picture: ""
    }
  ];

  return (
    <div className="user-table-container">
      <Row className="mb-3">
        <Col md={10}>
          <Form.Control type="text" placeholder="Id a buscar" />
        </Col>
        <Col md={2}>
          <Button className="btn-create">Crear usuario</Button>
        </Col>
      </Row>

      <Table bordered hover responsive className="user-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombres y apellidos</th>
            <th>Foto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td><strong>{user.id}</strong></td>
              <td>{user.name}</td>
              <td>
                {user.picture && <Image src={user.picture} roundedCircle width={40} />}
              </td>
              <td>
                <FaTrash className="action-icon" />
                <FaEdit className="action-icon" />
                <FaEye className="action-icon" />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

    </div>
  );
}

export default ListaUsuarios;