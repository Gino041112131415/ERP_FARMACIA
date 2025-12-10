/* *
 *
 *  (c) 2016-2025 Torstein Honsi, Lars Cabrera
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import U from '../Core/Utilities.js';
var addEvent = U.addEvent, defined = U.defined, isNumber = U.isNumber;
/* *
 *
 *  Composition
 *
 * */
/** @private */
function compose(AxisClass, ChartClass) {
    var chartProto = ChartClass.prototype;
    if (!chartProto.adjustHeight) {
        addEvent(AxisClass, 'afterSetOptions', onAxisAfterSetOptions);
        chartProto.adjustHeight = chartAdjustHeight;
        addEvent(ChartClass, 'render', chartProto.adjustHeight);
    }
}
/** @private */
function onAxisAfterSetOptions() {
    var _a;
    var chartOptions = this.chart.userOptions.chart;
    if (!this.horiz &&
        isNumber(this.options.staticScale) &&
        (!(chartOptions === null || chartOptions === void 0 ? void 0 : chartOptions.height) ||
            ((_a = chartOptions.scrollablePlotArea) === null || _a === void 0 ? void 0 : _a.minHeight))) {
        this.staticScale = this.options.staticScale;
    }
}
/** @private */
function chartAdjustHeight() {
    var _a, _b;
    var chart = this;
    if (chart.redrawTrigger !== 'adjustHeight') {
        var _loop_1 = function (axis) {
            var chart_1 = axis.chart, staticScale = axis.options.staticScale;
            if (axis.staticScale &&
                staticScale &&
                defined(axis.min) &&
                defined(axis.max)) {
                var height = ((_b = (_a = axis.brokenAxis) === null || _a === void 0 ? void 0 : _a.unitLength) !== null && _b !== void 0 ? _b : (axis.max + axis.tickInterval - axis.min)) * (staticScale);
                // Minimum height is 1 x staticScale.
                height = Math.max(height, staticScale);
                var diff = height - chart_1.plotHeight;
                if (!chart_1.scrollablePixelsY && Math.abs(diff) >= 1) {
                    chart_1.plotHeight = height;
                    chart_1.redrawTrigger = 'adjustHeight';
                    chart_1.setSize(void 0, chart_1.chartHeight + diff, chart_1.initiatedScale ? void 0 : false);
                }
                // Make sure clip rects have the right height before initial
                // animation.
                axis.series.forEach(function (series) {
                    var clipRect = series.sharedClipKey &&
                        chart_1.sharedClips[series.sharedClipKey];
                    if (clipRect) {
                        clipRect.attr(chart_1.inverted ? {
                            width: chart_1.plotHeight
                        } : {
                            height: chart_1.plotHeight
                        });
                    }
                });
            }
        };
        for (var _i = 0, _c = (chart.axes || []); _i < _c.length; _i++) {
            var axis = _c[_i];
            _loop_1(axis);
        }
        this.initiatedScale = true;
    }
    this.redrawTrigger = void 0;
}
/* *
 *
 *  Default Export
 *
 * */
var StaticScale = {
    compose: compose
};
export default StaticScale;
/* *
 *
 *  API Options
 *
 * */
/**
 * For vertical axes only. Setting the static scale ensures that each tick unit
 * is translated into a fixed pixel height. For example, setting the static
 * scale to 24 results in each Y axis category taking up 24 pixels, and the
 * height of the chart adjusts. Adding or removing items will make the chart
 * resize.
 *
 * @sample gantt/xrange-series/demo/
 *         X-range series with static scale
 *
 * @type      {number}
 * @default   50
 * @since     6.2.0
 * @product   gantt
 * @apioption yAxis.staticScale
 */
''; // Keeps doclets above in JS file
