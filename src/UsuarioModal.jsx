import { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function UsuarioModal({ modo, usuario, onClose, setUsuarios, usuarios }) {
  const [formData, setFormData] = useState({
    title: '',
    firstName: '',
    lastName: '',
    picture: ''
  });

  useEffect(() => {
    if (usuario && modo !== 'Crear') {
      setFormData({
        title: usuario.title,
        firstName: usuario.firstName,
        lastName: usuario.lastName,
        picture: usuario.picture
      });
    } else {
      setFormData({
        title: '',
        firstName: '',
        lastName: '',
        picture: ''
      });
    }
  }, [usuario, modo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const API_BASE_URL = 'https://dummyapi.io/data/v1';
    const APP_ID = '6112dc7c3f812e0d9b6679dd';

    try {
      let response;
      if (modo === 'Crear') {
        response = await fetch(`${API_BASE_URL}/user/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'app-id': APP_ID
          },
          body: JSON.stringify(formData)
        });

        const nuevoUsuario = await response.json();
        setUsuarios([nuevoUsuario, ...usuarios]);
        alert('Usuario creado exitosamente');
      } else if (modo === 'Editar') {
        response = await fetch(`${API_BASE_URL}/user/${usuario.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'app-id': APP_ID
          },
          body: JSON.stringify(formData)
        });

        const usuarioActualizado = await response.json();
        const actualizados = usuarios.map((u) =>
          u.id === usuario.id ? usuarioActualizado : u
        );
        setUsuarios(actualizados);
        alert('Usuario actualizado correctamente');
      }

      onClose();
    } catch (error) {
      alert('Error en la operación');
      console.error(error);
    }
  };

  const esSoloLectura = modo === 'visualizar';

  return (
    <Modal show onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {modo === 'Crear' ? 'Crear Usuario' : modo === 'Editar' ? 'Editar Usuario' : 'Visualizar Usuario'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {usuario && modo !== 'Crear' && (
            <Form.Group>
              <Form.Label>ID</Form.Label>
              <Form.Control value={usuario.id} readOnly />
            </Form.Group>
          )}

          <Form.Group>
            <Form.Label>Título</Form.Label>
            <Form.Control
              name="title"
              value={formData.title}
              onChange={handleChange}
              readOnly={esSoloLectura}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              readOnly={esSoloLectura}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              readOnly={esSoloLectura}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Foto (URL)</Form.Label>
            <Form.Control
              name="picture"
              value={formData.picture}
              onChange={handleChange}
              readOnly={esSoloLectura}
            />
          </Form.Group>

          {modo !== 'visualizar' && (
            <Button variant="primary" type="submit" className="mt-3">
              {modo === 'Crear' ? 'Crear' : 'Guardar cambios'}
            </Button>
          )}
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default UsuarioModal;