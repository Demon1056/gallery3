import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { GaleryContainer } from './ImageGallery.styled';

export const ImageGallery = ({ data }) => {
  return (
    <GaleryContainer>
      {data.map(item => (
        <ImageGalleryItem oneData={item} key={item.id} />
      ))}
    </GaleryContainer>
  );
};
