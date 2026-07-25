import MascotasList from "../components/mascotas/MascotasList";
import mascotasApi from "../api/mascotas-api";
import { useEffect, useState } from "react";

function MascotasPage() {

    const [mascotasList, setMascotasList] = useState([]);
    const [mensajeError, setMensajeError] = useState("");

    const fetchMascotas = async ()=> {
        try{
            setMensajeError("");
            const response = await mascotasApi.get('mascotas/');
            console.log(response.data);
            setMascotasList(response.data);
        }catch (error){
            if (error.response && error.response.status === 404) {
                setMensajeError("No se encontraron mascotas.");
            } else if (error.response && error.response.status === 400) {
                setMensajeError("Error al cargar las mascotas. Por favor, verifica los datos.");
            } else { setMensajeError("Ocurrió un error al cargar las mascotas."); }
            console.log(error.response?.data);
        }
    }
    
    const addMascotas = async (mascota) => {
        try {
            setMensajeError("");
            const response = await mascotasApi.post('mascotas/', mascota);
            console.log(response.data);
            fetchMascotas();
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setMensajeError("Error al agregar mascota. Por favor, verifica los datos ingresados.");
            }else if (error.response && error.response.status === 404) {
                setMensajeError("No se encontró la ruta para agregar mascota.");
            } else {
                setMensajeError("Ocurrió un error al agregar la mascota.");
            }
            console.log(error.response?.data);
        } 
    }
    
    const updateMascota = async (id, nuevoEstado) => {
        try{
            setMensajeError("");
            await mascotasApi.patch(`mascotas/${id}/`,{
                estado: nuevoEstado
            });
            fetchMascotas();
        }catch(error) {
            if (error.response && error.response.status === 400) {
                setMensajeError("Error al actualizar mascota. Por favor, verifica los datos ingresados.");
            }else if (error.response && error.response.status === 404) {
                setMensajeError("Mascota no encontrada. No se puede actualizar.");
            }else{ setMensajeError("Ocurrió un error al actualizarla mascota.")}
            console.log(error.response?.data);
        }
    }
    
    const deleteMascota = async (id) =>{
        try{
            setMensajeError("")
            await mascotasApi.delete(`mascotas/${id}/`);
            fetchMascotas();
        }catch(error){
            if(error.response?.status=== 404){
                setMensajeError("No se encontro la mascota para eliminar.")
            }else{
                setMensajeError("Ocurrió un error al eliminar la Mascota.")
            }
            console.log(error.response?.data);
        }
    }

    useEffect(()=>{
        fetchMascotas();
    },[])
    return (
        <main className="container py-4">
            <div className="d-flex flex-column flex-md-row align-items-md-end justify-content-between gap-3 mb-4">
                <div>
                    <p className="text-success fw-semibold text-uppercase small mb-1">Red de mascotas</p>
                    <h1 className="display-6 fw-bold mb-0">Mascotas publicadas</h1>
                </div>
                <span className="badge rounded-pill text-bg-success align-self-start align-self-md-end px-3 py-2">
                    {mascotasList.length} registros
                </span>
            </div>
            {mensajeError && <div className="alert alert-danger" role="alert">{mensajeError}</div>}
            <MascotasList  
                lista= {mascotasList}  
                onAdd={addMascotas}
                onEdit={updateMascota}
                onDelete={deleteMascota}
            />
        </main>
    )
}  

export default MascotasPage;
