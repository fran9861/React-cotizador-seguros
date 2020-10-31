// obtiene la diferencia de años
export const obtenerDiferenciaAño = (anio) => {
  return new Date().getFullYear() - anio;
};

// calcula el total a pagar según la marca
export const calcularMarca = (marca) => {
  let incremento;
  switch (marca) {
    case "europeo":
      incremento = 1.3;
      break;
    case "americano":
      incremento = 1.15;
      break;
    case "asiatico":
      incremento = 1.05;
      break;
    default:
      break;
  }
  return incremento;
};

//permite identificar el tipo de plan que el usuario desea y retorna el aumento en la tarifa
export const calcularPlanSeguro = (plan) => {
  return plan === "basico" ? 1.2 : 1.5;
};

//Muestra la primer letra mayuscula
export const primerMayuscula = (texto) => {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
};
