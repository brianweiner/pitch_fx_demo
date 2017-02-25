const PITCH_TYPE_CONVERTER = {
  FA: 'Fastball',
  FF: 'Four-Seam Fastball',
  FT: 'Two-seam Fastball',
  SI: 'Sinker',
  SL: 'Slider',
  FS: 'Splitter',
  FC: 'Cutter',
  FO: 'Pitch Out',
  PO: 'Pitch Out',
  IN: 'Intentional Ball',
  CU: 'Curveball',
  CB: 'Curveball',
  KC: 'Knuckle-curve',
  EP: 'Eephus',
  CH: 'Changeup',
  SC: 'Screwball',
  KN: 'Knuckleball',
  AB: 'Auto. Ball',
  UN: 'Unidentified',
  XX: 'Unidentified',
};

class PitchScatterPlot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPitches: [],
      pitchChoices: {},
      totalPitches: 0,
    };
    this.drawChart = this.drawChart.bind(this);
  }

  convertPitches(nextProps) {
    /*
      Group pitch events by pitch type
    */
    const groupedByPitchType = _.groupBy(nextProps.events, (val) => { return val.pitchType });
    /*
      Now cull from each series everything except the coordinates
    */
    const pitchTypesAndLocationsOnly = {};
    _.forOwn(groupedByPitchType, (val, key) => { 
      coords = _.map(val, (e) => [e.plateX, e.plateZ] );
      const obj = {}
      pitchTypesAndLocationsOnly[key] = coords;
    });

    var groupedPitches = []
    _.forOwn(pitchTypesAndLocationsOnly, (val,key) => {
      groupedPitches.push({
        name: PITCH_TYPE_CONVERTER[key],
        data: val,
      });
    });

    return groupedPitches;
  }

  convertPitchChoices(nextProps) {
    const groupedByPitchType = _.groupBy(nextProps.events, (val) => { return val.pitchType });
    const pitchCounts = [];
    _.forOwn(groupedByPitchType, (val, key) =>{
      pitchCounts.push({
        name: PITCH_TYPE_CONVERTER[key],
        y: val.length,
      });
    });
    return pitchCounts;
  }

  drawChart() {
    const chartId = `scatterplot-container-${this.props.pitcherId}`;
    const chartTitle = `Pitch Location for ${this.props.pitcherName}`;
    this.chart = Highcharts.chart(chartId, {
      chart: {
          type: 'scatter',
          zoomType: 'xy',
          plotAreaWidth: 150,
          plotAreaHeight: 200
      },
      title: {
          text: chartTitle
      },
      subtitle: {
          text: 'Source: Pitch F/X'
      },
      xAxis: {
          title: {
              enabled: true,
              text: 'Position from catcher perspective'
          },
          showLastLabel: true,
          min: -5,
          max: 5,
          tickInterval: 0.25,

      },
      yAxis: {
          title: {
              text: 'Height from bottom of plate'
          },
          min: -4,
          max: 8,
          tickInterval: 0.25,
      },
      plotOptions: {
        scatter: {
          marker: {
            radius: 2,
            states: {
              hover: {
                enabled: true,
                lineColor: 'rgb(100,100,100)'
              }
            }
          },
        states: {
          hover: {
            marker: {
              enabled: false
            }
          }
        },
        tooltip: {
          headerFormat: '<b>{series.name}</b><br>',
          pointFormat: '{point.x}in, {point.y}in'
        }
      }
      },
      series: this.state.currentPitches
    });
  }

  componentWillMount() {
    (function(H) {
      H.wrap(H.Chart.prototype, 'setChartSize', function(proceed, skipAxes) {
        var chart = this,
        inverted = chart.inverted,
        renderer = chart.renderer,
        chartWidth = chart.chartWidth,
        chartHeight = chart.chartHeight,
        optionsChart = chart.options.chart,
        spacing = chart.spacing,
        clipOffset = chart.clipOffset,
        clipX,
        clipY,
        plotLeft,
        plotTop,
        plotWidth,
        plotHeight,
        plotBorderWidth,
        plotAreaWidth = chart.options.chart.plotAreaWidth,
        plotAreaHeight = chart.options.chart.plotAreaHeight;

        if (plotAreaWidth) {
          chart.plotWidth = plotWidth = plotAreaWidth;
          chart.plotLeft = plotLeft = Math.round((chartWidth - plotAreaWidth) / 2);
        } else {
          chart.plotLeft = plotLeft = Math.round(chart.plotLeft);
          chart.plotWidth = plotWidth = Math.max(0, Math.round(chartWidth - plotLeft - chart.marginRight));
        }
        if (plotAreaHeight) {
          chart.plotTop = plotTop = Math.round((chartHeight - plotAreaHeight) / 2);
          chart.plotHeight = plotHeight = plotAreaHeight;
        } else {
          chart.plotTop = plotTop = Math.round(chart.plotTop);
          chart.plotHeight = plotHeight = Math.max(0, Math.round(chartHeight - plotTop - chart.marginBottom));
        }

        chart.plotSizeX = inverted ? plotHeight : plotWidth;
        chart.plotSizeY = inverted ? plotWidth : plotHeight;

        chart.plotBorderWidth = optionsChart.plotBorderWidth || 0;

        // Set boxes used for alignment
        chart.spacingBox = renderer.spacingBox = {
          x: spacing[3],
          y: spacing[0],
          width: chartWidth - spacing[3] - spacing[1],
          height: chartHeight - spacing[0] - spacing[2]
        };
        chart.plotBox = renderer.plotBox = {
          x: plotLeft,
          y: plotTop,
          width: plotWidth,
          height: plotHeight
        };

        plotBorderWidth = 2 * Math.floor(chart.plotBorderWidth / 2);
        clipX = Math.ceil(Math.max(plotBorderWidth, clipOffset[3]) / 2);
        clipY = Math.ceil(Math.max(plotBorderWidth, clipOffset[0]) / 2);
        chart.clipBox = {
          x: clipX,
          y: clipY,
          width: Math.floor(chart.plotSizeX - Math.max(plotBorderWidth, clipOffset[1]) / 2 - clipX),
          height: Math.max(0, Math.floor(chart.plotSizeY - Math.max(plotBorderWidth, clipOffset[2]) / 2 - clipY))
        };

        if (!skipAxes) {
          Highcharts.each(chart.axes, function(axis) {
            axis.setAxisSize();
            axis.setAxisTranslation();
          });
        }
      });
    }(Highcharts));
  }
  componentWillReceiveProps(nextProps) {
    const activePitches = this.convertPitches(nextProps);
    const pitchChoices = this.convertPitchChoices(nextProps);

    this.setState({
      ...this.state,
      currentPitches: activePitches,
      pitchChoices: pitchChoices,
      totalPitches: nextProps.events.length,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    this.drawChart();
  }

  render () {
    return (
      <div className="scatter-plot-container">
        <div className="pitch-scatter-plot" id={`scatterplot-container-${this.props.pitcherId}`}></div>
        <PitchSelectionChart pitches={this.state.pitchChoices} pitcherId={this.props.pitcherId} />
      </div>
    );
  }
}

PitchScatterPlot.propTypes = {
  events: React.PropTypes.array,
  pitcherId: React.PropTypes.number,
  pitcherName: React.PropTypes.string,
};
