// This is the wrapper for custom tests, called upon web components ready state
function runCustomTests() {
  // Place any setup steps like variable declaration and initialization here

  // This is the placeholder suite to place custom tests in
  // Use testCase(options) for a more convenient setup of the test cases
  suite('px-simple-area-chart setting chartData draws', function() {
    var basicArea = document.getElementById('basicArea');
    var d = [{
            "x": 1397102460000,
            "y": 1
          },{
            "x": 1397131620000,
            "y": 6
          },{
            "x": 1397160780000,
            "y": 10
          },{
            "x": 1397189940000,
            "y": 4
          },{
            "x": 1397219100000,
            "y": 6
          }
        ];

    var colorOrder = dataVisColors.properties.seriesColorOrder.value;
    var colorSet = dataVisColors.properties.dataVisColors.value;

    suiteSetup(function(done){
      basicArea.set('chartData',d);
      setTimeout(function() {
        basicArea._onIronResize();
        setTimeout(function(){ debugger; done(); }, 500);
      }, 50);
    });

    test('basicArea calculated width', function() {
      assert.equal(basicArea.width, 600);
    });

    test('basicArea calculated height', function() {
      assert.equal(basicArea.height, 332.5);
    });

    test('basicArea generated completeSeriesConfig', function() {
      assert.equal(typeof basicArea.completeSeriesConfig["y"], 'object');
      assert.equal(basicArea.completeSeriesConfig["y"]['x'], 'x');
      assert.equal(basicArea.completeSeriesConfig["y"]['y'], 'y');
      assert.equal(basicArea.completeSeriesConfig["y"]['name'], 'y');
      assert.equal(basicArea.completeSeriesConfig["y"]['color'], colorSet[colorOrder[0]]);
    });

    test('basicArea generated _dataExtents', function() {
      assert.deepEqual(basicArea._dataExtents, {"x":[Infinity, -Infinity], "y":[0,10]});
    });

    test('basicArea generated _stackedChartData', function() {
      assert.lengthOf(basicArea._stackedChartData[0], 5);
    });

    test('basicArea generated _stackedChartData', function() {
      var path = basicArea.svg.selectAll('path.series-area').attr("d");

      assert.equal(path.split(/[\s,]+/).join(''), 'M0299L150133L3000L450199L600133L600332L450332L300332L150332L0332Z');
    });
  });


  suite('px-simple-area-chart multi area', function() {
    var multiArea = document.getElementById('multiArea');
    var d = [{
            "x": 1397102460000,
            "y": 1,
            "y1": 5,
            "y2": 1
          },{
            "x": 1397131620000,
            "y": 6,
            "y1": 8,
            "y2": 21
          },{
            "x": 1397160780000,
            "y": 10,
            "y1": 3,
            "y2": 3
          },{
            "x": 1397189940000,
            "y": 4,
            "y1": 5,
            "y2": 10
          },{
            "x": 1397219100000,
            "y": 6,
            "y1": 1,
            "y2": 25
          }
        ];

    var colorOrder = dataVisColors.properties.seriesColorOrder.value;
    var colorSet = dataVisColors.properties.dataVisColors.value;

    suiteSetup(function(done){
      multiArea.set('chartData',d);
      setTimeout(function(){ done(); }, 500);
    });

    test('multiArea calculated width', function() {
      assert.equal(multiArea.width, 500);
    });

    test('multiArea calculated height', function() {
      assert.equal(multiArea.height, 400);
    });

    test('multiArea generated completeSeriesConfig', function() {
      assert.equal(typeof multiArea.completeSeriesConfig["y"], 'object');
      assert.equal(multiArea.completeSeriesConfig["y"]['x'], 'x');
      assert.equal(multiArea.completeSeriesConfig["y"]['y'], 'y');
      assert.equal(multiArea.completeSeriesConfig["y"]['name'], 'y');
      assert.equal(multiArea.completeSeriesConfig["y"]['color'], colorSet[colorOrder[0]]);

      assert.equal(typeof multiArea.completeSeriesConfig["y1"], 'object');
      assert.equal(multiArea.completeSeriesConfig["y1"]['x'], 'x');
      assert.equal(multiArea.completeSeriesConfig["y1"]['y'], 'y1');
      assert.equal(multiArea.completeSeriesConfig["y1"]['name'], 'y1');
      assert.equal(multiArea.completeSeriesConfig["y1"]['color'], colorSet[colorOrder[1]]);

      assert.equal(typeof multiArea.completeSeriesConfig["y2"], 'object');
      assert.equal(multiArea.completeSeriesConfig["y2"]['x'], 'x');
      assert.equal(multiArea.completeSeriesConfig["y2"]['y'], 'y2');
      assert.equal(multiArea.completeSeriesConfig["y2"]['name'], 'y2');
      assert.equal(multiArea.completeSeriesConfig["y2"]['color'], colorSet[colorOrder[2]]);
    });

    test('multiArea generated _dataExtents', function() {
      assert.deepEqual(multiArea._dataExtents, {"x":[Infinity, -Infinity], "y":[0,35]});
    });

    test('multiArea generated _stackedChartData', function() {
      assert.lengthOf(multiArea._stackedChartData, 3);
      assert.lengthOf(multiArea._stackedChartData[0], 5);
      assert.lengthOf(multiArea._stackedChartData[1], 5);
      assert.lengthOf(multiArea._stackedChartData[2], 5);
    });

    test('multiArea generated _stackedChartData', function() {
      // just check the first
      var path = multiArea.svg.select('path.series-area').attr("d");

      assert.equal(path.split(/[\s,]+/).join(''), 'M0388L125331L250285L375354L500331L500400L375400L250400L125400L0400Z');
    });
  });


  suite('px-simple-area-chart with seriesConfig', function() {
    var multiArea = document.getElementById('multiArea');
    var sc = {
          "fistSeries":{
            "name":"First",
            "x":"x",
            "y":"y",
            "yAxisUnit":"bofs"
          },
          "secondSeries":{
            "name":"Second",
            "x":"x",
            "y":"y1",
            "yAxisUnit":"bofs"
          },
          "thirdSeries":{
            "name":"Third",
            "x":"x",
            "y":"y2",
            "yAxisUnit":"bofs"
          }
        };

    var colorOrder = dataVisColors.properties.seriesColorOrder.value;
    var colorSet = dataVisColors.properties.dataVisColors.value;

    suiteSetup(function(done){
      multiArea.set('seriesConfig',sc);
      setTimeout(function(){ done(); }, 500);
    });

    test('multiArea calculated width', function() {
      assert.equal(multiArea.width, 500);
    });

    test('multiArea calculated height', function() {
      assert.equal(multiArea.height, 400);
    });

    test('multiArea generated completeSeriesConfig', function() {
      assert.equal(typeof multiArea.completeSeriesConfig["fistSeries"], 'object');
      assert.equal(multiArea.completeSeriesConfig["fistSeries"]['x'], 'x');
      assert.equal(multiArea.completeSeriesConfig["fistSeries"]['y'], 'y');
      assert.equal(multiArea.completeSeriesConfig["fistSeries"]['name'], 'First');
      assert.equal(multiArea.completeSeriesConfig["fistSeries"]['color'], colorSet[colorOrder[0]]);
      assert.equal(multiArea.completeSeriesConfig["fistSeries"]['yAxisUnit'], 'bofs');

      assert.equal(typeof multiArea.completeSeriesConfig["secondSeries"], 'object');
      assert.equal(multiArea.completeSeriesConfig["secondSeries"]['x'], 'x');
      assert.equal(multiArea.completeSeriesConfig["secondSeries"]['y'], 'y1');
      assert.equal(multiArea.completeSeriesConfig["secondSeries"]['name'], 'Second');
      assert.equal(multiArea.completeSeriesConfig["secondSeries"]['color'], colorSet[colorOrder[1]]);
      assert.equal(multiArea.completeSeriesConfig["secondSeries"]['yAxisUnit'], 'bofs');

      assert.equal(typeof multiArea.completeSeriesConfig["thirdSeries"], 'object');
      assert.equal(multiArea.completeSeriesConfig["thirdSeries"]['x'], 'x');
      assert.equal(multiArea.completeSeriesConfig["thirdSeries"]['y'], 'y2');
      assert.equal(multiArea.completeSeriesConfig["thirdSeries"]['name'], 'Third');
      assert.equal(multiArea.completeSeriesConfig["thirdSeries"]['color'], colorSet[colorOrder[2]]);
      assert.equal(multiArea.completeSeriesConfig["thirdSeries"]['yAxisUnit'], 'bofs');
    });

    test('multiArea generated _dataExtents', function() {
      assert.deepEqual(multiArea._dataExtents, {"x":[Infinity, -Infinity], "y":[0,35]});
    });

    test('multiArea generated _stackedChartData', function() {
      assert.lengthOf(multiArea._stackedChartData, 3);
      assert.lengthOf(multiArea._stackedChartData[0], 5);
      assert.lengthOf(multiArea._stackedChartData[1], 5);
      assert.lengthOf(multiArea._stackedChartData[2], 5);
    });

    test('multiArea generated _stackedChartData', function() {
      // just check the first
      var path = multiArea.svg.select('path.series-area').attr("d");

      assert.equal(path.split(/[\s,]+/).join(''), 'M0388L125331L250285L375354L500331L500400L375400L250400L125400L0400Z');
    });
  });

}
