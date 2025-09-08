import { useEffect, useState } from "react";
import { Container, Table, Button, Spinner, Row, Col } from "react-bootstrap";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { getClientes, deleteCliente } from "../../services/clientesService"; 
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ClientesList = () => {
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchData = async () => {
        setLoading(true);
        try {
            const data = await getClientes();
            setClientes(data);
        } catch (error) {
            console.error("Error al cargar clientes:", error);
            Swal.fire("Error", "No se pudieron cargar los clientes", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleEdit = (cedula) => {
        Swal.fire("Editar", `Editar cliente con cédula: ${cedula}`, "info");
    };

    const handleDelete = async (cedula) => {
        const confirmDelete = await Swal.fire({
            title: "¿Estás seguro?",
            text: "No podrás revertir esta acción.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        });

        if (confirmDelete.isConfirmed) {
            try {
                await deleteCliente(cedula); 
                await fetchData();
                Swal.fire("Eliminado", "El cliente ha sido eliminado.", "success");
            } catch (error) {
                console.error("Error al eliminar:", error);
                Swal.fire("Error", "No se pudo eliminar el cliente.", "error");
            }
        }
    };

    if (loading) {
        return (
            <Container
                fluid
                className="d-flex flex-column align-items-center justify-content-center text-center"
                style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}
            >
                <Spinner animation="border" variant="dark" />
                <p className="mt-3">Cargando clientes...</p>
            </Container>
        );
    }

    return (
        <Container
            fluid
            className="d-flex flex-column align-items-center justify-content-start py-4"
            style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}
        >
            <div
                className="bg-white shadow-lg rounded-3 p-4"
                style={{ width: "100%", maxWidth: "1100px" }}
            >
                <Row className="align-items-center mb-4">
                    <Col>
                        <h2 className="fw-bold text-dark border-bottom pb-2">
                            Lista de Clientes
                        </h2>
                    </Col>
                    <Col className="text-end">
                        <Button
                            variant="success"
                            onClick={() => navigate("/clientes/nuevo")}
                        >
                            <FaPlus className="me-1" /> Agregar Nuevo
                        </Button>
                    </Col>
                </Row>

                <Table hover responsive className="align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>Cédula</th>
                            <th>Nombres</th>
                            <th>Apellidos</th>
                            <th>Dirección</th>
                            <th>Teléfono</th>
                            <th className="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map((cliente) => (
                            <tr key={cliente.cedula}>
                                <td>{cliente.cedula}</td>
                                <td>{cliente.nombres}</td>
                                <td>{cliente.apellidos}</td>
                                <td>{cliente.direccion}</td>
                                <td>{cliente.telefono}</td>
                                <td className="text-center">
                                    <Button
                                        className="btn btn-primary btn-sm me-2"
                                        onClick={() => handleEdit(cliente.cedula)}
                                    >
                                        <FaEdit className="me-1" /> Editar
                                    </Button>
                                    <Button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(cliente.cedula)}
                                    >
                                        <FaTrash className="me-1" /> Eliminar
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </Container>
    );
};

export default ClientesList;
