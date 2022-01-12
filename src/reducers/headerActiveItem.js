const header_active_item = (state = "all", action) => {
  switch (action.type) {
    case "SET_HEADER_ACTIVE_ITEM":
      return action.payload;
    default:
      return state;
  }
};

export default header_active_item;
