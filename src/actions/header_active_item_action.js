const set_active_item = (active_item) => {
  return {
    type: "SET_HEADER_ACTIVE_ITEM",
    payload: active_item,
  };
};

export default { set_active_item };
