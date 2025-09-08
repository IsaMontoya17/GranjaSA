import { useState } from "react";
import { Nav, Collapse } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import {
  FaPiggyBank,
  FaUsers,
  FaUtensils,
  FaChartBar,
  FaChevronDown,
  FaList,
  FaPlus,
} from "react-icons/fa";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  const [openPorcinos, setOpenPorcinos] = useState(false);
  const [openClientes, setOpenClientes] = useState(false);

  return (
    <aside className={styles.sidebar}>
      <h4 className="px-3 py-2 border-bottom">Menú</h4>
      <Nav className="flex-column">
        {/* Porcinos */}
        <div
          className={styles.navItem}
          onClick={() => setOpenPorcinos(!openPorcinos)}
        >
          <span>
            <FaPiggyBank className="me-2" />
            Gestión de Porcinos
          </span>
          <FaChevronDown
            className={`${styles.chevron} ${openPorcinos ? styles.rotate : ""}`}
          />
        </div>
        <Collapse in={openPorcinos}>
          <div>
            <Nav.Link as={NavLink} to="/porcinos/listar" className={styles.subItem}>
              <FaList className="me-2" />
              Listar Porcinos
            </Nav.Link>
            <Nav.Link as={NavLink} to="/porcinos/nuevo" className={styles.subItem}>
              <FaPlus className="me-2" />
              Registrar Nuevo Porcino
            </Nav.Link>
          </div>
        </Collapse>

        {/* Clientes */}
        <div
          className={styles.navItem}
          onClick={() => setOpenClientes(!openClientes)}
        >
          <span>
            <FaUsers className="me-2" />
            Gestión de Clientes
          </span>
          <FaChevronDown
            className={`${styles.chevron} ${openClientes ? styles.rotate : ""}`}
          />
        </div>
        <Collapse in={openClientes}>
          <div>
            <Nav.Link as={NavLink} to="/clientes/listar" className={styles.subItem}>
              <FaList className="me-2" />
              Listar Clientes
            </Nav.Link>
            <Nav.Link as={NavLink} to="/clientes/nuevo" className={styles.subItem}>
              <FaPlus className="me-2" />
              Registrar Nuevo Cliente
            </Nav.Link>
          </div>
        </Collapse>

        {/* Alimentación */}
        <Nav.Link as={NavLink} to="/alimentacion">
          <FaUtensils className="me-2" />
          Alimentación
        </Nav.Link>

        {/* Reportes */}
        <Nav.Link as={NavLink} to="/reportes">
          <FaChartBar className="me-2" />
          Reportes
        </Nav.Link>
      </Nav>
    </aside>
  );
};

export default Sidebar;
