import {  useContext } from 'react';
import { imagesContext } from 'components/contexts';

import { LoadMore } from './Button.styled';


export const ButtonLoadMore = ({ handlerClick }) => {
  const cnt = useContext(imagesContext)
  console.log(cnt.contextQuery);
  return (
    <LoadMore onClick={handlerClick} type="button">
      {' '}
    {cnt.contextQuery}
    </LoadMore>
  );
};
