import { useParams, Link } from "react-router-dom";
import mascotasApi from "../../api/mascotas-api";
import { useEffect, useState } from "react";

const ESTADOS_LABEL = {
    "perdida": "Perdida",
    "encontrada": "Encontrada",
    "en_adopcion": "En Adopción",
    "adoptada": "Adoptada"
};

function MascotasDetail() {
    const { id } = useParams();
    const [mascota, setMascota] = useState(null);
    const [mensajeError, setMensajeError] = useState("");
    
    const [nuevoComentario, setNuevoComentario] = useState("");
    const [autorComentario, setAutorComentario] = useState(""); 

    const fetchMascotaDetail = async () => {
        try {
            setMensajeError("");
            const response = await mascotasApi.get(`mascotas/${id}/`);
            setMascota(response.data);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setMensajeError("Mascota no encontrada.");
            }else if (error.response?.status === 400){
                setMensajeError("Error al cargar la mascota.");
            }else {
                setMensajeError("Ocurrió un error al cargar la mascota.");
            }
            console.log( error.response?.data);
        }
    };

    const handleAgregarComentario = async (e) => {
        e.preventDefault();
        try {
            setMensajeError("");
            await mascotasApi.post("comentarios/", {
                mascota: id,
                autor: autorComentario,
                contenido: nuevoComentario
            });
            
            setAutorComentario("");
            setNuevoComentario("");
            fetchMascotaDetail();
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setMensajeError("Error al agregar comentario. Por favor, verifica los datos ingresados.");
            }else if (error.response && error.response.status === 404) {
                setMensajeError("Mascota no encontrada. No se puede agregar el comentario.");
            } else {
                setMensajeError("Ocurrió un error al agregar el comentario.");
            }
            console.log(error.response?.data);
        }
    };

    const handleEliminarComentario = async (comentarioId) => {
        try {
            setMensajeError("");
            await mascotasApi.delete(`comentarios/${comentarioId}/`);
            
            fetchMascotaDetail();
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setMensajeError("Comentario no encontrado. No se puede eliminar.");
            }else if (error.response && error.response.status === 400) {
                setMensajeError("Error al eliminar comentario. Por favor, verifica los datos.");
            } else {
                setMensajeError("Ocurrió un error al eliminar el comentario.");
            }
            console.log( error.response?.data);
        }
    };

    useEffect(() => {
        fetchMascotaDetail();
    }, [id]);

    return (
        <div>
            {mensajeError && <p style={{ color: "red" }}>{mensajeError}</p>}
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

                    <hr />

                    <h3>Comentarios</h3>
                    
                    {mascota.comentarios && mascota.comentarios.length > 0 ? (
                        <ul>
                            {mascota.comentarios.map((comentario) => (
                                <li key={comentario.id} style={{ marginBottom: "10px" }}>
                                    <strong>{comentario.autor}:</strong> {comentario.contenido} 
                                    <button 
                                        onClick={() => handleEliminarComentario(comentario.id)}
                                        style={{ marginLeft: "10px", color: "red", cursor: "pointer" }}
                                    >
                                        Eliminar
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No hay comentarios aún. ¡Sé el primero en comentar!</p>
                    )}

                    <form onSubmit={handleAgregarComentario} style={{ marginTop: "20px", display: "flex", flexDirection: "column", maxWidth: "300px" }}>
                        <label>Autor:</label>
                        <input 
                            type="text" 
                            value={autorComentario} 
                            onChange={(e) => setAutorComentario(e.target.value)} 
                            required 
                            style={{ marginBottom: "10px" }}
                        />

                        <label>Comentario:</label>
                        <textarea 
                            value={nuevoComentario} 
                            onChange={(e) => setNuevoComentario(e.target.value)} 
                            required 
                            style={{ marginBottom: "10px" }}
                        />

                        <button type="submit">Agregar Comentario</button>
                    </form>
                    
                    <br />
                    <Link to="/mascotas">Volver a la lista</Link>
                </>
            )}
        </div>
    );
}

export default MascotasDetail;