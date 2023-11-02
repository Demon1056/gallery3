import { useEffect, useState } from 'react';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Box } from './App.styled';
import { Searchbar } from './SearchBar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ButtonLoadMore } from './Button/Button';
import { Loader } from './Loader';

import { findImages } from '../servise/api';

export const App = () => {
  const [findValue, setFindValue] = useState('');
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const makeStatesData = res =>
    res.map(({ id, webformatURL, tags, largeImageURL }) => {
      return {
        id,
        webformatURL,
        tags,
        largeImageURL,
      };
    });

  const handlerSubmit = query => {
    if (!query) {
      setImages([]);
      setCurrentPage(1);
      return Notify.failure(`Sorry, but you didn't enter value!!!`);
    }

    if (query !== findValue) {
      setFindValue(query);
      setImages([]);
      setCurrentPage(1);
    }
  };

  const handlerClick = () => {
    setCurrentPage(currentPage => currentPage + 1);
  };

  useEffect(() => {
    if (!findValue) {
      return;
    }
    const getImages = async () => {
      try {
        setIsLoading(isLoading => !isLoading);
        
        const {totalHits, hits} = await findImages({
          q: findValue,
          page: currentPage,
        });
        
        if (totalHits === 0) {
          return Notify.failure(
            `Sorry, but we didn't find any images. Try to enter another value!!!`
          );
        }
        if (currentPage === 1) {
          setTotalPages(Math.round(totalHits / 12));
          Notify.info(`Congratulations, we found ${totalHits} images`);
        }
        setImages(images => [...images, ...makeStatesData(hits)]);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(isLoading => !isLoading);
      }
    };
    
    getImages();
  }, [currentPage, findValue]);

  useEffect(() => {
    if (currentPage === totalPages) {
      Notify.warning(`it is the last page`);
    }
  }, [currentPage, totalPages]);

  const imagesNumbers = images.length;

  return (
    <Box>
      <Searchbar submitForm={handlerSubmit} />
      {imagesNumbers > 0 && <ImageGallery data={images} />}
      {isLoading && Loader}
      {imagesNumbers > 0 && !isLoading && currentPage !== totalPages && (
        <ButtonLoadMore handlerClick={handlerClick} />
      )}
    </Box>
  );
};
