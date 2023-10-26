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

  componentDidUpdate = async (___, prevState) => {
    if (
      prevState.findValue === this.state.findValue &&
      prevState.currentPage === this.state.currentPage
    ) {
      return;
    }
    if (prevState.findValue !== this.state.findValue) {
      this.resetDataAndCurrentPage();
    }
    try {
      this.toggleIsLoading();
      const res = await findImages({
        q: this.state.findValue,
        page: this.state.currentPage,
      });
      if (res.totalHits === 0) {
        return Notify.failure(
          `Sorry, but we didn't find any images. Try to enter another value!!!`
        );
      }
      if (this.state.currentPage === 1) {
        this.setState({ totalPages: Math.round(res.totalHits / 12) });
        Notify.info(`Congratulations, we found ${res.totalHits} images`);
      }
      if (this.state.currentPage === this.state.totalPages) {
        Notify.warning(`it is the last page`);
      }
      this.setState(state => ({ images: [...state.images, ...res.hits] }));
    } catch (err) {
      console.log(err);
    } finally {
      this.toggleIsLoading();
    }
  };

  handlerSubmit = query => {
    if (!query) {
      return Notify.failure(`Sorry, but you didn't enter value!!!`);
    }
    this.setState({ findValue: query });
  };

  toggleIsLoading = () => {
    this.setState(state => ({ isLoading: !state.isLoading }));
  };
  handlerClick = () => {
    this.setState(state => ({ currentPage: state.currentPage + 1 }));
  };
  resetDataAndCurrentPage = () => {
    this.setState({ currentPage: 1, images: [] });
  };
  render() {
    return (
      <Box>
        <Searchbar submitForm={this.handlerSubmit} />
        {this.state.images.length > 0 && (
          <ImageGallery data={this.state.images} />
        )}
        {this.state.isLoading && Loader}
        {this.state.images.length > 0 &&
          !this.state.isLoading &&
          this.state.currentPage !== this.state.totalPages && (
            <ButtonLoadMore handlerClick={this.handlerClick} />
          )}
      </Box>
    );
  }
}
