import { useEffect, useState } from "react";
import mascotasApi from "../../api/mascotas-api";

function MascotasForm({onAdd}) {

    const [estados, setEstados] = useState([]);
    const [tipoAnimal, setTipoAnimal] = useState([]);
    const [sexo, setSexo] = useState([]);
    const [tamano, setTamano] = useState([]);
    
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [edad, setEdad] = useState("");
    const [raza, setRaza] = useState("");
    const [selectedEstado, setEstado] = useState("");
    const [selectedTipoAnimal, setTipoAnimalSeleccionado] = useState("");
    const [selectedSexo, setSexoSeleccionado] = useState("");
    const [selectedTamano, setTamanoSeleccionado] = useState("");
    const [imagen, setImagen] = useState(null);

    const [mensajeError, setMensajeError] = useState("");

    const fetchEstados = async () =>{
        try{
            setMensajeError("");

            const response = await mascotasApi.get("choices/");
            console.log(response.data.estado);
            setEstados(response.data.estado);
            setTipoAnimal(response.data.tipo_animal);
            setSexo(response.data.sexo);
            setTamano(response.data.tamano);

        }catch(error){
            if (error.response && error.response.status === 404) {
                setMensajeError("No se encontraron los datos de selección.");
            } else if (error.response && error.response.status === 400) {
                setMensajeError("Error al cargar los datos de selección. Por favor, verifica los datos.");
            } else { setMensajeError("Ocurrió un error al cargar los datos de selección."); }
            console.log(error.response?.data);
        }
    }

    useEffect(()=>{
        fetchEstados();
    },[])

const validarFormulario = () => {

    if (
        !nombre ||
        !descripcion ||
        !edad ||
        !raza ||
        !selectedEstado ||
        !selectedTipoAnimal ||
        !selectedSexo ||
        !selectedTamano ||
        !imagen
    ) {
        setMensajeError("Todos los campos son obligatorios.");
        return false;
    }

    setMensajeError("");
    return true;
}



const handleSubmit = (e) =>{
    e.preventDefault();
    if (!validarFormulario()) {
        return;
    }
    
    console.log(imagen); 
    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("descripcion", descripcion);
    formData.append("edad", edad);
    formData.append("raza", raza);
    formData.append("estado", selectedEstado);
    formData.append("tipo_animal", selectedTipoAnimal);
    formData.append("sexo", selectedSexo);
    formData.append("tamano", selectedTamano);
    formData.append("imagen", imagen); 

    onAdd(formData); 
}
    return(
        <>{mensajeError && <p style={{color: 'red'}}>{mensajeError}</p>} 
        <form  onSubmit={handleSubmit} encType="multipart/form-data">

            <label>Nombre:
                <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                </label>

            <label>Descripcion:
                <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} ></textarea>
                </label>

            <label>Edad:
                <input type="number" value={edad} onChange={(e) => setEdad(e.target.value)} />
                </label>

            <label>Raza:
                <input type="text" value={raza} onChange={(e) => setRaza(e.target.value)} />
                </label>
            
            <label>Estado:
                <select value={selectedEstado} onChange={(e) => setEstado(e.target.value)}>
                    <option value={""}>Sin estado</option>
                    {
                        estados.map(e => <option value={e.value} key={e.value}>{e.label}</option>)
                    }
                </select>
            </label>

            <label>Tipo Animal:
                <select value={selectedTipoAnimal} onChange={(e) => setTipoAnimalSeleccionado(e.target.value)}>
                    <option value={""}>Sin estado</option>
                    {
                        tipoAnimal.map(e => <option value={e.value} key={e.value}>{e.label}</option>)
                    }
                </select>
            </label>
            
            <label>Sexo:
                <select value={selectedSexo} onChange={(e) => setSexoSeleccionado(e.target.value)}>
                    <option value={""}>Sin estado</option>
                    {
                        sexo.map(e => <option value={e.value} key={e.value}>{e.label}</option>)
                    }
                </select>
            </label>

            <label>Tamaño:
                <select value={selectedTamano} onChange={(e) => setTamanoSeleccionado(e.target.value)}>
                    <option value={""}>Sin estado</option>
                    {
                        tamano.map(e => <option value={e.value} key={e.value}>{e.label}</option>)
                    }
                </select>
            </label>
            
            <label> Imagen:
                <input type="file" onChange={(e) => setImagen(e.target.files[0])} />
                </label>
                <button type="submit">Guardar</button>
        </form>
        </>
    )
}

export default MascotasForm;