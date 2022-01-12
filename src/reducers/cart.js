const add_item_fun = (state, new_item) => {
  for (let i = 0; i < state?.length; i++) {
    if (
      state[i]?.item?.id === new_item?.item?.id &&
      JSON?.stringify(state?.[i]?.atts) === JSON?.stringify(new_item?.atts)
    ) {
      state[i].howMany = state[i].howMany + 1;
      return state;
    }
  }

  return [...state, new_item];
};

const increase_item = (state, { item_id, atts }) => {
  for (let i = 0; i < state?.length; i++) {
    if (
      state[i].item.id === item_id &&
      JSON?.stringify(state?.[i]?.atts) === JSON?.stringify(atts)
    ) {
      state[i].howMany = state[i].howMany + 1;
      return state;
    }
  }
  return state;
};

const decrease_item = (state, { item_id, atts }) => {
  for (let i = 0; i < state?.length; i++) {
    if (
      state[i].item.id === item_id &&
      JSON?.stringify(state?.[i]?.atts) === JSON?.stringify(atts)
    ) {
      if (state[i].howMany > 1) state[i].howMany = state[i].howMany - 1;
      else state?.splice(i, 1);
      return state;
    }
  }
  return state;
};

const remove_item = (state, item_id) => {
  for (let i = 0; i < state?.length; i++) {
    if (state[i].item.id === item_id) {
      state?.splice(i, 1);
      return state;
    }
  }
  return state;
};

const cart = (state = [], action) => {
  switch (action.type) {
    case "INCREASE_ITEM":
      return increase_item(state, action.payload);
    case "DECREASE_ITEM":
      return decrease_item(state, action.payload);
    case "ADD_ITEM":
      return add_item_fun(state, action.payload);
    case "REMOVE_ITEM":
      return remove_item(state, action.payload);
    default:
      return state;
  }
};

export default cart;
