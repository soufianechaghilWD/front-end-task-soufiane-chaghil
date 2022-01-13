import { Query } from "@apollo/client/react/components";
import React, { Component } from "react";
import { connect } from "react-redux";
import mapStateToProps from "../mapStateToProps";
import Logo from "../files/logo.svg";
import "../styles/Header.css";
import Currency from "./Currency";
import Cart from "./Cart";
import { Link, Navigate } from "react-router-dom";
import Cart_Overlay from "./CartOverlay";
import { get_categories_query, get_currency_query } from "../gqlQueries";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      header_active_item: this.props.header_active_item,
      dispatch: this.props.dispatch,
      redirect_sts: false,
      openCartDropDown: false,
    };
  }

  componentDidUpdate() {
    if (this.state.redirect_sts === true) {
      this.setState({ redirect_sts: false });
    }
  }

  render() {
    const { header_active_item, dispatch, redirect_sts, openCartDropDown } =
      this?.state;
    const setOpenCartDropDown = () => {
      this.setState({ openCartDropDown: !openCartDropDown });
    };

    const setHeaderActiveItem = (new_header_item) => {
      dispatch({
        type: "SET_HEADER_ACTIVE_ITEM",
        payload: new_header_item,
      });
      this.setState({ header_active_item: new_header_item });
      if (window.location.pathname !== "/") {
        this.setState({ redirect_sts: true });
      }
    };

    if (redirect_sts === true) {
      return <Navigate to="/" />;
    }

    return (
      <div className="header">
        <div className="header__container">
          <Query query={get_categories_query()}>
            {({ loading, data }) => {
              return (
                <ul>
                  {data?.categories?.map((ele, idx) => {
                    const { name } = ele;

                    return (
                      <li
                        onClick={() => setHeaderActiveItem(name)}
                        className={`header_item ${
                          name === header_active_item
                            ? "active_header_item"
                            : ""
                        }`}
                        id={name}
                        key={"id" + idx}
                      >
                        {name?.toUpperCase()}
                      </li>
                    );
                  })}
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
            <Query query={get_currency_query()}>
              {({ loading, data }) => {
                if (loading === false) {
                  return <Currency currencies={data.currencies} />;
                } else {
                  return <h1>Loading</h1>;
                }
              }}
            </Query>
            <Cart
              openCartDropDown={openCartDropDown}
              setOpenCartDropDown={setOpenCartDropDown}
            />
          </div>
        </div>
        {openCartDropDown === true && (
          <Cart_Overlay setOpenCartDropDown={setOpenCartDropDown} />
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps)(Header);
