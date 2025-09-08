const API_URL = "http://localhost:8090/api/alimentaciones";

export const getAlimentaciones = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error("Error al obtener alimentaciones");
        }
        return await response.json();
    } catch (error) {
        console.error("Error en getAlimentaciones:", error);
        throw error;
    }
};

export const deleteAlimentacion = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Error al eliminar la alimentación");
        }

        return true; 
    } catch (error) {
        console.error("deleteAlimentacion error:", error);
        throw error;
    }
};
