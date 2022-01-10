import React, { Component } from "react";
import { connect } from "react-redux";
import DropUp from "../files/dropUp.svg";
import DropDown from "../files/Vector.svg";
import mapStateToProps from "../mapStateToProps";

class Currency extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: this.props.currencies[0],
      openCurrenciesDropDown: false,
    };
}

  componentDidMount() {
    if(this.props.currency === null){
      this.props.dispatch({
        type: "SET_CURRENCY",
        payload: this.props.currencies[0],
      });  
    }else{
      this.setState({currency: this.props.currency})
    }
  }

  render() {
    const setCurrency = (currency) => {
      this.props.dispatch({ type: "SET_CURRENCY", payload: currency });
      this.setState({
        currency: currency,
        openCurrenciesDropDown: !this.state.openCurrenciesDropDown,
      });
    };

    return (
      <div className="header__currency">
        <div>
          <p onClick={() =>
              this.setState({
                openCurrenciesDropDown: !this.state.openCurrenciesDropDown,
              })
            }>{this.state.currency.symbol}</p>
          <img
            onClick={() =>
              this.setState({
                openCurrenciesDropDown: !this.state.openCurrenciesDropDown,
              })
            }
            src={this.state.openCurrenciesDropDown === true ? DropUp : DropDown}
            alt="Vector"
          />
          {this.state.openCurrenciesDropDown && (
            <ul className="currencies__dropdown">
              {this.props?.currencies?.map((ele, idx) => (
                <li key={"id" + idx} onClick={() => setCurrency(ele)}>
                  {ele?.symbol + " " + ele?.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Currency);
