const add_item = (item) => {
    return {
        type: "ADD_ITEM",
        payload: item
    }
}

const remove_item = (item) => {
    return {
        type: "REMOVE_ITEM",
        payload: item
    }
}

export default {add_item, remove_item}