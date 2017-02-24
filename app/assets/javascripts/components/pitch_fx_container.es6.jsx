class PitchFxContainer extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      balls: 0,
      strikes: 0,
      outs: 0,
      pitcherOneEvents: [],
      pitcherTwoEvents: [],
    };
    this.updateBallCount = this.updateBallCount.bind(this);
    this.updateStrikeCount = this.updateStrikeCount.bind(this);
    this.updateOutCount = this.updateOutCount.bind(this);
  }

  updateBallCount(ballCount) {
    this.setState({ 
      ...this.state,
      balls: ballCount,
    }, this.requestUpdate);
  }

  updateStrikeCount(strikeCount) {
    this.setState({
      ...this.state,
      strikes: strikeCount,
    }, this.requestUpdate);
  }

  updateOutCount(outCount) {
    this.setState({
      ...this.state,
      outs: outCount,
    }, this.requestUpdate);
  }

  requestUpdate() {
    $.ajax({
      url: `/pitchers/${this.props.pitcherOne}/events/`,
      method: 'POST',
      data: {
        pitch_event: {
          balls: this.state.balls,
          strikes: this.state.strikes,
          outs: this.state.outs,   
        },
      },
    }).done((data) => {
      this.setState({
        ...this.state,
        pitcherOneEvents: data.pitchEvents,
      });
    });
    $.ajax({
      url: `/pitchers/${this.props.pitcherTwo}/events/`,
      method: 'POST',
      data: {
        pitch_event: {
          balls: this.state.balls,
          strikes: this.state.strikes,  
          outs: this.state.outs 
        },
      },
    }).done((data) => {
      this.setState({
        ...this.state,
        pitcherTwoEvents: data.pitchEvents,
      });
    });
  }

  render () {
    return (
      <div>
        <SituationTypeControl
          balls={this.state.balls}
          strikes={this.state.strikes}
          outs={this.state.outs}
          updateBallCount={this.updateBallCount}
          updateStrikeCount={this.updateStrikeCount}
          updateOutCount={this.updateOutCount}
        />
        <div className="pitcher-comparison-container">
          <PitchScatterPlot events={this.state.pitcherOneEvents} pitcherId={this.props.pitcherOne} pitcherName={this.props.pitcherOneName} />
          <PitchScatterPlot events={this.state.pitcherTwoEvents} pitcherId={this.props.pitcherTwo} pitcherName={this.props.pitcherTwoName} />
        </div>
      </div>
    );
  }
}

PitchFxContainer.propTypes = {
  pitcherOne: React.PropTypes.number,
  pitcherTwo: React.PropTypes.number,
  pitcherOneName: React.PropTypes.string,
  pitcherTwoName: React.PropTypes.string,
};
