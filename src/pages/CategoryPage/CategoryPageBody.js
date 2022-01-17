import { Query } from "@apollo/client/react/components";
import React, { Component } from "react";
import { connect } from "react-redux";
import mapStateToProps from "../../mapStateToProps";
import "../../styles/CategoryPageBody.css";
import { get_products_in_category } from "../../gqlQueries";
import CategoryPageProduct from "./CategoryPageProduct";

class Category_page_body extends Component {
  render() {
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
                    return <CategoryPageProduct ele={ele} key={"id" + idx} />;
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
