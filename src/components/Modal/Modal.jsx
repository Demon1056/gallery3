import { useEffect } from 'react';

import { ModalDiv, Overlay } from './Modal.styled';

export const modalPortal = document.querySelector('#modal-root');

export const Modal = ({ src, alt, closeModal }) => {
  const clickCloseModal = e => {
    if (e.target.nodeName === 'DIV') {
      closeModal();
    }
  };

  useEffect(() => {
    const escCloseModal = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', escCloseModal);
    return () => window.removeEventListener('keydown', escCloseModal);
  }, [closeModal]);

  return (
    <Overlay onClick={clickCloseModal}>
      <ModalDiv>
        <img src={src} alt={alt} />
      </ModalDiv>
    </Overlay>
  );
};
