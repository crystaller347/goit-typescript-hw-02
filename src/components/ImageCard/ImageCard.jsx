import css from './ImageCard.module.css';

export default function ImageCard({ data, open }) {
    return (
        <div className={css.imageContainer}>
            <img className={css.image} onClick={() => open(data)} src={data.urls.small} alt={data.description} />
        </div>
    )
}