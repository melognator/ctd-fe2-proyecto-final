import ListaNoticiasContainer from "./ListaNoticiasContainer";
import {
    ContenedorNoticias,
    TituloNoticias,
} from "./styled";
import useNoticias from "./useNoticias";

const Noticias = () => {
    const { noticias, modal, setModal } = useNoticias();

    return (
        <ContenedorNoticias>
            <TituloNoticias>Noticias de los Simpsons</TituloNoticias>
            <ListaNoticiasContainer noticias={noticias} modal={modal} setModal={setModal} />
        </ContenedorNoticias>
    );
};

export default Noticias;
