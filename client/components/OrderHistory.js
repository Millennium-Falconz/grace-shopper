import React from "react";
import { connect } from "react-redux";
import { getOrderHistory } from "../store/orderHistory";

export class OrderHistoy extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>Past Catches</h1>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    orderHistory: state.orderHistoryReducer.orderHistory,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOrderHistory: () => dispatch(getOrderHistory()),
  };
};
