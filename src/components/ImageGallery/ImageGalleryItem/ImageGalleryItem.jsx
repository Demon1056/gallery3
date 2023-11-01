import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Modal, modalPortal } from 'components/Modal/Modal';
import { Image, ImageItem } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };
  toggleModal = () => {
    this.setState(state => ({ isModalOpen: !state.isModalOpen }));
  };

  render() {
    const { toggleModal } = this;
    const { webformatURL, tags, largeImageURL } = this.props.oneData;
    const { isModalOpen } = this.state;

    return (
      <>
        <ImageItem onClick={toggleModal}>
          <Image src={webformatURL} alt={tags} />
        </ImageItem>
        {isModalOpen &&
          createPortal(
            <Modal src={largeImageURL} alt={tags} closeModal={toggleModal} />,
            modalPortal
          )}
      </>
    );
  }
}
