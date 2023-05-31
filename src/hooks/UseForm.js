import { useState } from "react";

export const UseForm = (objetoInicial = {}) => {

    const [formulario, setFormulario] = useState(objetoInicial);

    const serializarFormulario = (formulario) => {

        const formData = new FormData(formulario);

        const objetivoCompleto = {};

        for (let [name, value] of formData) {
            objetivoCompleto[name] = value;
        }

        return objetivoCompleto;
    }

    const enviado = (e) => {
        e.preventDefault();

        let curso = serializarFormulario(e.target);
        setFormulario(curso);
        document.querySelector(".codigo").classList.add("enviado");
    }
    const cambiado = ({ target }) => {
        const { name, value } = target;

        setFormulario({
            ...formulario,
            [name]: value
        });
    }
    return {
        formulario,
        enviado,
        cambiado
    }
}