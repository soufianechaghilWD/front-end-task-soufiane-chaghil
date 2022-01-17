import React, { Component } from "react";

export default class Product_Imgs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shownImgIdx: 0,
    };
  }

  render() {
    const goLeft = () => {
      if (this.state.shownImgIdx > 0) {
        this.setState({ shownImgIdx: this.state.shownImgIdx - 1 });
      } else {
        this.setState({ shownImgIdx: this?.props?.imgs?.length - 1 });
      }
    };

    const goRight = () => {
      if (this.state?.shownImgIdx < this.props.imgs?.length - 1) {
        this.setState({ shownImgIdx: this.state.shownImgIdx + 1 });
      } else {
        this.setState({ shownImgIdx: 0 });
      }
    };

    return (
      <div className="cart__product__imgs__slider">
        <div className="cart__product__imgs__slider__left">
          <p onClick={() => goLeft()}>{"<"}</p>
        </div>
        <img
          src={this.props.imgs[this.state.shownImgIdx]}
          alt="shown_img_cart_product_slider"
        />
        <div className="cart__product__imgs__slider__right">
          <p onClick={() => goRight()}>{">"}</p>
        </div>
      </div>
    );
  }
}
