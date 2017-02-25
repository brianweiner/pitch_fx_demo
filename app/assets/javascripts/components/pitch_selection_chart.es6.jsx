class PitchSelectionChart extends React.Component {
  constructor(props) {
    super(props);

    this.drawChart = this.drawChart.bind(this);
  }

  drawChart() {
    const chartName = `pie-chart-container-${this.props.pitcherId}`;
   
    this.chart = Highcharts.chart(chartName, {
      chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
      },
      title: {
          text: 'Pitch Selection'
      },
      tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
          pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                  enabled: true,
                  format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                  style: {
                      color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                  }
              }
          }
      },
      series: [{
        name: 'Pitches',
        colorByPoint: true,
        data: this.props.pitches,
      }]
    });
  }

  componentDidUpdate() {
    this.drawChart();
  }

  render () {
    return (
      <div id={`pie-chart-container-${this.props.pitcherId}`}>
      </div>
    );
  }
}

BallSelector.propTypes = {
  pitches: React.PropTypes.array,
  pitcherId: React.PropTypes.number,
};
