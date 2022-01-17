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

    const { gallery, brand, name, attributes, description, prices } =
      this?.props?.product;

    return (
      <div className="product">
        <div className="product__pics">
          {gallery?.map((ele, idx) => {
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
            <h1>{brand}</h1>
            <h2>{name}</h2>
          </div>
          <div>
            {attributes?.map((ele, idx) => {
              const { name, items, type } = ele;
              return (
                <div key={"id" + idx} className="product__atribut">
                  <h3>{name?.toUpperCase()}:</h3>
                  <div className="product__atribut__wraper">
                    {items?.map((item, id) => {
                      const { value, Atid, displayValue } = item;
                      if (type === "swatch") {
                        return (
                          <div
                            onClick={() => setSelectedAtt(name, item)}
                            key={"id" + id}
                            style={{
                              background: `${value}`,
                              color: `${value}`,
                              border:
                                this?.state?.selectedAtts[name]?.id === Atid
                                  ? "3px solid black"
                                  : "1px solid #A6A6A6",
                            }}
                          >
                            {displayValue}
                          </div>
                        );
                      } else {
                        return (
                          <div
                            onClick={() => setSelectedAtt(name, item)}
                            key={"id" + id}
                            className={
                              this?.state?.selectedAtts[name]?.id === Atid
                                ? "product__atribut__wraper__selected"
                                : "product__atribut__wraper__unselected"
                            }
                          >
                            {displayValue}
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          <div>
            <h3>PRICE:</h3>
            <h3>
              {this.props?.currency?.symbol +
                prices?.filter(
                  (ele) => ele?.currency?.label === this.props?.currency?.label
                )[0]?.amount}
            </h3>
          </div>
          <button onClick={addToCart}>ADD TO CART</button>
          <div dangerouslySetInnerHTML={{ __html: description }}></div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Product);
