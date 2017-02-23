class PitchFxContainer extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      balls: 0,
      strikes: 0,
      inning: 'any',
      batterHand: 'any',
    };
    this.updateBallCount = this.updateBallCount.bind(this);
    this.updateBatterHand = this.updateBatterHand.bind(this);
    this.updateStrikeCount = this.updateStrikeCount.bind(this);
  }

  updateBallCount(ballCount) {
    this.setState({ 
      ...this.state,
      balls: ballCount,
    });
  }

  updateBatterHand(hand) {
    this.setState({
      ...this.state,
      batterHand: hand,
    });
  }

  updateStrikeCount(strikeCount) {
    this.setState({
      ...this.state,
      strikes: strikeCount,
    });
  }

  render () {
    return (
      <div>
        <SituationTypeControl
          balls={this.state.balls}
          strikes={this.state.strikes}
          inning={this.state.inning}
          batterHand={this.state.batterHand}
          updateBallCount={this.updateBallCount}
          updateBatterHand={this.updateBatterHand}
          updateStrikeCount={this.updateStrikeCount}
        />
      </div>
    );
  }
}

PitchFxContainer.propTypes = {
  pitcherOne: React.PropTypes.number,
  pitcherTwo: React.PropTypes.number
};
