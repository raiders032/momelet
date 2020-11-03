import React, { useContext } from 'react';

import { Context } from '../../../store';
import BookmarkPresenter from './BookmarkPresenter';

export default ({ navigation }) => {
  const { state } = useContext(Context);
  const onClickEditProfileButton = () => {
    navigation.navigate('Mypage');
  };

  return (
    <BookmarkPresenter user={state.user} onClickEditProfileButton={onClickEditProfileButton} />
  );
};
