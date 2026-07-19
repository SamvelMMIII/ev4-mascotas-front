import { useEffect, useState } from "react";
import mascotasApi from "../../api/mascotas-api";

function MascotasForm(){

    const [estados, setEstados] = useState([]);
    const [tipoMascota, setTipoMascota] = useState([]);
    const [sexo, setSexo] = useState([]);
    const [tamano, setTamano] = useState([]);
    const [nombre, setNombre] = useState("");

    const fetchEstados = async () =>{
        try{
            const response = await mascotasApi.get("choices/");
            console.log(response.data.estado);
            setEstados(response.data.estado);
            setTipoMascota(response.data.tipo_animal);
            setSexo(response.data.sexo);
            setTamano(response.data.tamano);

        }catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchEstados();
    },[])
    return(
        <form>
            <label>Nombre:
                <input type="text" />
                </label>
            <label>Descripcion:
                <textarea></textarea>
                </label>
            <label>Edad:
                <input type="number" />
                </label>
            <label>Raza:
                <input type="text" />
                </label>
            

            <label>Estado:
                <select>
                    <option value={""}>Sin estado</option>
                    {
                        estados.map(e => <option value={e.value} key={e.value}>{e.label}</option>)
                    }
                </select>
            </label>
            <label>Tipo Animal:
                <select>
                    <option value={""}>Sin estado</option>
                    {
                        tipoMascota.map(e => <option value={e.value} key={e.value}>{e.label}</option>)
                    }
                </select>
            </label>
            <label>Sexo:
                <select>
                    <option value={""}>Sin estado</option>
                    {
                        sexo.map(e => <option value={e.value} key={e.value}>{e.label}</option>)
                    }
                </select>
            </label>
            <label>Tamaño:
                <select>
                    <option value={""}>Sin estado</option>
                    {
                        tamano.map(e => <option value={e.value} key={e.value}>{e.label}</option>)
                    }
                </select>
            </label>
            <label> Imagen:
                <input type="file"/>
                </label>
        </form>
    )
}

export default MascotasForm;