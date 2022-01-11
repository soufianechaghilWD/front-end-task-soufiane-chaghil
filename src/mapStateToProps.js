export default function mapStateToProps(state) {
  const cart = state.cart;
  const currency = state.currency;
  const header_active_item = state.header_active_item;

  return {
    cart,
    currency,
    header_active_item,
  };
}
