import css from './LoadMoreBtn.module.css';

type Props = {
    loadMore: () => void;
}

export default function LoadMoreBtn({ loadMore }: Props) {
    return (
        <button className={css.button} onClick={loadMore}>Load more</button>
    )
}