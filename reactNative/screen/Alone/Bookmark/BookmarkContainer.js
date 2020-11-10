import React, { useContext, useEffect, useRef } from 'react';

import { apis } from '../../../api';
import { Context } from '../../../store';
import BookmarkPresenter from './BookmarkPresenter';

export default ({ navigation }) => {
  const { state } = useContext(Context);
  const BookmarkRestaurant = useRef(async () => {
    const result = await apis.getBookmark();

    console.log('result: ', result);

    return result.data.data.contents;
  });
  const onClickEditProfileButton = () => {
    navigation.navigate('Mypage');
  };

  return (
    <BookmarkPresenter
      BookmarkRestaurant={BookmarkRestaurant}
      user={state.user}
      onClickEditProfileButton={onClickEditProfileButton}
    />
  );
};
