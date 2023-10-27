import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Image, ImageItem } from './ImageGalleryItem.styled';

import { Modal } from 'components/Modal/Modal';
const modalPortal = document.querySelector('#modal-root');

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };
  toggleModal = ()=>{
    this.setState((state)=>({isModalOpen:!state.isModalOpen }))
  }


  render() {
    const { oneData } = this.props;
    return (
      <>
        <ImageItem
          onClick={this.toggleModal}
        >
          <Image src={oneData.webformatURL} alt={oneData.tags} />
        </ImageItem>
        {this.state.isModalOpen &&
          createPortal(
            <Modal src={oneData.largeImageURL} alt={oneData.tags} closeModal={this.toggleModal}/>,
            modalPortal
          )}
      </>
    );
  }
}
