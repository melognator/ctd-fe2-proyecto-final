import { INoticiasNormalizadas } from "./types";
import { NormalModal } from "./NormalModal";
import { PremiumModal } from "./PremiumModal";

interface ModalContainerProps {
    modal: INoticiasNormalizadas | null;
    closeModal: () => void;
}

const ModalContainer = ({ modal, closeModal }: ModalContainerProps) => {
    if (!modal) return null;

    return modal.esPremium ? (
        <PremiumModal closeModal={closeModal} />
    ) : (
        <NormalModal closeModal={closeModal} modal={modal} />
    );
};

export default ModalContainer;
