import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import mapStateToProps from "../mapStateToProps";

class Cart_Overlay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cart: this?.props?.cart,
      dispatch: this?.props?.dispatch,
      currency: this?.props?.currency
    };

    this.wrapperRef = React.createRef();
    this.setWrapperRef = this?.setWrapperRef?.bind(this);
    this.handleClickOutside = this?.handleClickOutside?.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this?.handleClickOutside);
  }

  componentWillUnmount() {
    document?.removeEventListener("mousedown", this?.handleClickOutside);
  }

  handleClickOutside(event) {
    if (
      this?.wrapperRef &&
      !this?.wrapperRef?.current?.contains(event?.target)
    ) {
      this?.props?.setOpenCartDropDown();
    }
  }

  render() {

    const {cart, dispatch, currency} = this?.state

    const get_The_Total = (cart, label) => {
      var res = 0;
      for (let i = 0; i < cart?.length; i++) {
        res +=
          cart[i]?.item?.prices?.filter(
            (ele) => ele?.currency?.label === label
          )[0]?.amount * cart[i]?.howMany;
      }
      return res.toFixed(2);
    };

    const increase_item = (item_id, atts) => {
      const data = {
        item_id: item_id,
        atts: atts,
      };
      dispatch({ type: "INCREASE_ITEM", payload: data });
      this.setState({ cart: this.props?.cart });
    };

    const decrease_item = (item_id, atts) => {
      const data = {
        item_id: item_id,
        atts: atts,
      };
      dispatch({ type: "DECREASE_ITEM", payload: data });
      this.setState({ cart: this.props?.cart });
    };

    return (
      <div className="cart__overlay">
        <div className="cart__overlay__body" ref={this?.wrapperRef}>
          <h4>
            <span>My Bag,</span> {cart.length} items
          </h4>
          <div className="cart__overlay__products">
            {cart.map((ele, idx) => (
              <div className="cart__overlay__product" key={"id" + idx}>
                <div className="cart__overlay__product__info">
                  <div className="cart__overlay__product__info__body">
                    <h3>{ele?.item?.brand}</h3>
                    <h4>{ele?.item?.name}</h4>
                    <h5>
                      {currency?.symbol +
                        ele?.item?.prices?.filter(
                          (it) =>
                            it?.currency?.label === currency?.label
                        )[0]?.amount *
                          ele?.howMany}
                    </h5>
                    <div className="cart__overlay__product__info__atts">
                      {ele?.item?.attributes?.map((singleAtr, idx) => (
                        <div key={"id" + idx}>
                          <h5>{singleAtr?.name?.toUpperCase()}</h5>
                          <div className="cart__overlay__product__info__single_att">
                            {singleAtr?.items?.map((itemAtr, idx) => {
                              if (singleAtr?.type === "swatch") {
                                return (
                                  <div
                                    key={"id" + idx}
                                    style={{
                                      background: `${itemAtr?.value}`,
                                      color: `${itemAtr?.value}`,
                                      border:
                                        ele?.atts[singleAtr?.name]?.id ===
                                        itemAtr?.id
                                          ? "3px solid black"
                                          : "1px solid #A6A6A6",
                                    }}
                                  ></div>
                                );
                              } else {
                                return (
                                  <div
                                    key={"id" + idx}
                                    className={
                                      ele?.atts[singleAtr?.name]?.id ===
                                      itemAtr?.id
                                        ? "cart__overlay__product__info__single_att__selected"
                                        : "cart__overlay__product__info__single_att__unselected"
                                    }
                                  >
                                    {itemAtr?.displayValue === "Small"
                                      ? "S"
                                      : itemAtr?.displayValue === "Medium"
                                      ? "M"
                                      : itemAtr?.displayValue === "Large"
                                      ? "L"
                                      : itemAtr?.displayValue === "Extra Large"
                                      ? "XL"
                                      : itemAtr?.displayValue}
                                  </div>
                                );
                              }
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="cart__overlay__product__info__howMany">
                    <div
                      onClick={() => increase_item(ele?.item?.id, ele?.atts)}
                      className="img_pointer"
                    >
                      <p>+</p>
                    </div>
                    <div>
                      <p className="cart__overlay__product__info__howMany__p__no__border">
                        {ele?.howMany}
                      </p>
                    </div>
                    <div
                      onClick={() => decrease_item(ele?.item?.id, ele?.atts)}
                      className="img_pointer"
                    >
                      <p>-</p>
                    </div>
                  </div>
                </div>
                <div className="cart__overlay__product__pic">
                  <img src={ele?.item?.gallery[0]} alt="cart_overlay" />
                </div>
              </div>
            ))}
          </div>
          <div className="cart__total">
            <h5>Total</h5>
            <p>
              {currency?.symbol +
                get_The_Total(cart, currency.label)}
            </p>
          </div>
          <div className="cart__btn">
            <Link to="/cart" style={{ textDecoration: "none" }}>
              <p className="cart__btn__bag">VIEW BAG</p>
            </Link>
            <button className="cart__btn__checkout">CHECK OUT</button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Cart_Overlay);
