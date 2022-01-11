import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
import React, { Component } from "react";
import { connect } from "react-redux";
import mapStateToProps from "../mapStateToProps";
import Logo from "../files/logo.svg";
import "../styles/Header.css";
import Currency from "./Currency";
import Cart from "./Cart";
import { Link, Navigate } from "react-router-dom";

const get_categories_query = gql`
  query {
    categories {
      name
    }
  }
`;

const get_currency_query = gql`
  query {
    currencies {
      label
      symbol
    }
  }
`;

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header_active_item: this.props.header_active_item,
      currency: this.props.currency,
      redirect_sts: false,
    };
  }

  componentDidUpdate() {
    if (this.state.redirect_sts === true) {
      this.setState({ redirect_sts: false });
    }
  }

  render() {
    const setHeaderActiveItem = (new_header_item) => {
      this.props.dispatch({
        type: "SET_HEADER_ACTIVE_ITEM",
        payload: new_header_item,
      });
      this.setState({ header_active_item: new_header_item });
      if (window.location.pathname !== "/") {
        this.setState({ redirect_sts: true });
      }
    };

    if (this.state.redirect_sts === true) {
      return <Navigate to="/" />;
    }

    return (
      <div className="header">
        <div className="header__container">
          <Query query={get_categories_query}>
            {({ loading, data }) => {
              return (
                <ul>
                  {data?.categories?.map((ele, idx) => (
                    <li
                      onClick={() => setHeaderActiveItem(ele?.name)}
                      className={`header_item ${
                        ele?.name === this?.state?.header_active_item
                          ? "active_header_item"
                          : ""
                      }`}
                      id={ele?.name}
                      key={"id" + idx}
                    >
                      {ele?.name?.toUpperCase()}
                    </li>
                  ))}
                </ul>
              );
            }}
          </Query>
          <div className="header__logo">
            <Link to="/">
              <img src={Logo} alt="Logo" />
            </Link>
          </div>
          <div className="header__currency__cart">
            <Query query={get_currency_query}>
              {({ loading, data }) => {
                if (loading === false) {
                  return <Currency currencies={data.currencies} />;
                } else {
                  return <h1>Loading</h1>;
                }
              }}
            </Query>
            <Cart />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Header);
