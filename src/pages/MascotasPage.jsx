import MascotasList from "../components/mascotas/MascotasList";
import mascotasApi from "../api/mascotas-api";
import { useEffect, useState } from "react";

function MascotasPage() {

    const [mascotasList, setMascotasList] = useState([]);

    const fetchMascotas = async ()=> {
        try{
            const response = await mascotasApi.get('mascotas/');
            console.log(response.data);
            setMascotasList(response.data);
        }catch (error){
            console.log(error);
        }
    }
    
    const addMascotas = async (mascota) => {
        try {
            const response = await mascotasApi.post('mascotas/', mascota);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            fetchMascotas();
        }
    }


    const updateMascota = async (id, nuevoEstado) => {
        try{
            await mascotasApi.patch(`mascotas/${id}/`,{
                estado: nuevoEstado
            });
            fetchMascotas();
        }catch(error) {
            console.log(error);
        }
    }
    
    const deleteMascota = async (id) =>{
        try{
            await mascotasApi.delete(`mascotas/${id}/`);
            fetchMascotas();
        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchMascotas();
    },[])
    return (
        <>
            <h1>Pagina Mascotas</h1>
            <MascotasList  
                lista= {mascotasList}  
                onAdd={addMascotas}
                onEdit={updateMascota}
                onDelete={deleteMascota}
            />
        </>
    )
}  

export default MascotasPage;