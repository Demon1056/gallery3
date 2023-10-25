import { Component } from 'react';
import { Box } from './App.styled';
import { Searchbar } from './SearchBar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ButtonLoadMore } from './Button/Button';
import { findImages } from '../servise/api';

export class App extends Component {
  state = {
    findValue: '',
    images: [],
    currentPage: 1,
  };
  componentDidUpdate = async(_, prevState) => {
    try {
      const res = await findImages({q:this.state.findValue});
      if (prevState.findValue === this.state.findValue) {
        return console.log('again');;
      }
    
      this.setState((state)=>({images:[...state.images,... res.hits]}))
      console.log(res.hits);
    } catch (err) {
      console.log(err);
    }
  };

  handlerSubmit = query => {
    if (!query) {
      return console.log('You didnt input text');
    }
    this.setState({ findValue: query });
  };
  render() {
    return (
      <Box>
        <Searchbar submitForm={this.handlerSubmit} />
        {this.state.images.length > 0 && (
          <ImageGallery data={this.state.images} />
        )}
        <ButtonLoadMore />
      </Box>
    );
  }
}
