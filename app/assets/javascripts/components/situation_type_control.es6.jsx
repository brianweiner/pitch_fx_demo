class SituationTypeControl extends React.Component {

  clearBalls() {
    this.props.updateBallCount(0);
  }

  clearStrikes() {
    this.props.updateStrikeCount(0);
  }

  clearOuts() {
    this.props.updateOutCount(0);
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

  renderOutSelectors() {
    var selectors = [];
    for (var i = 1; i <= 2; i++) {
      selectors.push(<BallSelector key={i} current={this.props.outs} activeOn={i} updateFunc={this.props.updateOutCount} color="yellow" />);
    }
    return selectors;
  }

  render () {
    return (
      <div>
        <div className="pitch-count-container">
          <div className="ball-container">
            <div className="legend">Balls: </div>
            <div className="circle-container">
              { this.renderBallSelectors() }
            </div>
            <span onClick={() => this.clearBalls()}>clear</span>
          </div>
          <div className="strike-container">
            <div className="legend">Strikes: </div>
            <div className="circle-container">
              { this.renderStrikeSelectors() }
            </div>
            <span onClick={() => this.clearStrikes()}>clear</span>
          </div>
          <div className="out-container">
            <div className="legend">Outs: </div>
            <div className="circle-container">
              { this.renderOutSelectors() }
            </div>
            <span onClick={() => this.clearOuts()}>clear</span>
          </div>
        </div>
      </div>
    );
  }
}

SituationTypeControl.propTypes = {
  balls: React.PropTypes.number,
  strikes: React.PropTypes.number,
  outs: React.PropTypes.number,
  updateBallCount: React.PropTypes.func,
  updateStrikeCount: React.PropTypes.func,
  updateOutCount: React.PropTypes.func,
};
