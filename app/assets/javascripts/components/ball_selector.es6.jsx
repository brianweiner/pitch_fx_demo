class BallSelector extends React.Component {

  updateFunc() {
    this.props.updateFunc(this.props.activeOn);
  }

  render () {
    const className = this.props.current >= this.props.activeOn ? `circle ${this.props.color}` : "circle"
    return (
      <div className={className} onClick={() => this.updateFunc()}>
      </div>
    );
  }
}

BallSelector.propTypes = {
  activeOn: React.PropTypes.number,
  current: React.PropTypes.number,
  color: React.PropTypes.string,
  updateFunc: React.PropTypes.func,
};
