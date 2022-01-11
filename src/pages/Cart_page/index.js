import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../../components/Header";
import mapStateToProps from "../../mapStateToProps";
import "../../styles/Cart.css";
import Product_Imgs from "./Product_Imgs";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: this.props.cart,
    };
  }

  render() {
    const increase_item = (item_id) => {
      this.props?.dispatch({ type: "INCREASE_ITEM", payload: item_id });
      this.setState({ cart: this.props?.cart });
    };

    const decrease_item = (item_id) => {
      this.props?.dispatch({ type: "DECREASE_ITEM", payload: item_id });
      this.setState({ cart: this.props?.cart });
    };

    return (
      <div>
        <Header />
        <div className="cart__body">
          <h1>CART</h1>
          <div className="cart__wraper">
            {this.state?.cart?.map((ele, idx) => (
              <div className="cart__product" key={"id" + idx}>
                <div className="cart__product__info">
                  <div className="cart__product__info__body">
                    <h2>{ele?.item?.brand}</h2>
                    <h3>{ele?.item?.name}</h3>
                    <h4>
                      {this.props?.currency?.symbol +
                        ele?.item?.prices?.filter(
                          (it) =>
                            it?.currency?.label === this.props?.currency?.label
                        )[0]?.amount *
                          ele?.howMany}
                    </h4>
                    <div className="cart__product__info__atts">
                      {ele?.item?.attributes?.map((singleAtr, idx) => (
                        <div
                          className="cart__product__info__single_att"
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
                  <div className="cart__product__info__howMany">
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
                <div className="cart__product_pics">
                  <Product_Imgs imgs={ele?.item?.gallery} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Index);
