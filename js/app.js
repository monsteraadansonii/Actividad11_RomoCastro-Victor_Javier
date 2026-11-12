const inputNombre = document.getElementById("nombreP");
const inputOxigeno = document.getElementById("oxigenoP");
const inputRitmo = document.getElementById("ritmoP");
const btnRegistrar = document.getElementById("btnRegistrar");
const listaPacientes = document.getElementById("listaPacientes");

class Paciente {
    constructor(nombre, oxigeno, ritmo) {
        this.nombre = nombre;
        this.oxigeno = parseInt(oxigeno);
        this.ritmo = parseInt(ritmo);
        this.nivelRiesgo = this.estatusRiesgo();
    }

    estatusRiesgo() {
        if (this.oxigeno < 90 || this.ritmo > 130) {
            return { texto: "Crítico", clase: "table-danger", badge: "bg-danger" };
        } else if (this.oxigeno >= 90 && this.oxigeno <= 94) {
            return { texto: "Urgente", clase: "table-warning", badge: "bg-warning text-dark" };
        } else {
            return { texto: "Estable", clase: "table-success", badge: "bg-success" };
        }
    }
}

document.addEventListener("DOMContentLoaded", cargarPacientes);

function cargarPacientes() {
    mostrarPacientes();
}

function obtenerPacientes() {
    return JSON.parse(localStorage.getItem("pacientes"));
}

btnRegistrar.addEventListener("click", () => {
    const nombre = inputNombre.value.trim();
    const oxigeno = inputOxigeno.value.trim();
    const ritmo = inputRitmo.value.trim();

    if (nombre === "" || oxigeno === "" || ritmo === "") {
        return alert("No dejes espacios vacíos");
    }

    const nuevoPaciente = new Paciente(nombre, oxigeno, ritmo);

    const pacientes = obtenerPacientes();
    pacientes.push(nuevoPaciente);
    localStorage.setItem("pacientes", JSON.stringify(pacientes));

    mostrarPacientes();
    limpiarCampos();
});

function mostrarPacientes() {
    const pacientes = obtenerPacientes();
    listaPacientes.innerHTML = "";

    pacientes.forEach((p) => {
        
        const pacienteObj = new Paciente(p.nombre, p.oxigeno, p.ritmo);
        const fila = document.createElement("tr");
        fila.className = pacienteObj.nivelRiesgo.clase; 

        fila.innerHTML = `
            <td>${pacienteObj.nombre}</td>
            <td>${pacienteObj.oxigeno}%</td>
            <td>${pacienteObj.ritmo} lpm</td>
            <td><span class="badge ${pacienteObj.nivelRiesgo.badge}">${pacienteObj.nivelRiesgo.texto}</span></td>
        `;

        listaPacientes.appendChild(fila);
    });
}

function limpiarCampos() {
    inputNombre.value = "";
    inputOxigeno.value = "";
    inputRitmo.value = "";
}
