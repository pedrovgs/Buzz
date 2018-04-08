import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

const containerStyle = {
  position: "absolute",
  height: "100%",
  width: "100%",
  background: "rgba(0, 0, 0, 0.5)"
};
const counterStyle = {
  fontSize: "100pt",
  color: "#FFFFFF",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translateX(-50%) translateY(-50%)"
};
class Countdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initialState();
  }

  initialState() {
    return {
      countdownValue: this.props.countdownSeconds,
      countdownFinished: false
    };
  }

  componentDidUpdate(prevProps) {
    if (this.wasTheStartDateConfiguredRecently(prevProps)) {
      this.setState(this.initialState());
    }
    if (this.state.countdownFinished === true) {
      return;
    }
    if (this.shouldStopTheCountdown(prevProps)) {
      this.setState({
        countdownValue: 0,
        countdownFinished: true
      });
      this.props.onCountdownFinished();
    } else {
      if (this.wasTheStartDateConfiguredRecently(prevProps)) {
        this.updateCounterValue();
      }
      if (this.didStartTheCountdown()) {
        this.countdownTimer = setTimeout(() => {
          this.updateCounterValue();
        }, 1000);
      }
    }
  }

  componentWillUnmount() {
    clearTimeout(this.countdownTimer);
  }

  render() {
    if (this.didStartTheCountdown()) {
      return (
        <div style={containerStyle}>
          <span style={counterStyle}>{this.state.countdownValue}</span>
        </div>
      );
    } else {
      return null;
    }
  }

  didStartTheCountdown() {
    return (
      typeof this.props.countdownStartDate !== "undefined" &&
      this.state.countdownFinished === false
    );
  }

  wasTheStartDateConfiguredRecently(prevProps) {
    return (
      typeof prevProps.countdownStartDate === "undefined" &&
      typeof this.props.countdownStartDate !== "undefined"
    );
  }

  updateCounterValue() {
    if (!this.props.countdownStartDate) {
      return;
    }
    const now = moment();
    const secondsSinceStart = this.props.countdownStartDate.diff(
      now,
      "seconds"
    );
    const countdownValue =
      this.props.countdownSeconds - Math.abs(secondsSinceStart);
    this.setState({
      countdownValue: countdownValue
    });
  }

  shouldStopTheCountdown(prevProps) {
    return (
      this.state.countdownValue <= 0 &&
      !this.wasTheStartDateConfiguredRecently(prevProps) &&
      this.state.countdownFinished === false
    );
  }
}

Countdown.propTypes = {
  onCountdownFinished: PropTypes.func,
  countdownSeconds: PropTypes.number,
  countdownStartDate: PropTypes.object
};

export default Countdown;
