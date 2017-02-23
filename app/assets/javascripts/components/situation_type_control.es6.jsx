class SituationTypeControl extends React.Component {

  updateBatterHand(hand) {
    this.props.updateBatterHand(hand);
  }

  clearBalls() {
    this.props.updateBallCount(0);
  }

  clearStrikes() {
    this.props.updateStrikeCount(0);
  }

  renderBallSelectors() {
    var selectors = [];
    for (var i = 1; i <= 3; i++) {
      selectors.push(<BallSelector key={i} current={this.props.balls} activeOn={i} updateFunc={this.props.updateBallCount} color="green" />);
    }
    return selectors;
  }

  renderStrikeSelectors() {
    var selectors = [];
    for (var i = 1; i <= 2; i++) {
      selectors.push(<BallSelector key={i} current={this.props.strikes} activeOn={i} updateFunc={this.props.updateStrikeCount} color="red" />);
    }
    return selectors;
  }

  render () {
    return (
      <div>
        <div className="ball-container">
          <span>Balls: </span>
          { this.renderBallSelectors() }
          <span onClick={() => this.clearBalls()}>clear</span>
        </div>
        <div className="strike-container">
          <span>Strikes: </span>
          { this.renderStrikeSelectors() }
          <span onClick={() => this.clearStrikes()}>clear</span>
        </div>
        <div className="batter-hand-container">
          <span>Batter Side: </span>
          <span onClick={() => this.updateBatterHand('R')}>R </span>
          <span onClick={() => this.updateBatterHand('L')}>L </span>
          <span onClick={() => this.updateBatterHand('any')}>any</span>    
        </div>
        <div>Inning: {this.props.inning}</div>
        <div>Batter Hand: {this.props.batterHand}</div>
      </div>
    );
  }
}

SituationTypeControl.propTypes = {
  balls: React.PropTypes.number,
  strikes: React.PropTypes.number,
  inning: React.PropTypes.string,
  batterHand: React.PropTypes.string,
  updateBallCount: React.PropTypes.func,
  updateBatterHand: React.PropTypes.func,
  updateStrikeCount: React.PropTypes.func,
};
