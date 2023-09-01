import ModalContainer from "./ModalContainer";
import TarjetaNoticiaContainer from "./TarjetaNoticiaContainer";
import { ListaNoticias } from "./styled";
import { INoticiasNormalizadas } from "./types";

interface ListaNoticiasContainerProps {
  noticias: INoticiasNormalizadas[];
  modal: INoticiasNormalizadas | null;
  setModal: (noticia: INoticiasNormalizadas | null) => void;
}

const ListaNoticiasContainer = ({
  noticias,
  modal,
  setModal,
}: ListaNoticiasContainerProps) => {
  const openModal: Function = (noticia: INoticiasNormalizadas) => {
    return () => setModal(noticia);
  };

  const closeModal = () => {
    setModal(null);
  };

  return (
    <>
      <ListaNoticias>
        {noticias.map((noticia) => (
          <TarjetaNoticiaContainer
            key={noticia.id}
            noticia={noticia}
            handleButtonClick={openModal(noticia)}
          />
        ))}
      </ListaNoticias>
      <ModalContainer modal={modal} closeModal={closeModal} />
    </>
  );
};

export default ListaNoticiasContainer;
