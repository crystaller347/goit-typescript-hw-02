import { useState, useEffect } from 'react';
import { fetchImages } from '../../images-api.js';
import SearchBar from '../SearchBar/SearchBar.jsx';
import Loader from '../Loader/Loader.jsx';
import ErrorMessage from '../ErrorMessage/ErrorMessage.jsx';
import ImageGallery from '../ImageGallery/ImageGallery.jsx';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn.jsx';
import ImageModal from '../ImageModal/ImageModal.jsx';

export default function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [modal, setModal] = useState(false);
  const [image, setImage] = useState(null);

  const handleSubmit = (query) => {
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

  const handleLoad = () => {
    setPage(prevPage => prevPage + 1);
  }

  const openModal = (image) => {
    setImage(image);
    setModal(true);
  }

  const closeModal = () => {
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
