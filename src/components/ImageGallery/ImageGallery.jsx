import css from './ImageGallery.module.css';
import ImageCard from '../ImageCard/ImageCard.jsx';

export default function ImageGallery({ items, open }) {
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