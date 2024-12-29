import css from './ImageCard.module.css';
import { type Image } from '../../types.ts';

type Props = {
    data: Image;
    open: (image: Image) => void;
};


export default function ImageCard({ data, open }: Props) {
    return (
        <div className={css.imageContainer}>
            <img className={css.image} onClick={() => open(data)} src={data.urls.small} alt={data.description} />
        </div>
    )
}