import {
    BotonSuscribir,
    CloseButton,
    ContenedorModal,
    CotenedorTexto,
    DescripcionModal,
    ImagenModal,
    TarjetaModal,
    TituloModal
} from "./styled";
import { SuscribeImage, CloseButton as Close } from "../../assets";

interface PremiumModalProps {
    closeModal: () => void;
}
export const PremiumModal = ({ closeModal }: PremiumModalProps) => {
    const handleBotonSuscribir = () => {
        setTimeout(() => {
            alert("Suscripto!");
            closeModal();
        }, 1000);
    };

    return (
        <ContenedorModal>
            <TarjetaModal>
                <CloseButton onClick={closeModal}>
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
    );
};
