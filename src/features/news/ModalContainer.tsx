import { BotonSuscribir, CloseButton, ContenedorModal, CotenedorTexto, DescripcionModal, ImagenModal, TarjetaModal, TituloModal } from "./styled";
import { INoticiasNormalizadas } from "./types";
import { SuscribeImage, CloseButton as Close } from "../../assets";

interface ModalContainerProps {
  modal: INoticiasNormalizadas | null;
  closeModal: () => void;
}

const ModalContainer = ({ modal, closeModal }: ModalContainerProps) => {
  const handleBotonSuscribir = () => {
    setTimeout(() => {
      alert("Suscripto!");
      closeModal();
    }, 1000);
  };

  return (
    <>
      {modal ? (
        modal.esPremium ? (
          <ContenedorModal>
            <TarjetaModal>
              <CloseButton onClick={(closeModal)}>
                <img src={Close} alt="close-button" />
              </CloseButton>
              <ImagenModal src={SuscribeImage} alt="mr-burns-excelent" />
              <CotenedorTexto>
                <TituloModal>Suscríbete a nuestro Newsletter</TituloModal>
                <DescripcionModal>
                  Suscríbete a nuestro newsletter y recibe noticias de nuestros
                  personajes favoritos.
                </DescripcionModal>
                <BotonSuscribir onClick={handleBotonSuscribir}>
                  Suscríbete
                </BotonSuscribir>
              </CotenedorTexto>
            </TarjetaModal>
          </ContenedorModal>
        ) : (
          <ContenedorModal>
            <TarjetaModal>
              <CloseButton onClick={closeModal}>
                <img src={Close} alt="close-button" />
              </CloseButton>
              <ImagenModal src={modal.imagen} alt="news-image" />
              <CotenedorTexto>
                <TituloModal>{modal.titulo}</TituloModal>
                <DescripcionModal>{modal.descripcion}</DescripcionModal>
              </CotenedorTexto>
            </TarjetaModal>
          </ContenedorModal>
        )
      ) : null}
    </>
  );
};

export default ModalContainer;
