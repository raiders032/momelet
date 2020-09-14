const dateCheck = (dueDate) => {
  console.log(dueDate);
  const nowDate = new Date();
  const dueDateReform = new Date(dueDate);
  // console.log("dueDateReform: ", dueDateReform);
  // const dueDateReform = new Date("2020/09/20 17:23:16");

  if (dueDateReform - nowDate > 0) {
    console.log('날짜 안지남');

    return true;
  } else {
    console.log('날짜 지남');

    return false;
  }
};

export default dateCheck;
