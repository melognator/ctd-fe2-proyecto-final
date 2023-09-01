import {
    CloseButton,
    ContenedorModal,
    CotenedorTexto,
    DescripcionModal,
    ImagenModal,
    TarjetaModal,
    TituloModal
} from "./styled";
import { INoticiasNormalizadas } from "./types";
import { CloseButton as Close } from "../../assets";

interface NormalModalProps {
    closeModal: () => void;
    modal: INoticiasNormalizadas;
}
export const NormalModal = ({ closeModal, modal }: NormalModalProps) => {
    return (
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
    );
};
