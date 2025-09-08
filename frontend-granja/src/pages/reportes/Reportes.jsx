import { useEffect, useState } from "react";
import { Container, Table, Form, Button, Spinner, Row, Col } from "react-bootstrap";
import { getClientes } from "../../services/clientesService";
import Swal from "sweetalert2";

const Reportes = () => {
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filtroCliente, setFiltroCliente] = useState("");
    const [filtroRaza, setFiltroRaza] = useState("");
    const [filtroEdad, setFiltroEdad] = useState("");

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

    // Filtrar porcinos según filtros
    const filtrarPorcinos = (porcinos) => {
        return porcinos.filter((p) => {
            const matchRaza = filtroRaza ? p.raza.toLowerCase().includes(filtroRaza.toLowerCase()) : true;
            const matchEdad = filtroEdad ? p.edad === parseInt(filtroEdad) : true;
            return matchRaza && matchEdad;
        });
    };

    // Filtrar clientes
    const clientesFiltrados = clientes.filter((c) =>
        filtroCliente ? `${c.nombres} ${c.apellidos}`.toLowerCase().includes(filtroCliente.toLowerCase()) : true
    );

    const handleExport = () => {
        Swal.fire("Funcionalidad pendiente", "Aquí se puede implementar exportar Excel/PDF", "info");
    };

    if (loading) {
        return (
            <Container
                fluid
                className="d-flex flex-column align-items-center justify-content-center text-center"
                style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}
            >
                <Spinner animation="border" variant="dark" />
                <p className="mt-3">Cargando reportes...</p>
            </Container>
        );
    }

    return (
        <Container fluid className="py-4" style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
            <div className="bg-white shadow-lg rounded-3 p-4">
                <h2 className="mb-4 fw-bold text-dark border-bottom pb-2">Informe Cliente – Porcinos</h2>

                {/* Filtros */}
                <Form className="mb-4">
                    <Row className="g-3">
                        <Col md={4}>
                            <Form.Control
                                type="text"
                                placeholder="Filtrar por cliente"
                                value={filtroCliente}
                                onChange={(e) => setFiltroCliente(e.target.value)}
                            />
                        </Col>
                        <Col md={4}>
                            <Form.Control
                                type="text"
                                placeholder="Filtrar por raza"
                                value={filtroRaza}
                                onChange={(e) => setFiltroRaza(e.target.value)}
                            />
                        </Col>
                        <Col md={2}>
                            <Form.Control
                                type="number"
                                placeholder="Filtrar por edad"
                                value={filtroEdad}
                                onChange={(e) => setFiltroEdad(e.target.value)}
                            />
                        </Col>
                        <Col md={2}>
                            <Button variant="success" onClick={handleExport} className="w-100">
                                Exportar
                            </Button>
                        </Col>
                    </Row>
                </Form>

                {/* Tabla */}
                <Table hover responsive className="align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>Cliente</th>
                            <th>Porcino</th>
                            <th>Raza</th>
                            <th>Edad</th>
                            <th>Peso</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientesFiltrados.map((cliente) =>
                            filtrarPorcinos(cliente.porcinos).map((porcino) => (
                                <tr key={`${cliente.cedula}-${porcino.id}`}>
                                    <td>{`${cliente.nombres} ${cliente.apellidos}`}</td>
                                    <td>{porcino.identificacion}</td>
                                    <td>{porcino.raza}</td>
                                    <td>{porcino.edad}</td>
                                    <td>{porcino.peso}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
            </div>
        </Container>
    );
};

export default Reportes;
