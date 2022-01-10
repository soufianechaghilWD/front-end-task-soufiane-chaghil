import React, { Component } from "react";
import { connect } from "react-redux";
import Cart_pic from "../files/EmptyCart.svg";
import mapStateToProps from "../mapStateToProps";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openCartDropDown: false,
    };
  }

  render() {
    return (
      <div className="header__cart">
        <div>
          <img
            src={Cart_pic}
            alt="Cart"
            onClick={() =>
              this.setState({ openCartDropDown: !this.state.openCartDropDown })
            }
          />
          {this.props.cart.length > 0 && (
            <h5
              onClick={() =>
                this.setState({
                  openCartDropDown: !this.state.openCartDropDown,
                })
              }
            >
              {this.props.cart.length}
            </h5>
          )}
          {this.state.openCartDropDown === true && (
            <div className="cart__overlay">
              <h4>My Bag, {this.props.cart.length} items</h4>
              <div>
                <h5>Total</h5>
                <p>$100.00</p>
              </div>
              <div>
                <button>VIEW BAG</button>
                <button>CHECK OUT</button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Cart);
