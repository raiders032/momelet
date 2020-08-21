import React from "react";
import GameResultPresenter from "./GameResultPresenter";
export default ({ navigation, route }) => {
  const msg = JSON.parse(route.params.msg);

  const resultId = msg.roomGameResult.id;
  const result = route.params.restaurant.filter(
    (restaurant) => restaurant.id == resultId
  );
  const onClick = () => {
    navigation.navigate("Main");
  };
  return (
    <GameResultPresenter
      result={result[0]}
      total={msg.roomGameResult.headCount}
      selected={msg.roomGameResult.likeCount}
      onClick={onClick}
    />
  );
};
