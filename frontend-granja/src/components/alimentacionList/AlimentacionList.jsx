import { useEffect, useState } from "react";
import { Container, Table, Button, Spinner } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { getAlimentaciones } from "../../services/alimentacionService";

const AlimentacionList = () => {
    const [alimentaciones, setAlimentaciones] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAlimentaciones();
                setAlimentaciones(data);
            } catch (error) {
                console.error("Error al cargar alimentaciones:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

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
                className="bg-white shadow rounded p-4"
                style={{ width: "100%", maxWidth: "900px" }}
            >
                <h2 className="mb-4 fw-bold">Lista de Alimentaciones</h2>
                <Table hover responsive className="align-middle">
                    <thead className="table-light">
                        <tr>
                            <th>Descripción</th>
                            <th>Dosis</th>
                            <th className="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alimentaciones.map((item) => (
                            <tr key={item.id}>
                                <td>{item.descripcion}</td>
                                <td>{item.dosis}</td>
                                <td className="text-center">
                                    <Button
                                        variant="outline-primary"
                                        size="sm"
                                        className="me-2"
                                        onClick={() => alert(`Editar alimentación ${item.id}`)}
                                    >
                                        <FaEdit />
                                    </Button>
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={() => alert(`Eliminar alimentación ${item.id}`)}
                                    >
                                        <FaTrash />
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
