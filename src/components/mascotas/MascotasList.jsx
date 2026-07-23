import {Link} from "react-router-dom";
import MascotasForm from "./MascotasForm";
import { useState } from "react";

const ESTADOS_LABEL = {
    "perdida": "Perdida",
    "encontrada": "Encontrada",
    "en_adopcion": "En adopcion",
    "adoptada": "Adoptada"
};

function MascotasList({lista, onAdd, onEdit, onDelete}) {
    
    const [estadosSeleccionados, setEstadosSeleccionados] = useState({});

    return (
        <>
            <h2>Lista Mascotas</h2>
            <MascotasForm onAdd={onAdd} />
            
            {
                lista.map(m =>
                (
                    <div key={m.id}>
                        <h3>{m.nombre}</h3>
                        <img src={m.imagen} />
                        <p>{m.descripcion}</p>
                        <p>{m.edad}</p>
                        <p>{m.raza}</p>
                        <p>{ESTADOS_LABEL[m.estado] || m.estado}</p>

                        <select 
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
                        
                        <button onClick={() => onEdit(m.id, estadosSeleccionados[m.id] || m.estado)}>
                            Cambiar estado
                        </button>
                        <button onClick={() => onDelete(m.id)}>Eliminar</button>
                    
                        <Link to={`/mascotas/${m.id}`}>Ver Mascota</Link>
                    </div>
                )
                )
            }
        </>
    )
}

export default MascotasList;