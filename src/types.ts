export type Image = {
    id: string;
    urls: {small: string, regular: string};
    likes: number;
    description?: string;
}

export type FetchImages = {
    results: Image[];
    total: number;
    total_pages: number;
}