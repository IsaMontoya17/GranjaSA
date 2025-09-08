import { useEffect, useState } from "react";
import { Container, Table, Button, Spinner } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { getPorcinos, deletePorcino } from "../../services/porcinosService"; 
import Swal from "sweetalert2";

const PorcinosList = () => {
    const [porcinos, setPorcinos] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const data = await getPorcinos();
            setPorcinos(data);
        } catch (error) {
            console.error("Error al cargar porcinos:", error);
            Swal.fire("Error", "No se pudieron cargar los porcinos", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleEdit = (id) => {
        Swal.fire("Editar", `Editar porcino con ID: ${id}`, "info");
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
                await deletePorcino(id);
                await fetchData();
                Swal.fire("Eliminado", "El porcino ha sido eliminado.", "success");
            } catch (error) {
                console.error("Error al eliminar:", error);
                Swal.fire("Error", "No se pudo eliminar el porcino.", "error");
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
                <p className="mt-3">Cargando porcinos...</p>
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
                <h2 className="mb-4 fw-bold text-dark border-bottom pb-2">
                    Lista de Porcinos
                </h2>

                <Table hover responsive className="align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Identificación</th>
                            <th>Raza</th>
                            <th>Edad</th>
                            <th>Peso</th>
                            <th>Alimentación</th>
                            <th>Dosis</th>
                            <th className="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {porcinos.map((porcino) => (
                            <tr key={porcino.id}>
                                <td>{porcino.id}</td>
                                <td>{porcino.identificacion}</td>
                                <td>{porcino.raza}</td>
                                <td>{porcino.edad}</td>
                                <td>{porcino.peso}</td>
                                <td>{porcino.alimentacion?.descripcion}</td>
                                <td>{porcino.alimentacion?.dosis}</td>
                                <td className="text-center">
                                    <Button
                                        className="btn btn-primary btn-sm me-2"
                                        onClick={() => handleEdit(porcino.id)}
                                    >
                                        <FaEdit className="me-1" /> Editar
                                    </Button>
                                    <Button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(porcino.id)}
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

export default PorcinosList;
