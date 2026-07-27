import { useEffect, useState, useCallback } from "react";
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

    const fetchEstados = useCallback(async () => {
        try {
            const response = await mascotasApi.get("choices/");
            console.log(response.data.estado);
            setEstados(response.data.estado);
            setTipoAnimal(response.data.tipo_animal);
            setSexo(response.data.sexo);
            setTamano(response.data.tamano);
            setMensajeError("");
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setMensajeError("No se encontraron los datos de selección.");
            } else if (error.response && error.response.status === 400) {
                setMensajeError("Error al cargar los datos de selección. Por favor, verifica los datos.");
            } else { setMensajeError("Ocurrió un error al cargar los datos de selección."); }
            console.log(error.response?.data);
        }
    }, []);

    useEffect(() => {
        fetchEstados();
    }, [fetchEstados]);

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
        <>{mensajeError && <div className="alert alert-danger" role="alert">{mensajeError}</div>} 
        <form className="row g-3" onSubmit={handleSubmit} encType="multipart/form-data">

            <label className="col-md-6 form-label">Nombre:
                <input className="form-control mt-1" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                </label>

            <label className="col-md-6 form-label">Descripcion:
                <textarea className="form-control mt-1" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} ></textarea>
                </label>

            <label className="col-md-3 form-label">Edad:
                <input className="form-control mt-1" type="number" value={edad} onChange={(e) => setEdad(e.target.value)} />
                </label>

            <label className="col-md-3 form-label">Raza:
                <input className="form-control mt-1" type="text" value={raza} onChange={(e) => setRaza(e.target.value)} />
                </label>
            
            <label className="col-md-3 form-label">Estado:
                <select className="form-select mt-1" value={selectedEstado} onChange={(e) => setEstado(e.target.value)}>
                    <option value={""} disabled>Seleccione un estado...</option>
                    {
                        estados.map(e => <option value={e.value} key={e.value}>{e.label}</option>)
                    }
                </select>
            </label>

            <label className="col-md-3 form-label">Tipo Animal:
                <select className="form-select mt-1" value={selectedTipoAnimal} onChange={(e) => setTipoAnimalSeleccionado(e.target.value)}>
                    <option value={""} disabled>Seleccione un tipo...</option>
                    {
                        tipoAnimal.map(e => <option value={e.value} key={e.value}>{e.label}</option>)
                    }
                </select>
            </label>
            
            <label className="col-md-4 form-label">Sexo:
                <select className="form-select mt-1" value={selectedSexo} onChange={(e) => setSexoSeleccionado(e.target.value)}>
                    <option value={""} disabled>Seleccione el sexo...</option>
                    {
                        sexo.map(e => <option value={e.value} key={e.value}>{e.label}</option>)
                    }
                </select>
            </label>

            <label className="col-md-4 form-label">Tamaño:
                <select className="form-select mt-1" value={selectedTamano} onChange={(e) => setTamanoSeleccionado(e.target.value)}>
                    <option value={""} disabled>Seleccione el tamaño...</option>
                    {
                        tamano.map(e => <option value={e.value} key={e.value}>{e.label}</option>)
                    }
                </select>
            </label>
            
            <label className="col-md-4 form-label"> Imagen:
                <input className="form-control mt-1" type="file" onChange={(e) => setImagen(e.target.files[0])} />
                </label>
                <div className="col-12 d-flex justify-content-end">
                    <button className="btn btn-success fw-bold px-4" type="submit">Guardar</button>
                </div>
        </form>
        </>
    )
}

export default MascotasForm;