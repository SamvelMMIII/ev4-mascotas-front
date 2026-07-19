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
                    </div>
                )
                )
            }
        </>
    )
}

export default MascotasList;