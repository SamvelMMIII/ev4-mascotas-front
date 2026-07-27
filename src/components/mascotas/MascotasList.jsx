import {Link} from "react-router-dom";
import MascotasForm from "./MascotasForm";
import { useState } from "react";

const ESTADOS_LABEL = {
    "perdida": "Perdida",
    "encontrada": "Encontrada",
    "en_adopcion": "En adopcion",
    "adoptada": "Adoptada"
};

const ESTADOS_BADGE = {
    "perdida": "text-bg-danger",
    "encontrada": "text-bg-warning",
    "en_adopcion": "text-bg-primary",
    "adoptada": "text-bg-success"
};

function MascotasList({lista, onAdd, onEdit, onDelete}) {
    
    const [estadosSeleccionados, setEstadosSeleccionados] = useState({});

    return (
        <>
            <section className="mb-4">
                <div className="card border-0 shadow-sm">
                    <div className="card-body p-4">
                        <h2 className="h4 fw-bold mb-3">Registrar mascota</h2>
                        <MascotasForm onAdd={onAdd} />
                    </div>
                </div>
            </section>

            <div className="d-flex align-items-center justify-content-between mb-3">
                <h2 className="h4 fw-bold mb-0">Lista Mascotas</h2>
                <span className="text-muted small">Actualiza estados o revisa detalles</span>
            </div>
            
            <section className="row g-4">
            {
                lista.map(m =>
                (
                    <div className="col-12 col-md-6 col-xl-4" key={m.id}>
                        <article className="card h-100 border-0 shadow-sm overflow-hidden">
                            <div className="ratio ratio-4x3 bg-secondary-subtle">
                                <img className="w-100 h-100 object-fit-cover" src={m.imagen} />
                            </div>
                            <div className="card-body d-flex flex-column gap-3">
                                <div>
                                    <div className="d-flex align-items-start justify-content-between gap-2 mb-2">
                                        <h3 className="h5 fw-bold mb-0">{m.nombre}</h3>
                                        <span className={`badge ${ESTADOS_BADGE[m.estado] || "text-bg-secondary"}`}>{ESTADOS_LABEL[m.estado] || m.estado}</span>
                                    </div>
                                    <p className="card-text text-muted mb-3">{m.descripcion}</p>
                                    <div className="row g-2 small">
                                        <div className="col-6">
                                            <span className="d-block text-muted">Edad</span>
                                            <strong>{m.edad}</strong>
                                        </div>
                                        <div className="col-6">
                                            <span className="d-block text-muted">Raza</span>
                                            <strong>{m.raza}</strong>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-auto">
                                    <label className="form-label small fw-semibold">Estado</label>
                                    <div className="row g-2 mb-3">
                                        <div className="col-7">
                                            <select 
                                                className="form-select"
                                                value={estadosSeleccionados[m.id] || m.estado}
                                                onChange={(e)=>{
                                                    setEstadosSeleccionados({
                                                        ...estadosSeleccionados, [m.id]:e.target.value
                                                    })
                                                }}>
                                                <option value="perdida">
                                                    Perdida
                                                </option>
                                                <option value="encontrada">
                                                    Encontrada
                                                </option>
                                                <option value="en_adopcion">
                                                    En adopcion
                                                </option>
                                                <option value="adoptada">
                                                    Adoptada
                                                </option>
                                            </select>
                                        </div>
                                        <div className="col-5 d-grid">
                                            <button className="btn btn-success fw-bold" onClick={() => onEdit(m.id, estadosSeleccionados[m.id] || m.estado)}>
                                                Cambiar estado
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div className="d-grid gap-2">
                                        <div className="btn-group">
                                            <Link className="btn btn-outline-primary fw-bold" to={`/mascotas/${m.id}`}>Ver Mascota</Link>
                                            <Link className="btn btn-outline-secondary fw-bold" to={`/mascotas/${m.id}#comentarios`}>Comentar</Link>
                                            <button className="btn btn-outline-danger fw-bold" onClick={() => onDelete(m.id)}>Eliminar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                )
                )
            }
            </section>
        </>
    )
}

export default MascotasList;