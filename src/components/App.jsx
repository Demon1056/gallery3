import { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Box } from './App.styled';
import { Searchbar } from './SearchBar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ButtonLoadMore } from './Button/Button';
import { findImages } from '../servise/api';
import { Loader } from './Loader';

export class App extends Component {
  state = {
    findValue: '',
    images: [],
    currentPage: 1,
    totalPages: 0,
    isLoading: false,
  };
  makeStatesData = res =>
    res.map(({ id, webformatURL, tags, largeImageURL }) => {
      return {
        id,
        webformatURL,
        tags,
        largeImageURL,
      };
    });

  handlerSubmit = query => {
    if (!query) {
      this.setState({ images: [], currentPage: 1 });
      return Notify.failure(`Sorry, but you didn't enter value!!!`);
    }
    if (query !== this.state.findValue) {
      this.setState({ findValue: query, images: [], currentPage: 1 });
    }
  };

  toggleIsLoading = () => {
    this.setState(state => ({ isLoading: !state.isLoading }));
  };

  handlerClick = () => {
    this.setState(state => ({ currentPage: state.currentPage + 1 }));
  };

  componentDidUpdate = async (___, prevState) => {
    const { state, toggleIsLoading, makeStatesData } = this;
    const { findValue, currentPage, totalPages } = state;

    if (
      prevState.findValue === findValue &&
      prevState.currentPage === currentPage
    ) {
      return;
    }

    try {
      toggleIsLoading();
      const { hits, totalHits } = await findImages({
        q: findValue,
        page: currentPage,
      });

      if (totalHits === 0) {
        return Notify.failure(
          `Sorry, but we didn't find any images. Try to enter another value!!!`
        );
      }
      if (currentPage === 1) {
        this.setState({ totalPages: Math.round(totalHits / 12) });
        Notify.info(`Congratulations, we found ${totalHits} images`);
      }
      if (currentPage === totalPages) {
        Notify.warning(`it is the last page`);
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...makeStatesData(hits)],
      }));
    } catch (err) {
      console.log(err);
    } finally {
      toggleIsLoading();
    }
  };

  render() {
    const { handlerSubmit, handlerClick } = this;
    const { images, isLoading, currentPage, totalPages } = this.state;
    const imagesNumbers = images.length

    return (
      <Box>
        <Searchbar submitForm={handlerSubmit} />
        {imagesNumbers> 0 && <ImageGallery data={images} />}
        {isLoading && Loader}
        {imagesNumbers> 0 && !isLoading && currentPage !== totalPages && (
          <ButtonLoadMore handlerClick={handlerClick} />
        )}
      </Box>
    );
  }
}
