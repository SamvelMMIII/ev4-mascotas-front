import { useParams, Link } from "react-router-dom";
import mascotasApi from "../../api/mascotas-api";
import { useEffect, useState, useCallback } from "react";

const ESTADOS_LABEL = {
    "perdida": "Perdida",
    "encontrada": "Encontrada",
    "en_adopcion": "En adopción",
    "adoptada": "Adoptada"
};

function MascotasDetail() {
    const { id } = useParams();
    const [mascota, setMascota] = useState(null);
    const [mensajeError, setMensajeError] = useState("");
    const [nuevoComentario, setNuevoComentario] = useState("");
    const [autorComentario, setAutorComentario] = useState(""); 

    const fetchMascotaDetail = useCallback(async () => {
        try {
            const response = await mascotasApi.get(`mascotas/${id}/`);
            setMascota(response.data);
            setMensajeError(""); 
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setMensajeError("Mascota no encontrada.");
            } else if (error.response?.status === 400) {
                setMensajeError("Error al cargar la mascota.");
            } else {
                setMensajeError("Ocurrió un error al cargar la mascota.");
            }
            console.log(error.response?.data);
        }
    }, [id]);

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
    }, [fetchMascotaDetail]);

    return (
        <main className="container py-4">
            {mensajeError && <div className="alert alert-danger" role="alert">{mensajeError}</div>}
            {!mascota ? (
                <div className="card border-0 shadow-sm">
                    <div className="card-body">
                        <p className="placeholder-glow mb-0">Cargando detalles de la mascota...</p>
                    </div>
                </div>
            ) : (
                <>
                    <Link className="btn btn-outline-success fw-bold mb-3" to="/mascotas">Volver a la lista</Link>

                    <section className="card border-0 shadow-sm overflow-hidden mb-4">
                        <div className="row g-0">
                            <div className="col-lg-5">
                                {mascota.imagen && (
                                    <img 
                                        className="img-fluid w-100 h-100 object-fit-cover"
                                        src={mascota.imagen} 
                                        alt={mascota.nombre} 
                                    />
                                )}
                            </div>
                            <div className="col-lg-7">
                                <div className="card-body p-4">
                                    <span className="badge text-bg-success mb-3">{ESTADOS_LABEL[mascota.estado] || mascota.estado}</span>
                                    <h2 className="display-6 fw-bold mb-3">{mascota.nombre}</h2>
                                    <p className="lead text-muted"><strong>Descripción:</strong> {mascota.descripcion}</p>
                                    
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item px-0 d-flex justify-content-between"><strong>Edad:</strong> <span>{mascota.edad}</span></li>
                                        <li className="list-group-item px-0 d-flex justify-content-between"><strong>Raza:</strong> <span>{mascota.raza}</span></li>
                                        <li className="list-group-item px-0 d-flex justify-content-between"><strong>Tipo de Animal:</strong> <span>{mascota.tipo_animal}</span></li>
                                        <li className="list-group-item px-0 d-flex justify-content-between"><strong>Sexo:</strong> <span>{mascota.sexo}</span></li>
                                        <li className="list-group-item px-0 d-flex justify-content-between"><strong>Tamaño:</strong> <span>{mascota.tamano}</span></li>
                                        <li className="list-group-item px-0 d-flex justify-content-between"><strong>Estado actual:</strong> <span>{ESTADOS_LABEL[mascota.estado] || mascota.estado}</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="card border-0 shadow-sm" id="comentarios">
                        <div className="card-body p-4">
                            <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-2 mb-3">
                                <div>
                                    <p className="text-primary fw-semibold text-uppercase small mb-1">Gestión de comentarios</p>
                                    <h3 className="h4 fw-bold mb-0">Comentarios</h3>
                                </div>
                                <span className="badge text-bg-primary align-self-start align-self-md-center">
                                    {mascota.comentarios ? mascota.comentarios.length : 0} comentarios
                                </span>
                            </div>
                            
                            {mascota.comentarios && mascota.comentarios.length > 0 ? (
                                <ul className="list-group mb-4">
                                    {mascota.comentarios.map((comentario) => (
                                        <li className="list-group-item d-flex align-items-start justify-content-between gap-3" key={comentario.id}>
                                            <div><strong>{comentario.autor}:</strong> {comentario.contenido}</div>
                                            <button 
                                                className="btn btn-sm btn-outline-danger fw-bold"
                                                onClick={() => handleEliminarComentario(comentario.id)}
                                            >
                                                Eliminar
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-muted mb-4">No hay comentarios aún. ¡Sé el primero en comentar!</p>
                            )}

                            <div className="border rounded-3 bg-light p-3 p-md-4">
                            <h4 className="h5 fw-bold mb-3">Agregar comentario</h4>
                            <form className="row g-3" onSubmit={handleAgregarComentario}>
                                <div className="col-md-4">
                                    <label className="form-label">Autor:</label>
                                    <input 
                                        className="form-control"
                                        type="text" 
                                        value={autorComentario} 
                                        onChange={(e) => setAutorComentario(e.target.value)} 
                                        required 
                                    />
                                </div>

                                <div className="col-md-8">
                                    <label className="form-label">Comentario:</label>
                                    <textarea 
                                        className="form-control"
                                        value={nuevoComentario} 
                                        onChange={(e) => setNuevoComentario(e.target.value)} 
                                        required 
                                    />
                                </div>

                                <div className="col-12 d-flex justify-content-end">
                                    <button className="btn btn-primary fw-bold px-4" type="submit">Agregar Comentario</button>
                                </div>
                            </form>
                            </div>
                        </div>
                    </section>
                </>
            )}
        </main>
    );
}

export default MascotasDetail;