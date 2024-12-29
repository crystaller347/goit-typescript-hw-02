import css from './SearchBar.module.css';
import toast, { Toaster } from 'react-hot-toast';

export default function SearchBar({ onSubmit }) {
    const handleSend = (e) => {
        e.preventDefault();
        const form = e.target;
        const searchInput = form.elements.search.value;
        if (!searchInput.trim()) {
            toast.error('Enter something before searching!', {
                position: "top-left"
            });
            return;
        }
        onSubmit(searchInput);
        form.reset();
    }

    return (
        <header className={css.header}>
            <form onSubmit={handleSend}>
                <input
                    className={css.input}
                    type="text"
                    name="search"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                />
                <button className={css.button} type="submit">Search</button>
            </form>
            <Toaster />
        </header>
    )
}