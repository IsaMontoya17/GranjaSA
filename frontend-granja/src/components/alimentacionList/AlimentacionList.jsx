import { useEffect, useState } from "react";
import { Container, Table, Button, Spinner, Row, Col } from "react-bootstrap";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { getAlimentaciones, deleteAlimentacion } from "../../services/alimentacionService";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AlimentacionList = () => {
    const [alimentaciones, setAlimentaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchData = async () => {
        setLoading(true);
        try {
            const data = await getAlimentaciones();
            setAlimentaciones(data);
        } catch (error) {
            console.error("Error al cargar alimentaciones:", error);
            Swal.fire("Error", "No se pudieron cargar las alimentaciones", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleEdit = (id) => {
        Swal.fire("Editar", `Editar alimentación con ID: ${id}`, "info");
    };

    const handleDelete = async (id) => {
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
                await deleteAlimentacion(id);
                await fetchData();
                Swal.fire("Eliminado", "La alimentación ha sido eliminada.", "success");
            } catch (error) {
                console.error("Error al eliminar:", error);
                Swal.fire("Error", "No se pudo eliminar la alimentación.", "error");
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
                <p className="mt-3">Cargando alimentaciones...</p>
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
                style={{ width: "100%", maxWidth: "950px" }}
            >
                <Row className="align-items-center mb-4">
                    <Col>
                        <h2 className="fw-bold text-dark border-bottom pb-2">
                            Lista de Alimentaciones
                        </h2>
                    </Col>
                    <Col className="text-end">
                        <Button
                            variant="success"
                            onClick={() => navigate("/alimentacion/nuevo")}
                        >
                            <FaPlus className="me-1" /> Agregar Nuevo
                        </Button>
                    </Col>
                </Row>

                <Table hover responsive className="align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>Descripción</th>
                            <th>Dosis</th>
                            <th className="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alimentaciones.map((item) => (
                            <tr key={item.id}>
                                <td className="fw-semibold">{item.descripcion}</td>
                                <td>{item.dosis}</td>
                                <td className="text-center">
                                    <Button
                                        className="btn btn-primary btn-sm me-2"
                                        onClick={() => handleEdit(item.id)}
                                    >
                                        <FaEdit className="me-1" /> Editar
                                    </Button>
                                    <Button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(item.id)}
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

export default AlimentacionList;
