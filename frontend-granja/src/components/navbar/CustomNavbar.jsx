import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';

const CustomNavbar = () => {
    return (
        <>
            <Navbar expand="lg" bg="dark" variant="dark" className="px-3">
                <Container fluid>
                    <Navbar.Brand href="#home" className="fw-bold">
                        <i className="fas fa-piggy-bank me-2"></i>
                        Granja - Sistema Porcino
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            
                            <NavDropdown 
                                title={
                                    <span>
                                        <i className="fas fa-pig me-1"></i>
                                        Gestión de Porcinos
                                    </span>
                                } 
                                id="porcinos-dropdown"
                            >
                                <NavDropdown.Item href="#action/3.1">
                                    <i className="fas fa-list me-2"></i>
                                    Listar todos los porcinos
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    <i className="fas fa-plus-circle me-2"></i>
                                    Registrar nuevo porcino
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.3">
                                    <i className="fas fa-search me-2"></i>
                                    Buscar por identificación
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.5">
                                    <i className="fas fa-utensils me-2"></i>
                                    Registro de alimentación
                                </NavDropdown.Item>
                            </NavDropdown>
                            
                            <NavDropdown 
                                title={
                                    <span>
                                        <i className="fas fa-users me-1"></i>
                                        Gestión de Clientes
                                    </span>
                                } 
                                id="clientes-dropdown"
                            >
                                <NavDropdown.Item href="#action/4.1">
                                    <i className="fas fa-list me-2"></i>
                                    Listar todos los clientes
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/4.2">
                                    <i className="fas fa-user-plus me-2"></i>
                                    Registrar nuevo cliente
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/4.3">
                                    <i className="fas fa-search me-2"></i>
                                    Buscar por cédula
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/4.4">
                                    <i className="fas fa-pig me-2"></i>
                                    Porcinos por cliente
                                </NavDropdown.Item>
                            </NavDropdown>
                            
                            <NavDropdown 
                                title={
                                    <span>
                                        <i className="fas fa-utensils me-1"></i>
                                        Alimentación
                                    </span>
                                } 
                                id="alimentacion-dropdown"
                            >
                                <NavDropdown.Item href="#action/5.1">
                                    <i className="fas fa-list me-2"></i>
                                    Tipos de alimentación
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/5.2">
                                    <i className="fas fa-plus-circle me-2"></i>
                                    Registrar nueva alimentación
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/5.3">
                                    <i className="fas fa-chart-bar me-2"></i>
                                    Control de dosis
                                </NavDropdown.Item>
                            </NavDropdown>
                            
                            <Nav.Link href="#reportes" className="nav-link">
                                <i className="fas fa-chart-line me-1"></i>
                                Reportes
                            </Nav.Link>
                        </Nav>
                        
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default CustomNavbar;