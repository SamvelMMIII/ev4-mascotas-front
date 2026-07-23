import { useParams, Link } from "react-router-dom";
import mascotasApi from "../../api/mascotas-api";
import { useEffect, useState } from "react";

const ESTADOS_LABEL = {
    "perdida": "Perdida",
    "encontrada": "Encontrada",
    "en_adopcion": "En adopcion",
    "adoptada": "Adoptada"
}

function MascotasDetail() {
    const { id } = useParams();
    const [mascota, setMascota] = useState(null);

    const fetchMascotaDetail = async () => {
        try {
            const response = await mascotasApi.get(`mascotas/${id}/`);
            setMascota(response.data);
        } catch (error) {
            console.log("Error al cargar la mascota:", error);
        }
    };

    useEffect(() => {
        fetchMascotaDetail();
    }, [id]);

    return (
        <div>
            {!mascota ? (
                <p>Cargando detalles de la mascota...</p>
            ) : (
                <>
                    <h2>{mascota.nombre}</h2>
                    {mascota.imagen && (
                        <img 
                            src={mascota.imagen} 
                            alt={mascota.nombre} 
                            style={{ maxWidth: '300px', borderRadius: '10px' }} 
                        />
                    )}
                    <p><strong>Descripción:</strong> {mascota.descripcion}</p>
                    
                    <ul>
                        <li><strong>Edad:</strong> {mascota.edad}</li>
                        <li><strong>Raza:</strong> {mascota.raza}</li>
                        <li><strong>Tipo de Animal:</strong> {mascota.tipo_animal}</li>
                        <li><strong>Sexo:</strong> {mascota.sexo}</li>
                        <li><strong>Tamaño:</strong> {mascota.tamano}</li>
                        <li><strong>Estado actual:</strong> {ESTADOS_LABEL[mascota.estado] || mascota.estado}</li>
                    </ul>
                </>
            )}
        </div>
    );
}

export default MascotasDetail;