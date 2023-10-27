import axios from 'axios';

const KEY = '29803921-0264c7261e6b7092956a87835';
const mainAdress = `https://pixabay.com/api/`;
const params = {
  key: KEY,
  q: ' ',
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
  page: 1,
};

export const findImages = async newParams => {
  const res = await axios(mainAdress, { params: { ...params, ...newParams } });
  return res.data;
};
