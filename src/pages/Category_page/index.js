import React, { Component } from "react";
import { connect } from "react-redux";
import mapStateToProps from "../../mapStateToProps";
import Header from "../../components/Header";
import "../../App.css";
import Category_page_body from "./Category_page_body";

class Index extends Component {
  render() {
    return (
      <div className="category">
        <Header />
        <Category_page_body />
      </div>
    );
  }
}

export default connect(mapStateToProps)(Index);
