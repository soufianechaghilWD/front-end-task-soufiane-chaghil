import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import mapStateToProps from "../mapStateToProps";

class Cart_Overlay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cart: this?.props?.cart,
    };
  }

  render() {
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

    const increase_item = (item_id) => {
      this.props?.dispatch({ type: "INCREASE_ITEM", payload: item_id });
      this.setState({ cart: this.props?.cart });
    };

    const decrease_item = (item_id) => {
      this.props?.dispatch({ type: "DECREASE_ITEM", payload: item_id });
      this.setState({ cart: this.props?.cart });
    };

    return (
      <div className="cart__overlay">
        <div className="cart__overlay__body">
          <h4>
            <span>My Bag,</span> {this.state.cart.length} items
          </h4>
          <div className="cart__overlay__products">
            {this.state.cart.map((ele, idx) => (
              <div className="cart__overlay__product" key={"id" + idx}>
                <div className="cart__overlay__product__info">
                  <div className="cart__overlay__product__info__body">
                    <h3>{ele?.item?.brand}</h3>
                    <h4>{ele?.item?.name}</h4>
                    <h5>
                      {this.props?.currency?.symbol +
                        ele?.item?.prices?.filter(
                          (it) =>
                            it?.currency?.label === this.props?.currency?.label
                        )[0]?.amount *
                          ele?.howMany}
                    </h5>
                    <div className="cart__overlay__product__info__atts">
                      {ele?.item?.attributes?.map((singleAtr, idx) => (
                        <div
                          className="cart__overlay__product__info__single_att"
                          key={"id" + idx}
                        >
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
                                  style={{
                                    background:
                                      ele?.atts[singleAtr?.name]?.id ===
                                      itemAtr?.id
                                        ? "white"
                                        : "#A6A6A633",
                                    color:
                                      ele?.atts[singleAtr?.name]?.id ===
                                      itemAtr?.id
                                        ? "black"
                                        : "#A6A6A6",
                                    border:
                                      ele?.atts[singleAtr?.name]?.id ===
                                      itemAtr?.id
                                        ? "1px solid #1D1F22"
                                        : "1px solid #A6A6A6",
                                    fontSize: "12px",
                                  }}
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
                      ))}
                    </div>
                  </div>
                  <div className="cart__overlay__product__info__howMany">
                    <div
                      onClick={() => increase_item(ele?.item?.id)}
                      style={{ cursor: "pointer" }}
                    >
                      <p>+</p>
                    </div>
                    <div>
                      <p style={{ border: "none" }}>{ele?.howMany}</p>
                    </div>
                    <div
                      onClick={() => decrease_item(ele?.item?.id)}
                      style={{ cursor: "pointer" }}
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
              {this?.props?.currency?.symbol +
                get_The_Total(this.state.cart, this.props.currency.label)}
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
