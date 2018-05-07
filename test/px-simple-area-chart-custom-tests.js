/**
 * @license
 * Copyright (c) 2018, General Electric
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

document.addEventListener("WebComponentsReady", function() {
  runCustomTests();
});

function runCustomTests() {

  suite('px-simple-area-chart setting chartData draws', function() {
    var basicArea;

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

    suiteSetup(function(done) {
      basicArea = document.getElementById('basicArea');
      basicArea.set('chartData',d);
      setTimeout(function() {
        basicArea._onIronResize();
        setTimeout(function(){ done(); }, 500);
      }, 50);
    });

    test('basicArea calculated width', function() {
      assert.equal(basicArea.width, 600);
    });

    test('basicArea calculated height', function() {
      assert.closeTo(Number(basicArea.height), 332.5, 5);
    });

    test('basicArea generated completeSeriesConfig', function() {
      assert.equal(typeof basicArea.completeSeriesConfig["y"], 'object');
      assert.equal(basicArea.completeSeriesConfig["y"]['x'], 'x');
      assert.equal(basicArea.completeSeriesConfig["y"]['y'], 'y');
      assert.equal(basicArea.completeSeriesConfig["y"]['name'], 'y');
      assert.equal(basicArea.completeSeriesConfig["y"]['color'], basicArea.seriesColorList[0]);
    });

    test('basicArea generated _dataExtents', function() {
      assert.deepEqual(basicArea._dataExtents, {"x":[Infinity, -Infinity], "y":[0,10]});
    });

    test('basicArea generated _stackedChartData', function() {
      assert.lengthOf(basicArea._stackedChartData[0], 5);
    });

    test('basicArea generated _stackedChartData', function() {
      var path = basicArea.svg.selectAll('path.series-area').attr("d"),
          re = new RegExp([
            "M\\s?,?(\\d+)\\s?,?(\\d+)\\s?",
            "L\\s?,?(\\d+)\\s?,?(\\d+)\\s?",
            "L\\s?,?(\\d+)\\s?,?(\\d+)\\s?",
            "L\\s?,?(\\d+)\\s?,?(\\d+)\\s?",
            "L\\s?,?(\\d+)\\s?,?(\\d+)\\s?",
            "L\\s?,?(\\d+)\\s?,?(\\d+)\\s?",
            "L\\s?,?(\\d+)\\s?,?(\\d+)\\s?",
            "L\\s?,?(\\d+)\\s?,?(\\d+)\\s?",
            "L\\s?,?(\\d+)\\s?,?(\\d+)\\s?",
            "L\\s?,?(\\d+)\\s?,?(\\d+)\\s?Z"
          ].join('')),
          matches = re.exec(path);

      assert.closeTo(Number(matches[1]), 0, 5);
      assert.closeTo(Number(matches[2]), 299, 5);
      assert.closeTo(Number(matches[3]), 150, 5);
      assert.closeTo(Number(matches[4]), 133, 5);
      assert.closeTo(Number(matches[5]), 300, 5);
      assert.closeTo(Number(matches[6]), 0, 5);
      assert.closeTo(Number(matches[7]), 450, 5);
      assert.closeTo(Number(matches[8]), 199, 5);
      assert.closeTo(Number(matches[9]), 600, 5);
      assert.closeTo(Number(matches[10]), 133, 5);
      assert.closeTo(Number(matches[11]), 600, 5);
      assert.closeTo(Number(matches[12]), 332, 5);
      assert.closeTo(Number(matches[13]), 450, 5);
      assert.closeTo(Number(matches[14]), 332, 5);
      assert.closeTo(Number(matches[15]), 300, 5);
      assert.closeTo(Number(matches[16]), 332, 5);
      assert.closeTo(Number(matches[17]), 150, 5);
      assert.closeTo(Number(matches[18]), 332, 5);
      assert.closeTo(Number(matches[19]), 0, 5);
      assert.closeTo(Number(matches[20]), 332, 5);
    });
  });


  suite('px-simple-area-chart multi area', function() {
    var multiArea;
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

    suiteSetup(function(done) {
      multiArea = document.getElementById('multiArea');

      multiArea.set('chartData',d);
      setTimeout(function(){ done(); }, 500);
    });

    test('multiArea calculated width', function() {
      assert.equal(multiArea.width, 500);
    });

    test('multiArea calculated height', function() {
      assert.closeTo(Number(multiArea.height), 400, 5);
    });

    test('multiArea generated completeSeriesConfig', function() {
      assert.equal(typeof multiArea.completeSeriesConfig["y"], 'object');
      assert.equal(multiArea.completeSeriesConfig["y"]['x'], 'x');
      assert.equal(multiArea.completeSeriesConfig["y"]['y'], 'y');
      assert.equal(multiArea.completeSeriesConfig["y"]['name'], 'y');
      assert.equal(multiArea.completeSeriesConfig["y"]['color'], multiArea.seriesColorList[0]);

      assert.equal(typeof multiArea.completeSeriesConfig["y1"], 'object');
      assert.equal(multiArea.completeSeriesConfig["y1"]['x'], 'x');
      assert.equal(multiArea.completeSeriesConfig["y1"]['y'], 'y1');
      assert.equal(multiArea.completeSeriesConfig["y1"]['name'], 'y1');
      assert.equal(multiArea.completeSeriesConfig["y1"]['color'], multiArea.seriesColorList[1]);

      assert.equal(typeof multiArea.completeSeriesConfig["y2"], 'object');
      assert.equal(multiArea.completeSeriesConfig["y2"]['x'], 'x');
      assert.equal(multiArea.completeSeriesConfig["y2"]['y'], 'y2');
      assert.equal(multiArea.completeSeriesConfig["y2"]['name'], 'y2');
      assert.equal(multiArea.completeSeriesConfig["y2"]['color'], multiArea.seriesColorList[2]);
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
    var multiArea;
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

    suiteSetup(function(done ){
      multiArea = document.getElementById('multiArea');

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
      assert.equal(multiArea.completeSeriesConfig["fistSeries"]['color'], multiArea.seriesColorList[0]);
      assert.equal(multiArea.completeSeriesConfig["fistSeries"]['yAxisUnit'], 'bofs');

      assert.equal(typeof multiArea.completeSeriesConfig["secondSeries"], 'object');
      assert.equal(multiArea.completeSeriesConfig["secondSeries"]['x'], 'x');
      assert.equal(multiArea.completeSeriesConfig["secondSeries"]['y'], 'y1');
      assert.equal(multiArea.completeSeriesConfig["secondSeries"]['name'], 'Second');
      assert.equal(multiArea.completeSeriesConfig["secondSeries"]['color'], multiArea.seriesColorList[1]);
      assert.equal(multiArea.completeSeriesConfig["secondSeries"]['yAxisUnit'], 'bofs');

      assert.equal(typeof multiArea.completeSeriesConfig["thirdSeries"], 'object');
      assert.equal(multiArea.completeSeriesConfig["thirdSeries"]['x'], 'x');
      assert.equal(multiArea.completeSeriesConfig["thirdSeries"]['y'], 'y2');
      assert.equal(multiArea.completeSeriesConfig["thirdSeries"]['name'], 'Third');
      assert.equal(multiArea.completeSeriesConfig["thirdSeries"]['color'], multiArea.seriesColorList[2]);
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
