import React, { Component } from "react";
import { connect } from "react-redux";
import Cart_pic from "../files/EmptyCart.svg";
import mapStateToProps from "../mapStateToProps";
import cart from "../reducers/cart";
import Cart_Overlay from "./Cart_Overlay";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openCartDropDown: false,
    };
  }

  render() {
    const show_Cart_Overlay = () => {
      if (window.location.pathname !== "/cart") {
        this.setState({ openCartDropDown: !this.state.openCartDropDown });
      }
    };

    return (
      <div className="header__cart">
        <div>
          <img
            src={Cart_pic}
            alt="Cart"
            onClick={() => show_Cart_Overlay()}
            style={{
              cursor:
                window.location.pathname !== "/cart" ? "pointer" : "unset",
            }}
          />
          {(this.props.cart.length > 0 && window.location.pathname !== "/cart") && (
            <h5
              onClick={() => show_Cart_Overlay()}
              style={{
                cursor:
                  window.location.pathname !== "/cart" ? "pointer" : "unset",
              }}
            >
              {this.props.cart.length}
            </h5>
          )}
          {this.state.openCartDropDown === true && <Cart_Overlay />}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Cart);
