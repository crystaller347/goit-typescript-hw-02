import css from './ImageGallery.module.css';
import ImageCard from '../ImageCard/ImageCard.tsx';
import { type Image } from '../../types.ts';

type Props = {
    items: Image[];
    open: (image: Image) => void;
}

export default function ImageGallery({ items, open }: Props) {
    return (
        <ul className={css.gallery}>
            {items.map((item) => (
                <li key={item.id}>
                    <ImageCard data={item} open={open} />
                </li>
            ))}
        </ul>
    )
}