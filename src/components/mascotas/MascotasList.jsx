import { useEffect, useState } from "react";
import mascotasApi from "../../api/mascotas-api";
import {Link} from "react-router-dom";

function MascotasList() {
    const [mascotasList, setMascotasList] = useState([]);
    const fetchMascotas = async () => {

        try {
            const response = await mascotasApi.get('mascotas/');
            console.log(response.data);
            setMascotasList(response.data);
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchMascotas();
    }, [])

    return (
        <>
            <h2>Lista mascotas</h2>
            {
                mascotasList.map(m =>
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