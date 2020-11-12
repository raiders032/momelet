const baseUrl = 'https://cdn.pixabay.com/photo/2020/06/29/10/55/pizza-5352320__480.png';

const imageResize = (thumUrl) => {
  if (thumUrl == baseUrl) return baseUrl;
  else
    return (
      'https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&quality=90&src=' +
      thumUrl
    );
};

export default imageResize;
