import {Link} from "react-router-dom";
import MascotasForm from "./MascotasForm";

function MascotasList({lista, onAdd}) {
    
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
                        <p>{m.estado}</p>
                    
                        <Link to={`/mascotas/${m.id}`}>Ver Mascota</Link>
                    </div>
                )
                )
            }
        </>
    )
}

export default MascotasList;