import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import mapStateToProps from "../../mapStateToProps";
import '../../styles/Category_page_body.css'


class Category_page_body extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const get_products_in_category = gql`
      query {
        category(input: { title: "${this.props.header_active_item}" }) {
          name
          products {
            id
            name
            gallery
            prices {
              currency {
                label
                symbol
              }
              amount
            }
          }
        }
      }
    `;

    return (
      <div className="category_page">
        <h1>{this.props.header_active_item.toUpperCase()}</h1>
        <div className="category_page_products">
            <Query query={get_products_in_category}>
                {({loading, data}) => {
                    if (loading === true){
                        return <h1>Loading</h1>
                    }
                    return <div className="category_page_product__container">
                        {
                            data?.category?.products?.map((ele, idx) => 
                            <Link to={"/product?id="+ele?.id} key={"id"+idx} style={{ textDecoration: 'none' }}>
                                <div className="category_page_product">
                                    <img src={ele?.gallery[0]} alt="" />
                                    <p>{ele?.name}</p>
                                    <h4>{this?.props?.currency?.symbol + ele?.prices?.filter(x => x?.currency?.label === this?.props?.currency?.label)[0]?.amount}</h4>
                                </div>
                            </Link>
                            )
                        }
                    </div>
                }}
            </Query>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Category_page_body);
