import React, { useState } from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import {
  obtenerDiferenciaAño,
  calcularMarca,
  calcularPlanSeguro,
} from "../Helper";

const Campo = styled.div`
  display: flex;
  margin-bottom: 1rem;
  align-items: center;
`;
const Label = styled.label`
  flex: 0 0 100px;
`;
const Select = styled.select`
  display: block;
  width: 100%;
  padding: 1rem;
  border: 1px solid #e1e1e1;
  -webkit-appearance: none;
`;
const InputRadio = styled.input`
  margin: 0 1rem;
`;
const Boton = styled.button`
  background-color: #00838f;
  font-size: 16px;
  width: 100%;
  padding: 1rem;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  border: none;
  transition: background-color 0.3s ease;
  &:hover {
    cursor: pointer;
    background-color: #26c6da;
  }
`;
const Error = styled.div`
  background-color: red;
  color: white;
  padding: 1rem;
  width: 100%;
  text-align: center;
  margin-bottom: 2rem;
`;

const Formulario = ({ setResumen, setCargando }) => {
  const [datos, setDatos] = useState({
    marca: "",
    anio: "",
    plan: "",
  });
  const [error, setError] = useState(false);
  //leer datos del formulario y pasar al state
  const guardarDatos = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const cotizarSeguro = (e) => {
    e.preventDefault();

    if (marca.trim() === "" || anio.trim() === "" || plan.trim() === "") {
      setError(true);
      return;
    }
    setError(false);
    // se tiene un base de 2000
    let base = 2000;
    // obtener la diferencia de años
    const diferencia = obtenerDiferenciaAño(anio);
    // por cada año se resta el 3% del valor más
    base -= (diferencia * 3 * base) / 100;

    // el americano será 15 % más
    // el europeo será el 30% más
    // básico aumenta 20% más
    base = base * calcularMarca(marca);

    // completo 50% o básico 20%
    base = parseFloat(base * calcularPlanSeguro(plan));
    //animacion de el spinner cargando
    setCargando(true);
    setTimeout(() => {
      //elimina el spinner cargando
      setCargando(false);
      setResumen({
        cotizacion: base,
        datos: datos,
      });
    }, 2000);
    // guardar el resumen
  };
  const { marca, anio, plan } = datos;
  return (
    <form onSubmit={cotizarSeguro}>
      {error ? <Error>Todos los campos son requeridos</Error> : null}
      <Campo>
        <Label>Marca</Label>
        <Select name="marca" value={marca} onChange={guardarDatos}>
          <option value="">---Seleccione---</option>
          <option value="americano">Americano</option>
          <option value="europeo">Europeo</option>
          <option value="asiatico">Asiatico</option>
        </Select>
      </Campo>
      <Campo>
        <Label>Año automóvil</Label>
        <Select name="anio" value={anio} onChange={guardarDatos}>
          <option value="">-- Seleccione --</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
          <option value="2017">2017</option>
          <option value="2016">2016</option>
          <option value="2015">2015</option>
          <option value="2014">2014</option>
          <option value="2013">2013</option>
          <option value="2012">2012</option>
        </Select>
      </Campo>
      <Campo>
        <Label>Plan</Label>
        <InputRadio
          type="radio"
          name="plan"
          value="basico"
          checked={plan === "basico"}
          onChange={guardarDatos}
        />
        Básico
        <InputRadio
          type="radio"
          name="plan"
          value="completo"
          checked={plan === "completo"}
          onChange={guardarDatos}
        />
        Completo
      </Campo>
      <Boton type="submit">cotizar</Boton>
    </form>
  );
};
Formulario.propTypes = {
  setResumen: PropTypes.func.isRequired,
  setCargando: PropTypes.func.isRequired,
};
export default Formulario;
