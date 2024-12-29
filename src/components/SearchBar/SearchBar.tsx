import css from './SearchBar.module.css';
import toast, { Toaster } from 'react-hot-toast';
import React from 'react';

type Props = {
    onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: Props) {
    const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const searchInput = (form.elements.namedItem('search') as HTMLInputElement).value;
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