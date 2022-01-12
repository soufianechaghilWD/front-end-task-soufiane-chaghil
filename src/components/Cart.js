import React, { Component } from "react";
import { connect } from "react-redux";
import Cart_pic from "../files/EmptyCart.svg";
import mapStateToProps from "../mapStateToProps";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: this?.props?.cart,
      setOpenCartDropDown: this?.props?.setOpenCartDropDown
    };
  }

  render() {

    const show_Cart_Overlay = () => {
      if (window.location.pathname !== "/cart") {
        this.state.setOpenCartDropDown();
      }
    };

    return (
      <div className="header__cart">
        <div>
          <img
            src={Cart_pic}
            alt="Cart"
            onClick={() => show_Cart_Overlay()}
            className={
              window.location.pathname !== "/cart"
                ? "img_pointer"
                : "image_unset"
            }
          />
          {this.props.cart.length > 0 && window.location.pathname !== "/cart" && (
            <h5
              onClick={() => show_Cart_Overlay()}
              className={
                window.location.pathname !== "/cart"
                  ? "img_pointer"
                  : "image_unset"
              }
            >
              {this.props?.cart.length}
            </h5>
          )}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Cart);
