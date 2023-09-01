import { useState } from "react";
import { NombresSimpsons, INFO_SIMPSONS } from "./constants";
import { BioBoton, BioBotones, BioContainer, BioDescripcion, BioImagen, BioNombre } from "./Bio.styles";

const Bio = () => {
  const [bioActiva, setBioActiva] = useState(
    INFO_SIMPSONS[NombresSimpsons.BART]
  );

  const onClick: (nombre: NombresSimpsons) => void = (nombre) =>
    setBioActiva(INFO_SIMPSONS[nombre]);

  const crearBotones = () => {
    return Object.keys(INFO_SIMPSONS).map((nombre: string) => (
      <BioBoton
        key={nombre as string}
        onClick={() => onClick(nombre as NombresSimpsons)}
        activo={bioActiva.id === nombre}
      >
        {nombre}
      </BioBoton>
    ));
  };

  return (
    <BioContainer>
      <BioBotones>{crearBotones()}</BioBotones>
      <div>
        <div>
          <BioImagen
            src={bioActiva.image}
            alt={bioActiva.nombre}
          />
        </div>
        <div>
          <BioNombre>{bioActiva.nombre}</BioNombre>
          <BioDescripcion>{bioActiva.descripcion}</BioDescripcion>
        </div>
      </div>
    </BioContainer>
  );
};

export default Bio;
