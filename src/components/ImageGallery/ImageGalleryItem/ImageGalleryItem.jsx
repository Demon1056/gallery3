import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Modal, modalPortal } from 'components/Modal/Modal';
import { Image, ImageItem } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ oneData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(isModalOpen => !isModalOpen);

  const { webformatURL, tags, largeImageURL } = oneData;

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
};
