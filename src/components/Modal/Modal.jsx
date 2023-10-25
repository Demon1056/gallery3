
import { ModalDiv, Overlay } from './Modal.styled';

export const Modal = ({src, alt}) => {
  return (
    <Overlay>
      <ModalDiv>
        <img src={src} alt={alt} />
      </ModalDiv>
    </Overlay>
  );
};
