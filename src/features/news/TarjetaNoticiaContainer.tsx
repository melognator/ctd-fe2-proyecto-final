import { MouseEventHandler } from "react";
import {
    BotonLectura,
    DescripcionTarjetaNoticia,
    FechaTarjetaNoticia,
    ImagenTarjetaNoticia,
    TarjetaNoticia,
    TituloTarjetaNoticia,
} from "./styled";
import { INoticiasNormalizadas } from "./types";

interface TarjetaNoticiaContainerProps {
    noticia: INoticiasNormalizadas;
    handleButtonClick: MouseEventHandler<HTMLButtonElement>;
}

const TarjetaNoticiaContainer = ({
    noticia,
    handleButtonClick,
}: TarjetaNoticiaContainerProps) => {
    return (
        <TarjetaNoticia>
            <ImagenTarjetaNoticia src={noticia.imagen} />
            <TituloTarjetaNoticia>{noticia.titulo}</TituloTarjetaNoticia>
            <FechaTarjetaNoticia>{noticia.fecha}</FechaTarjetaNoticia>
            <DescripcionTarjetaNoticia>
                {noticia.descripcionCorta}
            </DescripcionTarjetaNoticia>
            <BotonLectura onClick={handleButtonClick}>Ver más</BotonLectura>
        </TarjetaNoticia>
    );
};

export default TarjetaNoticiaContainer;
