const add_item_fun = (state, new_item) => {
    return [...state, new_item]
}

const remove_item_fun = (state, item_to_remove) => {
    
    for (let i = 0; i < state.length; i++){
        if(state[i].id === item_to_remove){
            state.splice(i, 1)
            return state
        }
    }
    return state
}

const cart = (state = [], action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return add_item_fun(state, action.payload);
    case "REMOVE_ITEM":
      return remove_item_fun(state, action.payload);
    default:
      return state;
  }
};

export default cart;
