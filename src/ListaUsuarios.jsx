import { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';
import './App.css';
import UsuarioModal from './UsuarioModal';

function ListaUsuarios({ usuarios, setUsuarios }) {
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    title: { value: null, matchMode: FilterMatchMode.CONTAINS },
    firstName: { value: null, matchMode: FilterMatchMode.CONTAINS },
    lastName: { value: null, matchMode: FilterMatchMode.CONTAINS }
  });

  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modo, setModo] = useState('');
  const [usuarioActual, setUsuarioActual] = useState(null);
  const [loading, setLoading] = useState(false);

  const abrirModal = (modo, usuario = null) => {
    setModo(modo);
    setUsuarioActual(usuario);
    setShowModal(true);
  };

  const eliminarUsuario = async (id) => {
    const API_BASE_URL = 'https://dummyapi.io/data/v1';
    const APP_ID = '6112dc7c3f812e0d9b6679dd';

    try {
      await fetch(`${API_BASE_URL}/user/${id}`, {
        method: 'DELETE',
        headers: { 'app-id': APP_ID }
      });

      const nuevaLista = usuarios.filter((u) => u.id !== id);
      setUsuarios(nuevaLista);
      alert('Usuario eliminado exitosamente');
    } catch (error) {
      alert('Error eliminando usuario');
      console.error(error);
    }
  };

  const accionesTemplate = (rowData) => (
    <div className="flex gap-2">
      <button className="p-button p-button-sm p-button-danger" title="Eliminar" onClick={() => eliminarUsuario(rowData.id)}>
        <i className="pi pi-trash"></i>
      </button>
      <button className="p-button p-button-sm p-button-warning" title="Editar" onClick={() => abrirModal("Editar", rowData)}>
        <i className="pi pi-pencil"></i>
      </button>
      <button className="p-button p-button-sm p-button-secondary" title="Ver" onClick={() => abrirModal("visualizar", rowData)}>
        <i className="pi pi-list"></i>
      </button>
    </div>
  );

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    setGlobalFilterValue(value);
    setFilters((prev) => ({ ...prev, global: { ...prev.global, value } }));
  };

  const header = (
    <div className="flex-end items-end gap-2 mb-4">
      <input
        type="text"
        placeholder="Buscar por ID, nombre o apellido"
        value={globalFilterValue}
        onChange={onGlobalFilterChange}
        className="p-inputtext p-component"
        style={{ width: '300px' }}
      />
      <button className="p-button" style={{ backgroundColor: '#00796b', color: 'white' }} onClick={() => abrirModal("Crear")}>
        Crear usuario
      </button>
    </div>
  );

  const fotoTemplate = (rowData) => (
    <img src={rowData.picture} alt="avatar" width={40} style={{ borderRadius: '50%' }} />
  );

  const nombreTemplate = (rowData) => `${rowData.title}. ${rowData.firstName} ${rowData.lastName}`;

  return (
    <div className="card">
      <DataTable
        value={usuarios}
        paginator
        rows={5}
        dataKey="id"
        filters={filters}
        filterDisplay="row"
        loading={loading}
        globalFilterFields={['id', 'title', 'firstName', 'lastName']}
        header={header}
        emptyMessage="No se encontraron usuarios"
        responsiveLayout="scroll"
      >
        <Column field="id" header="Id" filter filterPlaceholder="Buscar por ID" style={{ fontWeight: 'bold' }} />
        <Column header="Nombres y apellidos" field="firstName" filter filterPlaceholder="Buscar por nombre" body={nombreTemplate} />
        <Column header="Foto" body={fotoTemplate} />
        <Column header="Acciones" body={accionesTemplate} />
      </DataTable>

      {showModal && (
        <UsuarioModal
          modo={modo}
          usuario={usuarioActual}
          onClose={() => setShowModal(false)}
          setUsuarios={setUsuarios}
          usuarios={usuarios}
        />
      )}
    </div>
  );
}

export default ListaUsuarios;