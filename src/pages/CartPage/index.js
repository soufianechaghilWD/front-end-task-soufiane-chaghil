import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../../components/Header";
import mapStateToProps from "../../mapStateToProps";
import "../../styles/Cart.css";
import Product_Imgs from "./ProductImgs";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: this.props.cart,
    };
  }

  render() {
    const increase_item = (item_id, atts) => {
      const data = {
        item_id: item_id,
        atts: atts,
      };
      this.props.dispatch({ type: "INCREASE_ITEM", payload: data });
      this.setState({ cart: this.props?.cart });
    };

    const decrease_item = (item_id, atts) => {
      const data = {
        item_id: item_id,
        atts: atts,
      };
      this.props.dispatch({ type: "DECREASE_ITEM", payload: data });
      this.setState({ cart: this.props?.cart });
    };

    return (
      <div>
        <Header />
        <div className="cart__body">
          <h1>CART</h1>
          <div className="cart__wraper">
            {this.state?.cart?.map((ele, idx) => {
              const { item, atts, howMany } = ele;
              const { brand, name, prices, attributes, gallery, id } = item;

              return (
                <div className="cart__product" key={"id" + idx}>
                  <div className="cart__product__info">
                    <div className="cart__product__info__body">
                      <h2>{brand}</h2>
                      <h3>{name}</h3>
                      <h4>
                        {this.props.currency?.symbol +
                          prices?.filter(
                            (it) =>
                              it?.currency?.label ===
                              this.props?.currency?.label
                          )[0]?.amount *
                            howMany}
                      </h4>
                      <div className="cart__product__info__atts">
                        {attributes?.map((singleAtr, idx) => {
                          const { items, type, name } = singleAtr;
                          return (
                            <div
                              className="cart__product__info__single_att"
                              key={"id" + idx}
                            >
                              {items?.map((itemAtr, idx) => {
                                const { value, id, displayValue } = itemAtr;
                                if (type === "swatch") {
                                  return (
                                    <div
                                      key={"id" + idx}
                                      style={{
                                        background: `${value}`,
                                        color: `${value}`,
                                        border:
                                          atts[name]?.id === id
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
                                        atts[name]?.id === id
                                          ? "cart__product__info__single_att__selected"
                                          : "cart__product__info__single_att__unselected"
                                      }
                                    >
                                      {displayValue === "Small"
                                        ? "S"
                                        : displayValue === "Medium"
                                        ? "M"
                                        : displayValue === "Large"
                                        ? "L"
                                        : displayValue === "Extra Large"
                                        ? "XL"
                                        : displayValue}
                                    </div>
                                  );
                                }
                              })}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="cart__product__info__howMany">
                      <div
                        onClick={() => increase_item(id, atts)}
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
                        onClick={() => decrease_item(id, atts)}
                        className="img_pointer"
                      >
                        <p>-</p>
                      </div>
                    </div>
                  </div>
                  <div className="cart__product_pics">
                    <Product_Imgs imgs={gallery} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Index);
