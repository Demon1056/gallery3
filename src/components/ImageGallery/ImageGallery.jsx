import { GaleryContainer } from './ImageGallery.styled';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
export const ImageGallery = ({ data }) => {
  return (
    <GaleryContainer>
      {data.map(item => (
        <ImageGalleryItem oneData={item} key={item.id}/>
      ))}
    </GaleryContainer>
  );
};
