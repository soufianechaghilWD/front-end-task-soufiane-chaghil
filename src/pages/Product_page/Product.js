import React, { Component } from "react";
import { connect } from "react-redux";
import mapStateToProps from "../../mapStateToProps";

const setAttrs = (atts) => {
  var obj = {};
  for (let i = 0; i < atts.length; i++) {
    obj[atts[i]?.name] = atts[i]?.items[0];
  }
  return obj;
};

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shownPic: this?.props?.product?.gallery[0],
      selectedAtts: setAttrs(this?.props?.product?.attributes),
    };
  }

  componentDidMount() {
    const ele = document.getElementById("product__desc");
    ele.innerHTML = this?.props?.product?.description;
  }

  render() {
    const setSelectedAtt = (name, item) => {
      var new_obj = Object?.assign({}, this.state?.selectedAtts);
      new_obj[name] = item;
      this.setState({ selectedAtts: new_obj });
    };

    const addToCart = () => {
      const the_added_item = {
        atts: this.state.selectedAtts,
        item: this?.props?.product,
        howMany: 1,
      };

      this?.props?.dispatch({
        type: "ADD_ITEM",
        payload: the_added_item,
      });
    };

    return (
      <div className="product">
        <div className="product__pics">
          {this?.props?.product?.gallery?.map((ele, idx) => {
            return (
              <img
                key={"id" + idx}
                src={ele}
                alt="product_pic"
                onClick={() => this.setState({ shownPic: ele })}
              />
            );
          })}
        </div>
        <div className="product__shown__pic">
          <img src={this.state?.shownPic} alt="shown_pic" />
        </div>
        <div className="product__info">
          <div>
            <h1>{this?.props?.product?.brand}</h1>
            <h2>{this?.props?.product?.name}</h2>
          </div>
          <div>
            {this?.props?.product?.attributes?.map((ele, idx) => (
              <div key={"id" + idx} className="product__atribut">
                <h3>{ele?.name?.toUpperCase()}:</h3>
                <div className="product__atribut__wraper">
                  {ele?.items?.map((item, id) => {
                    if (ele?.type === "swatch") {
                      return (
                        <div
                          onClick={() => setSelectedAtt(ele?.name, item)}
                          key={"id" + id}
                          style={{
                            background: `${item?.value}`,
                            color: `${item?.value}`,
                            border:
                              this?.state?.selectedAtts[ele?.name]?.id ===
                              item?.id
                                ? "3px solid black"
                                : "1px solid #A6A6A6",
                          }}
                        >
                          {item?.displayValue}
                        </div>
                      );
                    } else {
                      return (
                        <div
                          onClick={() => setSelectedAtt(ele?.name, item)}
                          key={"id" + id}
                          className={
                            this?.state?.selectedAtts[ele?.name]?.id ===
                            item?.id
                              ? "product__atribut__wraper__selected"
                              : "product__atribut__wraper__unselected"
                          }
                        >
                          {item?.displayValue}
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            ))}
          </div>
          <div>
            <h3>PRICE:</h3>
            <h3>
              {this.props?.currency?.symbol +
                this?.props?.product?.prices?.filter(
                  (ele) => ele?.currency?.label === this.props?.currency?.label
                )[0]?.amount}
            </h3>
          </div>
          <button
            onClick={addToCart}
          >
            ADD TO CART
          </button>
          <div id="product__desc"></div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Product);
