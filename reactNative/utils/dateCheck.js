const dateCheck = (dueDate) => {
  const nowDate = new Date();
  const dueDateReform = new Date(dueDate);
  // console.log("dueDateReform: ", dueDateReform);
  // const dueDateReform = new Date("2020/09/20 17:23:16");

  if (dueDateReform - nowDate > 0) {
    return true;
  } else {
    return false;
  }
};

export default dateCheck;
