import React, { Component } from "react";
import { connect } from "react-redux";
import mapStateToProps from "../../mapStateToProps";
import { Link } from "react-router-dom";
import CircleIcon from "../../files/CircleIcon.svg";

class CategoryPageProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoverInside: false,
    };
  }

  render() {
    const { gallery, id, prices, name } = this.props.ele;

    const setAttrs = (atts) => {
      var obj = {};
      for (let i = 0; i < atts.length; i++) {
        obj[atts[i]?.name] = atts[i]?.items[0];
      }
      return obj;
    };

    const add_item_to_cart = (item) => {
      const data = {
        item: item,
        atts: setAttrs(item?.attributes),
        howMany: 1,
      };
      this.props.dispatch({
        type: "ADD_ITEM",
        payload: data,
      });
    };

    return (
      <div
        className="category_page_product"
        onMouseEnter={() => this.setState({ hoverInside: true })}
        onMouseLeave={() => this.setState({ hoverInside: false })}
      >
        <div>
          <Link
            to={"/product?id=" + id}
            className="category_page_product__Link"
          >
            <img src={gallery[0]} alt="" />
          </Link>
          {this.state?.hoverInside === true && (
            <img
              onClick={() => add_item_to_cart(this?.props?.ele)}
              className="category_page_product__existsPic"
              src={CircleIcon}
              alt="Exists in the Cart"
            />
          )}
        </div>
        <Link to={"/product?id=" + id} className="category_page_product__Link">
          <p>{name}</p>
          <h4>
            {`${
              this?.props?.currency?.symbol +
              prices?.filter(
                (x) => x?.currency?.label === this?.props?.currency?.label
              )[0]?.amount
            }`}
          </h4>
        </Link>
      </div>
    );
  }
}

export default connect(mapStateToProps)(CategoryPageProduct);
