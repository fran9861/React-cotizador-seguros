import React from "react";
import styled from "@emotion/styled";
import { primerMayuscula } from "../Helper";
import PropTypes from "prop-types";

const ContenedorResumen = styled.div`
  padding: 1rem;
  text-align: center;
  background-color: #00838f;
  color: #fff;
  margin-top: 1rem;
`;
const Resumen = ({ datos }) => {
  const { marca, anio, plan } = datos;
  //extraer datos
  if (marca === "" || anio === "" || plan === "") return null;

  return (
    <ContenedorResumen>
      <h2>resumen cotización</h2>
      <ul>
        <li>Marca : {primerMayuscula(marca)}</li>
        <li>Plan: {primerMayuscula(plan)}</li>
        <li>Año: {anio}</li>
      </ul>
    </ContenedorResumen>
  );
};
Resumen.propTypes = {
  datos: PropTypes.object.isRequired,
};
export default Resumen;
