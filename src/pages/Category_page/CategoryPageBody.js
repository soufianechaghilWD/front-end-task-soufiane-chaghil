import { Query } from "@apollo/client/react/components";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import mapStateToProps from "../../mapStateToProps";
import "../../styles/Category_page_body.css";
import CircleIcon from "../../files/CircleIcon.svg";
import { get_products_in_category } from "../../gqlQueries";

class Category_page_body extends Component {
  render() {
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
      <div className="category_page">
        <h1>{this.props.header_active_item.toUpperCase()}</h1>
        <div className="category_page_products">
          <Query
            query={get_products_in_category(this.props.header_active_item)}
          >
            {({ loading, data }) => {
              if (loading === true) {
                return <h1>Loading</h1>;
              }
              return (
                <div className="category_page_product__container">
                  {data?.category?.products?.map((ele, idx) => {
                    const { gallery, id, prices } = ele;
                    return (
                      <div className="category_page_product" key={"id" + idx}>
                        <div>
                          <Link
                            to={"/product?id=" + id}
                            className="category_page_product__Link"
                          >
                            <img src={gallery[0]} alt="" />
                          </Link>
                          <img
                            onClick={() => add_item_to_cart(ele)}
                            className="category_page_product__existsPic"
                            src={CircleIcon}
                            alt="Exists in the Cart"
                          />
                        </div>
                        <Link
                          to={"/product?id=" + id}
                          className="category_page_product__Link"
                        >
                          <p>{ele?.name}</p>
                          <h4>
                            {`${
                              this?.props?.currency?.symbol +
                              prices?.filter(
                                (x) =>
                                  x?.currency?.label ===
                                  this?.props?.currency?.label
                              )[0]?.amount
                            }`}
                          </h4>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              );
            }}
          </Query>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Category_page_body);
