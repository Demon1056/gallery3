import { LoadMore } from './Button.styled';

export const ButtonLoadMore = ({ handlerClick }) => {
  return (
    <LoadMore onClick={handlerClick} type="button">
      {' '}
      Load more
    </LoadMore>
  );
};
