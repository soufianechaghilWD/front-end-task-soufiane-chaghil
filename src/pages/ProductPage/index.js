import { Query } from "@apollo/client/react/components";
import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../../components/Header";
import { get_product_query } from "../../gqlQueries";
import mapStateToProps from "../../mapStateToProps";
import "../../styles/Product.css";
import Product from "./Product";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product_id: null,
    };
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    this.setState({ product_id: id });
  }

  render() {
    return (
      <div>
        <Header />
        <Query query={get_product_query(this?.state?.product_id)}>
          {({ loading, data }) => {
            if (loading === true) return <h5>Loading</h5>;
            else return <Product product={data.product} />;
          }}
        </Query>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Index);
