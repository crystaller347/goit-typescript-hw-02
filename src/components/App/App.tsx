import { useState, useEffect } from 'react';
import { fetchImages } from '../../images-api.ts';
import SearchBar from '../SearchBar/SearchBar.tsx';
import Loader from '../Loader/Loader.tsx';
import ErrorMessage from '../ErrorMessage/ErrorMessage.tsx';
import ImageGallery from '../ImageGallery/ImageGallery.tsx';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn.tsx';
import ImageModal from '../ImageModal/ImageModal.tsx';
import { type Image, type FetchImages } from '../../types.ts';

export default function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");
  const [modal, setModal] = useState<boolean>(false);
  const [image, setImage] = useState<Image | null>(null);

  const handleSubmit = (query: string): void => {
    setQuery(query);
    setPage(1);
    setImages([]);
  }

  useEffect(() => {
    if (!query) {
      return;
    }
    const asyncWrapper = async () => {
      try {
        setError(false);
        setLoading(true);
        const data = await fetchImages(query, page);
        setImages((prevImages) => [...prevImages, ...data.results]);
        setTotalPages(data.total_pages);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    asyncWrapper();
  }, [query, page]);

  const handleLoad = (): void => {
    setPage(prevPage => prevPage + 1);
  }

  const openModal = (image: Image): void => {
    setImage(image);
    setModal(true);
  }

  const closeModal = (): void => {
    setImage(null);
    setModal(false);
  }

  useEffect(() => {
    modal ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'scroll';
  }, [modal]);

  return (
    <div>
      <SearchBar onSubmit={handleSubmit} />
      {error && <ErrorMessage />}
      {images.length > 0 && <ImageGallery items={images} open={openModal} />}
      {loading && <Loader />}
      {images.length > 0 && page < totalPages && !loading && <LoadMoreBtn loadMore={handleLoad} />}
      <ImageModal isOpen={modal} image={image} close={closeModal} />
    </div>
  )
}
