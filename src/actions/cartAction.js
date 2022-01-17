const add_item = (item) => {
  return {
    type: "ADD_ITEM",
    payload: item,
  };
};

const increase_item = (item_id) => {
  return {
    type: "INCREASE_ITEM",
    payload: item_id,
  };
};

const decrease_item = (item_id) => {
  return {
    type: "DECREASE_ITEM",
    payload: item_id,
  };
};

export default { add_item, increase_item, decrease_item };
