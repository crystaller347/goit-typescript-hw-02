import css from './ImageModal.module.css';
import Modal from 'react-modal';
import { GoHeartFill } from "react-icons/go";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: "1000px",
        height: "600px",
        padding: 0,
        border: "none",
        borderRadius: "6px",
        display: "flex",
        flexDirection: "column",
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    }
};

Modal.setAppElement('#root');

export default function ImageModal({ isOpen, image, close }) {
    return (
        <Modal isOpen={isOpen}
            onRequestClose={close}
            style={customStyles}>
            <div className={css.imageContainer}>
                <img className={css.image} src={image?.urls?.regular} alt={image?.description} />
            </div>
            <div className={css.descriptionContainer}>
                <div className={css.likesSection}>
                    <GoHeartFill className={css.heartIcon} color="crimson" size={20} />
                    <span className={css.likesCount}>{image?.likes}</span>
                </div>
                {image?.description ?
                    (<p className={css.description}>
                        {image.description}</p>) :
                    (<p className={css.defaultDescription}>
                        This picture doesn't have a description yet, please contribute by adding it!</p>)}
            </div>
        </Modal>
    )
}