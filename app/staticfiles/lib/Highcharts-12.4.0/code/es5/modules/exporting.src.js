/**
 * @license Highcharts JS v12.4.0 (2025-09-04)
 * @module highcharts/modules/exporting
 * @requires highcharts
 *
 * Exporting module
 *
 * (c) 2010-2025 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("highcharts"), require("highcharts")["AST"], require("highcharts")["Chart"]);
	else if(typeof define === 'function' && define.amd)
		define("highcharts/modules/exporting", [["highcharts/highcharts"], ["highcharts/highcharts","AST"], ["highcharts/highcharts","Chart"]], factory);
	else if(typeof exports === 'object')
		exports["highcharts/modules/exporting"] = factory(require("highcharts"), require("highcharts")["AST"], require("highcharts")["Chart"]);
	else
		root["Highcharts"] = factory(root["Highcharts"], root["Highcharts"]["AST"], root["Highcharts"]["Chart"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE__944__, __WEBPACK_EXTERNAL_MODULE__660__, __WEBPACK_EXTERNAL_MODULE__960__) {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 660:
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__660__;

/***/ }),

/***/ 944:
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__944__;

/***/ }),

/***/ 960:
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__960__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ exporting_src; }
});

// EXTERNAL MODULE: external {"amd":["highcharts/highcharts"],"commonjs":["highcharts"],"commonjs2":["highcharts"],"root":["Highcharts"]}
var highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_ = __webpack_require__(944);
var highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default = /*#__PURE__*/__webpack_require__.n(highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_);
// EXTERNAL MODULE: external {"amd":["highcharts/highcharts","AST"],"commonjs":["highcharts","AST"],"commonjs2":["highcharts","AST"],"root":["Highcharts","AST"]}
var highcharts_AST_commonjs_highcharts_AST_commonjs2_highcharts_AST_root_Highcharts_AST_ = __webpack_require__(660);
var highcharts_AST_commonjs_highcharts_AST_commonjs2_highcharts_AST_root_Highcharts_AST_default = /*#__PURE__*/__webpack_require__.n(highcharts_AST_commonjs_highcharts_AST_commonjs2_highcharts_AST_root_Highcharts_AST_);
// EXTERNAL MODULE: external {"amd":["highcharts/highcharts","Chart"],"commonjs":["highcharts","Chart"],"commonjs2":["highcharts","Chart"],"root":["Highcharts","Chart"]}
var highcharts_Chart_commonjs_highcharts_Chart_commonjs2_highcharts_Chart_root_Highcharts_Chart_ = __webpack_require__(960);
var highcharts_Chart_commonjs_highcharts_Chart_commonjs2_highcharts_Chart_root_Highcharts_Chart_default = /*#__PURE__*/__webpack_require__.n(highcharts_Chart_commonjs_highcharts_Chart_commonjs2_highcharts_Chart_root_Highcharts_Chart_);
;// ./code/es5/es-modules/Core/Chart/ChartNavigationComposition.js
/**
 *
 *  (c) 2010-2025 Paweł Fus
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */

/* *
 *
 *  Composition
 *
 * */
var ChartNavigationComposition;
(function (ChartNavigationComposition) {
    /* *
     *
     *  Declarations
     *
     * */
    /* *
     *
     *  Functions
     *
     * */
    /* eslint-disable valid-jsdoc */
    /**
     * @private
     */
    function compose(chart) {
        if (!chart.navigation) {
            chart.navigation = new Additions(chart);
        }
        return chart;
    }
    ChartNavigationComposition.compose = compose;
    /* *
     *
     *  Class
     *
     * */
    /**
     * Initializes `chart.navigation` object which delegates `update()` methods
     * to all other common classes (used in exporting and navigationBindings).
     * @private
     */
    var Additions = /** @class */ (function () {
            /* *
             *
             *  Constructor
             *
             * */
            function Additions(chart) {
                this.updates = [];
            this.chart = chart;
        }
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Registers an `update()` method in the `chart.navigation` object.
         *
         * @private
         * @param {UpdateFunction} updateFn
         * The `update()` method that will be called in `chart.update()`.
         */
        Additions.prototype.addUpdate = function (updateFn) {
            this.chart.navigation.updates.push(updateFn);
        };
        /**
         * @private
         */
        Additions.prototype.update = function (options, redraw) {
            var _this = this;
            this.updates.forEach(function (updateFn) {
                updateFn.call(_this.chart, options, redraw);
            });
        };
        return Additions;
    }());
    ChartNavigationComposition.Additions = Additions;
})(ChartNavigationComposition || (ChartNavigationComposition = {}));
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ var Chart_ChartNavigationComposition = (ChartNavigationComposition);

;// ./code/es5/es-modules/Extensions/DownloadURL.js
/* *
 *
 *  (c) 2015-2025 Oystein Moseng
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Mixin for downloading content in the browser
 *
 * */

/* *
 *
 *  Imports
 *
 * */

var isSafari = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).isSafari, win = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).win, doc = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).win.document;

var error = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).error;
/* *
 *
 *  Constants
 *
 * */
var domurl = win.URL || win.webkitURL || win;
/* *
 *
 *  Functions
 *
 * */
/**
 * Convert base64 dataURL to Blob if supported, otherwise returns undefined.
 *
 * @private
 * @function Highcharts.dataURLtoBlob
 *
 * @param {string} dataURL
 * URL to convert.
 *
 * @return {string | undefined}
 * Blob.
 */
function dataURLtoBlob(dataURL) {
    var parts = dataURL
            .replace(/filename=.*;/, '')
            .match(/data:([^;]*)(;base64)?,([A-Z+\d\/]+)/i);
    if (parts &&
        parts.length > 3 &&
        (win.atob) &&
        win.ArrayBuffer &&
        win.Uint8Array &&
        win.Blob &&
        (domurl.createObjectURL)) {
        // Try to convert data URL to Blob
        var binStr = win.atob(parts[3]),
            buf = new win.ArrayBuffer(binStr.length),
            binary = new win.Uint8Array(buf);
        for (var i = 0; i < binary.length; ++i) {
            binary[i] = binStr.charCodeAt(i);
        }
        return domurl
            .createObjectURL(new win.Blob([binary], { 'type': parts[1] }));
    }
}
/**
 * Download a data URL in the browser. Can also take a blob as first param.
 *
 * @private
 * @function Highcharts.downloadURL
 *
 * @param {string | global.URL} dataURL
 * The dataURL/Blob to download.
 * @param {string} filename
 * The name of the resulting file (w/extension).
 */
function downloadURL(dataURL, filename) {
    var nav = win.navigator,
        a = doc.createElement('a');
    // IE specific blob implementation
    // Don't use for normal dataURLs
    if (typeof dataURL !== 'string' &&
        !(dataURL instanceof String) &&
        nav.msSaveOrOpenBlob) {
        nav.msSaveOrOpenBlob(dataURL, filename);
        return;
    }
    dataURL = '' + dataURL;
    if (nav.userAgent.length > 1000 /* RegexLimits.shortLimit */) {
        throw new Error('Input too long');
    }
    var // Some browsers have limitations for data URL lengths. Try to convert
        // to Blob or fall back. Edge always needs that blob.
        isOldEdgeBrowser = /Edge\/\d+/.test(nav.userAgent), 
        // Safari on iOS needs Blob in order to download PDF
        safariBlob = (isSafari &&
            typeof dataURL === 'string' &&
            dataURL.indexOf('data:application/pdf') === 0);
    if (safariBlob || isOldEdgeBrowser || dataURL.length > 2000000) {
        dataURL = dataURLtoBlob(dataURL) || '';
        if (!dataURL) {
            throw new Error('Failed to convert to blob');
        }
    }
    // Try HTML5 download attr if supported
    if (typeof a.download !== 'undefined') {
        a.href = dataURL;
        a.download = filename; // HTML5 download attribute
        doc.body.appendChild(a);
        a.click();
        doc.body.removeChild(a);
    }
    else {
        // No download attr, just opening data URI
        try {
            if (!win.open(dataURL, 'chart')) {
                throw new Error('Failed to open window');
            }
        }
        catch (_a) {
            // If window.open failed, try location.href
            win.location.href = dataURL;
        }
    }
}
/**
 * Asynchronously downloads a script from a provided location.
 *
 * @private
 * @function Highcharts.getScript
 *
 * @param {string} scriptLocation
 * The location for the script to fetch.
 */
function getScript(scriptLocation) {
    return new Promise(function (resolve, reject) {
        var head = doc.getElementsByTagName('head')[0], script = doc.createElement('script');
        // Set type and location for the script
        script.type = 'text/javascript';
        script.src = scriptLocation;
        // Resolve in case of a succesful script fetching
        script.onload = function () {
            resolve();
        };
        // Reject in case of fail
        script.onerror = function () {
            var msg = "Error loading script ".concat(scriptLocation);
            error(msg);
            reject(new Error(msg));
        };
        // Append the newly created script
        head.appendChild(script);
    });
}
/* *
 *
 *  Default Export
 *
 * */
var DownloadURL = {
    dataURLtoBlob: dataURLtoBlob,
    downloadURL: downloadURL,
    getScript: getScript
};
/* harmony default export */ var Extensions_DownloadURL = (DownloadURL);

;// ./code/es5/es-modules/Extensions/Exporting/ExportingDefaults.js
/* *
 *
 *  (c) 2010-2025 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */

var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0,
        sent: function() { if (t[0] & 1) throw t[1]; return t[1]; },
        trys: [],
        ops: [] },
        f,
        y,
        t,
        g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

var isTouchDevice = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).isTouchDevice;
/* *
 *
 *  API Options
 *
 * */
// Add the export related options
/**
 * Options for the exporting module. For an overview on the matter, see
 * [the docs](https://www.highcharts.com/docs/export-module/export-module-overview) and
 * read our [Fair Usage Policy](https://www.highcharts.com/docs/export-module/privacy-disclaimer-export).
 *
 * @requires     modules/exporting
 * @optionparent exporting
 */
var exporting = {
    /**
     * Experimental setting to allow HTML inside the chart (added through
     * the `useHTML` options), directly in the exported image. This allows
     * you to preserve complicated HTML structures like tables or bi-directional
     * text in exported charts.
     *
     * Disclaimer: The HTML is rendered in a `foreignObject` tag in the
     * generated SVG. The official export server is based on PhantomJS,
     * which supports this, but other SVG clients, like Batik, does not
     * support it. This also applies to downloaded SVG that you want to
     * open in a desktop client.
     *
     * @type      {boolean}
     * @default   false
     * @since     4.1.8
     * @apioption exporting.allowHTML
     */
    /**
     * Allows the end user to sort the data table by clicking on column headers.
     *
     * @since     10.3.3
     * @apioption exporting.allowTableSorting
     */
    allowTableSorting: true,
    /**
     * Allow exporting a chart retaining any user-applied CSS.
     *
     * Note that this is is default behavior in [styledMode](#chart.styledMode).
     *
     * @see [styledMode](#chart.styledMode)
     *
     * @sample {highcharts} highcharts/exporting/apply-stylesheets/
     *
     * @type      {boolean}
     * @default   false
     * @since     12.0.0
     * @apioption exporting.applyStyleSheets
     */
    /**
     * Additional chart options to be merged into the chart before exporting to
     * an image format. This does not apply to printing the chart via the export
     * menu.
     *
     * For example, a common use case is to add data labels to improve
     * readability of the exported chart, or to add a printer-friendly color
     * scheme to exported PDFs.
     *
     * @sample {highcharts} highcharts/exporting/chartoptions-data-labels/
     *         Added data labels
     * @sample {highstock} highcharts/exporting/chartoptions-data-labels/
     *         Added data labels
     *
     * @type      {Highcharts.Options}
     * @apioption exporting.chartOptions
     */
    /**
     * Whether to enable the exporting module. Disabling the module will
     * hide the context button, but API methods will still be available.
     *
     * @sample {highcharts} highcharts/exporting/enabled-false/
     *         Exporting module is loaded but disabled
     * @sample {highstock} highcharts/exporting/enabled-false/
     *         Exporting module is loaded but disabled
     *
     * @type      {boolean}
     * @default   true
     * @since     2.0
     * @apioption exporting.enabled
     */
    /**
     * Function to call if the offline-exporting module fails to export
     * a chart on the client side, and [fallbackToExportServer](
     * #exporting.fallbackToExportServer) is disabled. If left undefined, an
     * exception is thrown instead. Receives two parameters, the exporting
     * options, and the error from the module.
     *
     * @see [fallbackToExportServer](#exporting.fallbackToExportServer)
     *
     * @type      {Highcharts.ExportingErrorCallbackFunction}
     * @since     5.0.0
     * @requires  modules/exporting
     * @requires  modules/offline-exporting
     * @apioption exporting.error
     */
    /**
     * Whether or not to fall back to the export server if the offline-exporting
     * module is unable to export the chart on the client side. This happens for
     * certain browsers, and certain features (e.g.
     * [allowHTML](#exporting.allowHTML)), depending on the image type exporting
     * to. For very complex charts, it is possible that export can fail in
     * browsers that don't support Blob objects, due to data URL length limits.
     * It is recommended to define the [exporting.error](#exporting.error)
     * handler if disabling fallback, in order to notify users in case export
     * fails.
     *
     * @type      {boolean}
     * @default   true
     * @since     4.1.8
     * @requires  modules/exporting
     * @requires  modules/offline-exporting
     * @apioption exporting.fallbackToExportServer
     */
    /**
     * The filename, without extension, to use for the exported chart.
     *
     * @sample {highcharts} highcharts/exporting/filename/
     *         Custom file name
     * @sample {highstock} highcharts/exporting/filename/
     *         Custom file name
     *
     * @type      {string}
     * @default   chart
     * @since     2.0
     * @apioption exporting.filename
     */
    /**
     * Highcharts v11.2.0 and older. An object containing additional key value
     * data for the POST form that sends the SVG to the export server. For
     * example, a `target` can be set to make sure the generated image is
     * received in another frame, or a custom `enctype` or `encoding` can be
     * set.
     *
     * With Highcharts v11.3.0, the `fetch` API replaced the old HTML form. To
     * modify the request, now use [fetchOptions](#exporting.fetchOptions)
     * instead.
     *
     * @deprecated
     * @type      {Highcharts.HTMLAttributes}
     * @since     3.0.8
     * @apioption exporting.formAttributes
     */
    /**
     * Options for the fetch request used when sending the SVG to the export
     * server.
     *
     * See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/fetch)
     * for more information
     *
     * @type      {Object}
     * @since     11.3.0
     * @apioption exporting.fetchOptions
     */
    /**
     * Path where Highcharts will look for export module dependencies to
     * load on demand if they don't already exist on `window`. Should currently
     * point to location of [CanVG](https://github.com/canvg/canvg) library,
     * [jsPDF](https://github.com/parallax/jsPDF) and
     * [svg2pdf.js](https://github.com/yWorks/svg2pdf.js), required for client
     * side export in certain browsers.
     *
     * @type      {string}
     * @default   https://code.highcharts.com/{version}/lib
     * @since     5.0.0
     * @apioption exporting.libURL
     */
    libURL: 'https://code.highcharts.com/12.4.0/lib/',
    /**
     * Whether the chart should be exported using the browser's built-in
     * capabilities, allowing offline exports without requiring access to the
     * Highcharts export server, or sent directly to the export server for
     * processing and downloading.
     *
     * This option is different from `exporting.fallbackToExportServer`, which
     * controls whether the export server should be used as a fallback only if
     * the local export fails. In contrast, `exporting.local` explicitly defines
     * which export method to use.
     *
     * @see [fallbackToExportServer](#exporting.fallbackToExportServer)
     *
     * @type      {boolean}
     * @default   true
     * @since 12.3.0
     * @requires  modules/exporting
     * @apioption exporting.local
     */
    local: true,
    /**
     * Analogous to [sourceWidth](#exporting.sourceWidth).
     *
     * @type      {number}
     * @since     3.0
     * @apioption exporting.sourceHeight
     */
    /**
     * The width of the original chart when exported, unless an explicit
     * [chart.width](#chart.width) is set, or a pixel width is set on the
     * container. The width exported raster image is then multiplied by
     * [scale](#exporting.scale).
     *
     * @sample {highcharts} highcharts/exporting/sourcewidth/
     *         Source size demo
     * @sample {highstock} highcharts/exporting/sourcewidth/
     *         Source size demo
     * @sample {highmaps} maps/exporting/sourcewidth/
     *         Source size demo
     *
     * @type      {number}
     * @since     3.0
     * @apioption exporting.sourceWidth
     */
    /**
     * The pixel width of charts exported to PNG or JPG. As of Highcharts
     * 3.0, the default pixel width is a function of the [chart.width](
     * #chart.width) or [exporting.sourceWidth](#exporting.sourceWidth) and the
     * [exporting.scale](#exporting.scale).
     *
     * @sample {highcharts} highcharts/exporting/width/
     *         Export to 200px wide images
     * @sample {highstock} highcharts/exporting/width/
     *         Export to 200px wide images
     *
     * @type      {number}
     * @since     2.0
     * @apioption exporting.width
     */
    /**
     * Default MIME type for exporting if `chart.exportChart()` is called
     * without specifying a `type` option. Possible values are `image/png`,
     *  `image/jpeg`, `application/pdf` and `image/svg+xml`.
     *
     * @type  {Highcharts.ExportingMimeTypeValue}
     * @since 2.0
     */
    type: 'image/png',
    /**
     * The URL for the server module converting the SVG string to an image
     * format. By default this points to Highchart's free web service.
     *
     * @since 2.0
     */
    url: "https://export-svg.highcharts.com?v=".concat((highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).version),
    /**
     * Settings for a custom font for the exported PDF, when using the
     * `offline-exporting` module. This is used for languages containing
     * non-ASCII characters, like Chinese, Russian, Japanese etc.
     *
     * As described in the [jsPDF
     * docs](https://github.com/parallax/jsPDF#use-of-unicode-characters--utf-8),
     * the 14 standard fonts in PDF are limited to the ASCII-codepage.
     * Therefore, in order to support other text in the exported PDF, one or
     * more TTF font files have to be passed on to the exporting module.
     *
     * See more in [the
     * docs](https://www.highcharts.com/docs/export-module/client-side-export).
     *
     * @sample {highcharts} highcharts/exporting/offline-download-pdffont/
     *         Download PDF in a language containing non-Latin characters.
     *
     * @since    10.0.0
     * @requires modules/offline-exporting
     */
    pdfFont: {
        /**
         * The TTF font file for normal `font-style`. If font variations like
         * `bold` or `italic` are not defined, the `normal` font will be used
         * for those too.
         *
         * @type string | undefined
         */
        normal: void 0,
        /**
         * The TTF font file for bold text.
         *
         * @type string | undefined
         */
        bold: void 0,
        /**
         * The TTF font file for bold and italic text.
         *
         * @type string | undefined
         */
        bolditalic: void 0,
        /**
         * The TTF font file for italic text.
         *
         * @type string | undefined
         */
        italic: void 0
    },
    /**
     * When printing the chart from the menu item in the burger menu, if
     * the on-screen chart exceeds this width, it is resized. After printing
     * or cancelled, it is restored. The default width makes the chart
     * fit into typical paper format. Note that this does not affect the
     * chart when printing the web page as a whole.
     *
     * @since 4.2.5
     */
    printMaxWidth: 780,
    /**
     * Defines the scale or zoom factor for the exported image compared
     * to the on-screen display. While for instance a 600px wide chart
     * may look good on a website, it will look bad in print. The default
     * scale of 2 makes this chart export to a 1200px PNG or JPG.
     *
     * @see [chart.width](#chart.width)
     * @see [exporting.sourceWidth](#exporting.sourceWidth)
     *
     * @sample {highcharts} highcharts/exporting/scale/
     *         Scale demonstrated
     * @sample {highstock} highcharts/exporting/scale/
     *         Scale demonstrated
     * @sample {highmaps} maps/exporting/scale/
     *         Scale demonstrated
     *
     * @since 3.0
     */
    scale: 2,
    /**
     * Options for the export related buttons, print and export. In addition
     * to the default buttons listed here, custom buttons can be added.
     * See [navigation.buttonOptions](#navigation.buttonOptions) for general
     * options.
     *
     * @type     {Highcharts.Dictionary<*>}
     * @requires modules/exporting
     */
    buttons: {
        /**
         * Options for the export button.
         *
         * In styled mode, export button styles can be applied with the
         * `.highcharts-contextbutton` class.
         *
         * @declare  Highcharts.ExportingButtonsOptionsObject
         * @extends  navigation.buttonOptions
         * @requires modules/exporting
         */
        contextButton: {
            /**
             * A click handler callback to use on the button directly instead of
             * the popup menu.
             *
             * @sample highcharts/exporting/buttons-contextbutton-onclick/
             *         Skip the menu and export the chart directly
             *
             * @type      {Function}
             * @since     2.0
             * @apioption exporting.buttons.contextButton.onclick
             */
            /**
             * See [navigation.buttonOptions.symbolFill](
             * #navigation.buttonOptions.symbolFill).
             *
             * @type      {Highcharts.ColorString}
             * @default   #666666
             * @since     2.0
             * @apioption exporting.buttons.contextButton.symbolFill
             */
            /**
             * The horizontal position of the button relative to the `align`
             * option.
             *
             * @type      {number}
             * @default   -10
             * @since     2.0
             * @apioption exporting.buttons.contextButton.x
             */
            /**
             * The class name of the context button.
             */
            className: 'highcharts-contextbutton',
            /**
             * The class name of the menu appearing from the button.
             */
            menuClassName: 'highcharts-contextmenu',
            /**
             * The symbol for the button. Points to a definition function in
             * the `Highcharts.Renderer.symbols` collection. The default
             * `menu` function is part of the exporting module. Possible
             * values are "circle", "square", "diamond", "triangle",
             * "triangle-down", "menu", "menuball" or custom shape.
             *
             * @sample highcharts/exporting/buttons-contextbutton-symbol/
             *         Use a circle for symbol
             * @sample highcharts/exporting/buttons-contextbutton-symbol-custom/
             *         Custom shape as symbol
             *
             * @type  {Highcharts.SymbolKeyValue | "menu" | "menuball" | string}
             * @since 2.0
             */
            symbol: 'menu',
            /**
             * The key to a [lang](#lang) option setting that is used for the
             * button's title tooltip. When the key is `contextButtonTitle`, it
             * refers to [lang.contextButtonTitle](#lang.contextButtonTitle)
             * that defaults to "Chart context menu".
             *
             * @since 6.1.4
             */
            titleKey: 'contextButtonTitle',
            /**
             * A collection of strings pointing to config options for the menu
             * items. The config options are defined in the
             * `menuItemDefinitions` option.
             *
             * By default, there is the "View in full screen" and "Print" menu
             * items, plus one menu item for each of the available export types.
             *
             * @sample highcharts/exporting/menuitemdefinitions/
             *         Menu item definitions
             * @sample highcharts/exporting/menuitemdefinitions-webp/
             *         Adding a custom menu item for WebP export
             *
             * @type    {Array<string>}
             * @default ["viewFullscreen", "printChart", "separator", "downloadPNG", "downloadJPEG", "downloadSVG"]
             * @since   2.0
             */
            menuItems: [
                'viewFullscreen',
                'printChart',
                'separator',
                'downloadPNG',
                'downloadJPEG',
                'downloadSVG'
            ]
        }
    },
    /**
     * An object consisting of definitions for the menu items in the context
     * menu. Each key value pair has a `key` that is referenced in the
     * [menuItems](#exporting.buttons.contextButton.menuItems) setting,
     * and a `value`, which is an object with the following properties:
     *
     * - **onclick:** The click handler for the menu item
     *
     * - **text:** The text for the menu item
     *
     * - **textKey:** If internationalization is required, the key to a language
     *   string
     *
     * Custom text for the "exitFullScreen" can be set only in lang options
     * (it is not a separate button).
     *
     * @sample highcharts/exporting/menuitemdefinitions/
     *         Menu item definitions
     * @sample highcharts/exporting/menuitemdefinitions-webp/
     *         Adding a custom menu item for WebP export
     *
     *
     * @type    {Highcharts.Dictionary<Highcharts.ExportingMenuObject>}
     * @default {"viewFullscreen": {}, "printChart": {}, "separator": {}, "downloadPNG": {}, "downloadJPEG": {}, "downloadPDF": {}, "downloadSVG": {}}
     * @since   5.0.13
     */
    menuItemDefinitions: {
        /**
         * @ignore
         */
        viewFullscreen: {
            textKey: 'viewFullscreen',
            onclick: function () {
                var _a;
                (_a = this.fullscreen) === null || _a === void 0 ? void 0 : _a.toggle();
            }
        },
        /**
         * @ignore
         */
        printChart: {
            textKey: 'printChart',
            onclick: function () {
                var _a;
                (_a = this.exporting) === null || _a === void 0 ? void 0 : _a.print();
            }
        },
        /**
         * @ignore
         */
        separator: {
            separator: true
        },
        /**
         * @ignore
         */
        downloadPNG: {
            textKey: 'downloadPNG',
            onclick: function () {
                return __awaiter(this, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, ((_a = this.exporting) === null || _a === void 0 ? void 0 : _a.exportChart())];
                            case 1:
                                _b.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            }
        },
        /**
         * @ignore
         */
        downloadJPEG: {
            textKey: 'downloadJPEG',
            onclick: function () {
                return __awaiter(this, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, ((_a = this.exporting) === null || _a === void 0 ? void 0 : _a.exportChart({
                                    type: 'image/jpeg'
                                }))];
                            case 1:
                                _b.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            }
        },
        /**
         * @ignore
         */
        downloadPDF: {
            textKey: 'downloadPDF',
            onclick: function () {
                return __awaiter(this, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, ((_a = this.exporting) === null || _a === void 0 ? void 0 : _a.exportChart({
                                    type: 'application/pdf'
                                }))];
                            case 1:
                                _b.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            }
        },
        /**
         * @ignore
         */
        downloadSVG: {
            textKey: 'downloadSVG',
            onclick: function () {
                return __awaiter(this, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, ((_a = this.exporting) === null || _a === void 0 ? void 0 : _a.exportChart({
                                    type: 'image/svg+xml'
                                }))];
                            case 1:
                                _b.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            }
        }
    }
};
// Add language
/**
 * @optionparent lang
 */
var lang = {
    /**
     * Exporting module only. The text for the menu item to view the chart
     * in full screen.
     *
     * @since 8.0.1
     */
    viewFullscreen: 'View in full screen',
    /**
     * Exporting module only. The text for the menu item to exit the chart
     * from full screen.
     *
     * @since 8.0.1
     */
    exitFullscreen: 'Exit from full screen',
    /**
     * Exporting module only. The text for the menu item to print the chart.
     *
     * @since    3.0.1
     * @requires modules/exporting
     */
    printChart: 'Print chart',
    /**
     * Exporting module only. The text for the PNG download menu item.
     *
     * @since    2.0
     * @requires modules/exporting
     */
    downloadPNG: 'Download PNG image',
    /**
     * Exporting module only. The text for the JPEG download menu item.
     *
     * @since    2.0
     * @requires modules/exporting
     */
    downloadJPEG: 'Download JPEG image',
    /**
     * Exporting module only. The text for the PDF download menu item.
     *
     * @since    2.0
     * @requires modules/exporting
     */
    downloadPDF: 'Download PDF document',
    /**
     * Exporting module only. The text for the SVG download menu item.
     *
     * @since    2.0
     * @requires modules/exporting
     */
    downloadSVG: 'Download SVG vector image',
    /**
     * Exporting module menu. The tooltip title for the context menu holding
     * print and export menu items.
     *
     * @since    3.0
     * @requires modules/exporting
     */
    contextButtonTitle: 'Chart context menu'
};
/**
 * A collection of options for buttons and menus appearing in the exporting
 * module or in Stock Tools.
 *
 * @requires     modules/exporting
 * @optionparent navigation
 */
var navigation = {
    /**
     * A collection of options for buttons appearing in the exporting
     * module.
     *
     * In styled mode, the buttons are styled with the
     * `.highcharts-contextbutton` and `.highcharts-button-symbol` classes.
     *
     * @requires modules/exporting
     */
    buttonOptions: {
        /**
         * Whether to enable buttons.
         *
         * @sample highcharts/navigation/buttonoptions-enabled/
         *         Exporting module loaded but buttons disabled
         *
         * @type      {boolean}
         * @default   true
         * @since     2.0
         * @apioption navigation.buttonOptions.enabled
         */
        /**
         * The pixel size of the symbol on the button.
         *
         * @sample highcharts/navigation/buttonoptions-height/
         *         Bigger buttons
         *
         * @since 2.0
         */
        symbolSize: 14,
        /**
         * The x position of the center of the symbol inside the button.
         *
         * @sample highcharts/navigation/buttonoptions-height/
         *         Bigger buttons
         *
         * @since 2.0
         */
        symbolX: 14.5,
        /**
         * The y position of the center of the symbol inside the button.
         *
         * @sample highcharts/navigation/buttonoptions-height/
         *         Bigger buttons
         *
         * @since 2.0
         */
        symbolY: 13.5,
        /**
         * Alignment for the buttons.
         *
         * @sample highcharts/navigation/buttonoptions-align/
         *         Center aligned
         *
         * @type  {Highcharts.AlignValue}
         * @since 2.0
         */
        align: 'right',
        /**
         * The pixel spacing between buttons, and between the context button and
         * the title.
         *
         * @sample highcharts/title/widthadjust
         *         Adjust the spacing when using text button
         *
         * @since 2.0
         */
        buttonSpacing: 5,
        /**
         * Pixel height of the buttons.
         *
         * @sample highcharts/navigation/buttonoptions-height/
         *         Bigger buttons
         *
         * @since 2.0
         */
        height: 28,
        /**
         * A text string to add to the individual button.
         *
         * @sample highcharts/exporting/buttons-text/
         *         Full text button
         * @sample highcharts/exporting/buttons-text-usehtml/
         *         Icon using CSS font in text
         * @sample highcharts/exporting/buttons-text-symbol/
         *         Combined symbol and text
         *
         * @type      {string}
         * @default   null
         * @since     3.0
         * @apioption navigation.buttonOptions.text
         */
        /**
         * Whether to use HTML for rendering the button. HTML allows for things
         * like inline CSS or image-based icons.
         *
         * @sample highcharts/exporting/buttons-text-usehtml/
         *         Icon using CSS font in text
         *
         * @type      boolean
         * @default   false
         * @since     10.3.0
         * @apioption navigation.buttonOptions.useHTML
         */
        /**
         * The vertical offset of the button's position relative to its
         * `verticalAlign`. By default adjusted for the chart title alignment.
         *
         * @sample highcharts/navigation/buttonoptions-verticalalign/
         *         Buttons at lower right
         *
         * @since     2.0
         * @apioption navigation.buttonOptions.y
         */
        y: -5,
        /**
         * The vertical alignment of the buttons. Can be one of `"top"`,
         * `"middle"` or `"bottom"`.
         *
         * @sample highcharts/navigation/buttonoptions-verticalalign/
         *         Buttons at lower right
         *
         * @type  {Highcharts.VerticalAlignValue}
         * @since 2.0
         */
        verticalAlign: 'top',
        /**
         * The pixel width of the button.
         *
         * @sample highcharts/navigation/buttonoptions-height/
         *         Bigger buttons
         *
         * @since 2.0
         */
        width: 28,
        /**
         * Fill color for the symbol within the button.
         *
         * @sample highcharts/navigation/buttonoptions-symbolfill/
         *         Blue symbol stroke for one of the buttons
         *
         * @type  {Highcharts.ColorString | Highcharts.GradientColorObject | Highcharts.PatternObject}
         * @since 2.0
         */
        symbolFill: "#666666" /* Palette.neutralColor60 */,
        /**
         * The color of the symbol's stroke or line.
         *
         * @sample highcharts/navigation/buttonoptions-symbolstroke/
         *         Blue symbol stroke
         *
         * @type  {Highcharts.ColorString}
         * @since 2.0
         */
        symbolStroke: "#666666" /* Palette.neutralColor60 */,
        /**
         * The pixel stroke width of the symbol on the button.
         *
         * @sample highcharts/navigation/buttonoptions-height/
         *         Bigger buttons
         *
         * @since 2.0
         */
        symbolStrokeWidth: 3,
        /**
         * A configuration object for the button theme. The object accepts
         * SVG properties like `stroke-width`, `stroke` and `fill`.
         * Tri-state button styles are supported by the `states.hover` and
         * `states.select` objects.
         *
         * @sample highcharts/navigation/buttonoptions-theme/
         *         Theming the buttons
         *
         * @requires modules/exporting
         *
         * @since 3.0
         */
        theme: {
            /**
             * The default fill exists only to capture hover events.
             *
             * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             */
            fill: "#ffffff" /* Palette.backgroundColor */,
            /**
             * Padding for the button.
             */
            padding: 5,
            /**
             * Default stroke for the buttons.
             *
             * @type {Highcharts.ColorString}
             */
            stroke: 'none',
            /**
             * Default stroke linecap for the buttons.
             */
            'stroke-linecap': 'round'
        }
    },
    /**
     * CSS styles for the popup menu appearing by default when the export
     * icon is clicked. This menu is rendered in HTML.
     *
     * @see In styled mode, the menu is styled with the `.highcharts-menu`
     *      class.
     *
     * @sample highcharts/navigation/menustyle/
     *         Light gray menu background
     *
     * @type    {Highcharts.CSSObject}
     * @default {"background": "#ffffff", "borderRadius": "3px", "padding": "0.5em"}
     * @since   2.0
     */
    menuStyle: {
        /** @ignore-option */
        border: 'none',
        /** @ignore-option */
        borderRadius: '3px',
        /** @ignore-option */
        background: "#ffffff" /* Palette.backgroundColor */,
        /** @ignore-option */
        padding: '0.5em'
    },
    /**
     * CSS styles for the individual items within the popup menu appearing
     * by default when the export icon is clicked. The menu items are
     * rendered in HTML. Font size defaults to `11px` on desktop and `14px`
     * on touch devices.
     *
     * @see In styled mode, the menu items are styled with the
     *      `.highcharts-menu-item` class.
     *
     * @sample {highcharts} highcharts/navigation/menuitemstyle/
     *         Add a grey stripe to the left
     *
     * @type    {Highcharts.CSSObject}
     * @default {"padding": "0.5em", "color": "#333333", "background": "none", "borderRadius": "3px", "fontSize": "0.8em", "transition": "background 250ms, color 250ms"}
     * @since   2.0
     */
    menuItemStyle: {
        /** @ignore-option */
        background: 'none',
        /** @ignore-option */
        borderRadius: '3px',
        /** @ignore-option */
        color: "#333333" /* Palette.neutralColor80 */,
        /** @ignore-option */
        padding: '0.5em',
        /** @ignore-option */
        fontSize: isTouchDevice ? '0.9em' : '0.8em',
        /** @ignore-option */
        transition: 'background 250ms, color 250ms'
    },
    /**
     * CSS styles for the hover state of the individual items within the
     * popup menu appearing by default when the export icon is clicked. The
     * menu items are rendered in HTML.
     *
     * @see In styled mode, the menu items are styled with the
     *      `.highcharts-menu-item` class.
     *
     * @sample highcharts/navigation/menuitemhoverstyle/
     *         Bold text on hover
     *
     * @type    {Highcharts.CSSObject}
     * @default {"background": "#f2f2f2" }
     * @since   2.0
     */
    menuItemHoverStyle: {
        /** @ignore-option */
        background: "#f2f2f2" /* Palette.neutralColor5 */
    }
};
/* *
 *
 *  Default Export
 *
 * */
var ExportingDefaults = {
    exporting: exporting,
    lang: lang,
    navigation: navigation
};
/* harmony default export */ var Exporting_ExportingDefaults = (ExportingDefaults);

;// ./code/es5/es-modules/Extensions/Exporting/ExportingSymbols.js
/* *
 *
 *  Exporting module
 *
 *  (c) 2010-2025 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */

/* *
 *
 *  Composition
 *
 * */
var ExportingSymbols;
(function (ExportingSymbols) {
    /* *
     *
     *  Constants
     *
     * */
    var modifiedClasses = [];
    /* *
     *
     *  Functions
     *
     * */
    /* eslint-disable valid-jsdoc */
    /**
     * @private
     */
    function compose(SVGRendererClass) {
        if (modifiedClasses.indexOf(SVGRendererClass) === -1) {
            modifiedClasses.push(SVGRendererClass);
            var symbols = SVGRendererClass.prototype.symbols;
            symbols.menu = menu;
            symbols.menuball = menuball.bind(symbols);
        }
    }
    ExportingSymbols.compose = compose;
    /**
     * @private
     */
    function menu(x, y, width, height) {
        var arr = [
                ['M',
            x,
            y + 2.5],
                ['L',
            x + width,
            y + 2.5],
                ['M',
            x,
            y + height / 2 + 0.5],
                ['L',
            x + width,
            y + height / 2 + 0.5],
                ['M',
            x,
            y + height - 1.5],
                ['L',
            x + width,
            y + height - 1.5]
            ];
        return arr;
    }
    /**
     * @private
     */
    function menuball(x, y, width, height) {
        var h = (height / 3) - 2;
        var path = [];
        path = path.concat(this.circle(width - h, y, h, h), this.circle(width - h, y + h + 4, h, h), this.circle(width - h, y + 2 * (h + 4), h, h));
        return path;
    }
})(ExportingSymbols || (ExportingSymbols = {}));
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ var Exporting_ExportingSymbols = (ExportingSymbols);

;// ./code/es5/es-modules/Extensions/Exporting/Fullscreen.js
/* *
 *
 *  (c) 2009-2025 Rafal Sebestjanski
 *
 *  Full screen for Highcharts
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
/**
 * The module allows user to enable display chart in full screen mode.
 * Used in StockTools too.
 * Based on default solutions in browsers.
 */



var composed = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).composed;

var addEvent = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).addEvent, fireEvent = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).fireEvent, pushUnique = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).pushUnique;
/* *
 *
 *  Functions
 *
 * */
/**
 * @private
 */
function onChartBeforeRender() {
    /**
     * @name Highcharts.Chart#fullscreen
     * @type {Highcharts.Fullscreen}
     * @requires modules/full-screen
     */
    this.fullscreen = new Fullscreen(this);
}
/* *
 *
 *  Class
 *
 * */
/**
 * Handles displaying chart's container in the fullscreen mode.
 *
 * **Note**: Fullscreen is not supported on iPhone due to iOS limitations.
 *
 * @class
 * @name Highcharts.Fullscreen
 *
 * @requires modules/exporting
 */
var Fullscreen = /** @class */ (function () {
    /* *
     *
     *  Constructors
     *
     * */
    function Fullscreen(chart) {
        /**
         * Chart managed by the fullscreen controller.
         * @name Highcharts.Fullscreen#chart
         * @type {Highcharts.Chart}
         */
        this.chart = chart;
        /**
         * The flag is set to `true` when the chart is displayed in
         * the fullscreen mode.
         *
         * @name Highcharts.Fullscreen#isOpen
         * @type {boolean | undefined}
         * @since 8.0.1
         */
        this.isOpen = false;
        var container = chart.renderTo;
        // Hold event and methods available only for a current browser.
        if (!this.browserProps) {
            if (typeof container.requestFullscreen === 'function') {
                this.browserProps = {
                    fullscreenChange: 'fullscreenchange',
                    requestFullscreen: 'requestFullscreen',
                    exitFullscreen: 'exitFullscreen'
                };
            }
            else if (container.mozRequestFullScreen) {
                this.browserProps = {
                    fullscreenChange: 'mozfullscreenchange',
                    requestFullscreen: 'mozRequestFullScreen',
                    exitFullscreen: 'mozCancelFullScreen'
                };
            }
            else if (container.webkitRequestFullScreen) {
                this.browserProps = {
                    fullscreenChange: 'webkitfullscreenchange',
                    requestFullscreen: 'webkitRequestFullScreen',
                    exitFullscreen: 'webkitExitFullscreen'
                };
            }
            else if (container.msRequestFullscreen) {
                this.browserProps = {
                    fullscreenChange: 'MSFullscreenChange',
                    requestFullscreen: 'msRequestFullscreen',
                    exitFullscreen: 'msExitFullscreen'
                };
            }
        }
    }
    /* *
     *
     *  Static Functions
     *
     * */
    /**
     * Prepares the chart class to support fullscreen.
     *
     * @param {typeof_Highcharts.Chart} ChartClass
     * The chart class to decorate with fullscreen support.
     */
    Fullscreen.compose = function (ChartClass) {
        if (pushUnique(composed, 'Fullscreen')) {
            // Initialize fullscreen
            addEvent(ChartClass, 'beforeRender', onChartBeforeRender);
        }
    };
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Stops displaying the chart in fullscreen mode.
     * Exporting module required.
     *
     * @since       8.0.1
     *
     * @function    Highcharts.Fullscreen#close
     * @return      {void}
     * @requires    modules/full-screen
     */
    Fullscreen.prototype.close = function () {
        var fullscreen = this,
            chart = fullscreen.chart,
            optionsChart = chart.options.chart;
        fireEvent(chart, 'fullscreenClose', null, function () {
            // Don't fire exitFullscreen() when user exited
            // using 'Escape' button.
            if (fullscreen.isOpen &&
                fullscreen.browserProps &&
                chart.container.ownerDocument instanceof Document) {
                chart.container.ownerDocument[fullscreen.browserProps.exitFullscreen]();
            }
            // Unbind event as it's necessary only before exiting
            // from fullscreen.
            if (fullscreen.unbindFullscreenEvent) {
                fullscreen.unbindFullscreenEvent = fullscreen
                    .unbindFullscreenEvent();
            }
            chart.setSize(fullscreen.origWidth, fullscreen.origHeight, false);
            fullscreen.origWidth = void 0;
            fullscreen.origHeight = void 0;
            optionsChart.width = fullscreen.origWidthOption;
            optionsChart.height = fullscreen.origHeightOption;
            fullscreen.origWidthOption = void 0;
            fullscreen.origHeightOption = void 0;
            fullscreen.isOpen = false;
            fullscreen.setButtonText();
        });
    };
    /**
     * Displays the chart in fullscreen mode.
     * When fired customly by user before exporting context button is created,
     * button's text will not be replaced - it's on the user side.
     * Exporting module required.
     *
     * @since       8.0.1
     *
     * @function Highcharts.Fullscreen#open
     * @return      {void}
     * @requires    modules/full-screen
     */
    Fullscreen.prototype.open = function () {
        var fullscreen = this,
            chart = fullscreen.chart,
            optionsChart = chart.options.chart;
        fireEvent(chart, 'fullscreenOpen', null, function () {
            if (optionsChart) {
                fullscreen.origWidthOption = optionsChart.width;
                fullscreen.origHeightOption = optionsChart.height;
            }
            fullscreen.origWidth = chart.chartWidth;
            fullscreen.origHeight = chart.chartHeight;
            // Handle exitFullscreen() method when user clicks 'Escape' button.
            if (fullscreen.browserProps) {
                var unbindChange_1 = addEvent(chart.container.ownerDocument, // Chart's document
                    fullscreen.browserProps.fullscreenChange,
                    function () {
                        // Handle lack of async of browser's
                        // fullScreenChange event.
                        if (fullscreen.isOpen) {
                            fullscreen.isOpen = false;
                        fullscreen.close();
                    }
                    else {
                        chart.setSize(null, null, false);
                        fullscreen.isOpen = true;
                        fullscreen.setButtonText();
                    }
                });
                var unbindDestroy_1 = addEvent(chart, 'destroy',
                    unbindChange_1);
                fullscreen.unbindFullscreenEvent = function () {
                    unbindChange_1();
                    unbindDestroy_1();
                };
                var promise = chart.renderTo[fullscreen.browserProps.requestFullscreen]();
                if (promise) {
                    promise['catch'](function () {
                        alert(// eslint-disable-line no-alert
                        'Full screen is not supported inside a frame.');
                    });
                }
            }
        });
    };
    /**
     * Replaces the exporting context button's text when toogling the
     * fullscreen mode.
     *
     * @private
     *
     * @since 8.0.1
     *
     * @requires modules/full-screen
     */
    Fullscreen.prototype.setButtonText = function () {
        var _a;
        var chart = this.chart,
            exportDivElements = (_a = chart.exporting) === null || _a === void 0 ? void 0 : _a.divElements,
            exportingOptions = chart.options.exporting,
            menuItems = (exportingOptions &&
                exportingOptions.buttons &&
                exportingOptions.buttons.contextButton.menuItems),
            lang = chart.options.lang;
        if (exportingOptions &&
            exportingOptions.menuItemDefinitions &&
            lang &&
            lang.exitFullscreen &&
            lang.viewFullscreen &&
            menuItems &&
            exportDivElements) {
            var exportDivElement = exportDivElements[menuItems.indexOf('viewFullscreen')];
            if (exportDivElement) {
                highcharts_AST_commonjs_highcharts_AST_commonjs2_highcharts_AST_root_Highcharts_AST_default().setElementHTML(exportDivElement, !this.isOpen ?
                    (exportingOptions.menuItemDefinitions.viewFullscreen
                        .text ||
                        lang.viewFullscreen) : lang.exitFullscreen);
            }
        }
    };
    /**
     * Toggles displaying the chart in fullscreen mode.
     * By default, when the exporting module is enabled, a context button with
     * a drop down menu in the upper right corner accesses this function.
     * Exporting module required.
     *
     * @since 8.0.1
     *
     * @sample      highcharts/members/chart-togglefullscreen/
     *              Toggle fullscreen mode from a HTML button
     *
     * @function Highcharts.Fullscreen#toggle
     * @requires    modules/full-screen
     */
    Fullscreen.prototype.toggle = function () {
        var fullscreen = this;
        if (!fullscreen.isOpen) {
            fullscreen.open();
        }
        else {
            fullscreen.close();
        }
    };
    return Fullscreen;
}());
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ var Exporting_Fullscreen = (Fullscreen);
/* *
 *
 *  API Declarations
 *
 * */
/**
 * Gets fired when closing the fullscreen
 *
 * @callback Highcharts.FullScreenfullscreenCloseCallbackFunction
 *
 * @param {Highcharts.Chart} chart
 *        The chart on which the event occurred.
 *
 * @param {global.Event} event
 *        The event that occurred.
 */
/**
 * Gets fired when opening the fullscreen
 *
 * @callback Highcharts.FullScreenfullscreenOpenCallbackFunction
 *
 * @param {Highcharts.Chart} chart
 *        The chart on which the event occurred.
 *
 * @param {global.Event} event
 *        The event that occurred.
 */
(''); // Keeps doclets above separated from following code
/* *
 *
 *  API Options
 *
 * */
/**
 * Fires when a fullscreen is closed through the context menu item,
 * or a fullscreen is closed on the `Escape` button click,
 * or the `Chart.fullscreen.close` method.
 *
 * @sample highcharts/chart/events-fullscreen
 *         Title size change on fullscreen open
 *
 * @type      {Highcharts.FullScreenfullscreenCloseCallbackFunction}
 * @since     10.1.0
 * @context   Highcharts.Chart
 * @requires  modules/full-screen
 * @apioption chart.events.fullscreenClose
 */
/**
 * Fires when a fullscreen is opened through the context menu item,
 * or the `Chart.fullscreen.open` method.
 *
 * @sample highcharts/chart/events-fullscreen
 *         Title size change on fullscreen open
 *
 * @type      {Highcharts.FullScreenfullscreenOpenCallbackFunction}
 * @since     10.1.0
 * @context   Highcharts.Chart
 * @requires  modules/full-screen
 * @apioption chart.events.fullscreenOpen
 */
(''); // Keeps doclets above in transpiled file

;// ./code/es5/es-modules/Core/HttpUtilities.js
/* *
 *
 *  (c) 2010-2025 Christer Vasseng, Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */

var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var HttpUtilities_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var HttpUtilities_generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0,
        sent: function() { if (t[0] & 1) throw t[1]; return t[1]; },
        trys: [],
        ops: [] },
        f,
        y,
        t,
        g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

var HttpUtilities_win = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).win;

var discardElement = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).discardElement, objectEach = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).objectEach;
/* *
 *
 *  Functions
 *
 * */
/**
 * Perform an Ajax call.
 *
 * @function Highcharts.ajax
 *
 * @param {Highcharts.AjaxSettingsObject} settings
 * The Ajax settings to use.
 *
 * @return {false | undefined}
 * Returns false, if error occurred.
 */
function ajax(settings) {
    var _a;
    var headers = {
            json: 'application/json',
            xml: 'application/xml',
            text: 'text/plain',
            octet: 'application/octet-stream'
        },
        r = new XMLHttpRequest();
    /**
     * Private error handler.
     *
     * @private
     *
     * @param {XMLHttpRequest} xhr
     * Internal request object.
     * @param {string | Error} err
     * Occurred error.
     */
    function handleError(xhr, err) {
        if (settings.error) {
            settings.error(xhr, err);
        }
        else {
            // @todo Maybe emit a highcharts error event here
        }
    }
    if (!settings.url) {
        return false;
    }
    r.open((settings.type || 'get').toUpperCase(), settings.url, true);
    if (!((_a = settings.headers) === null || _a === void 0 ? void 0 : _a['Content-Type'])) {
        r.setRequestHeader('Content-Type', headers[settings.dataType || 'json'] || headers.text);
    }
    objectEach(settings.headers, function (val, key) {
        r.setRequestHeader(key, val);
    });
    if (settings.responseType) {
        r.responseType = settings.responseType;
    }
    // @todo lacking timeout handling
    r.onreadystatechange = function () {
        var _a;
        var res;
        if (r.readyState === 4) {
            if (r.status === 200) {
                if (settings.responseType !== 'blob') {
                    res = r.responseText;
                    if (settings.dataType === 'json') {
                        try {
                            res = JSON.parse(res);
                        }
                        catch (e) {
                            if (e instanceof Error) {
                                return handleError(r, e);
                            }
                        }
                    }
                }
                return (_a = settings.success) === null || _a === void 0 ? void 0 : _a.call(settings, res, r);
            }
            handleError(r, r.responseText);
        }
    };
    if (settings.data && typeof settings.data !== 'string') {
        settings.data = JSON.stringify(settings.data);
    }
    r.send(settings.data);
}
/**
 * Get a JSON resource over XHR, also supporting CORS without preflight.
 *
 * @function Highcharts.getJSON
 *
 * @param {string} url
 * The URL to load.
 * @param {Function} success
 * The success callback. For error handling, use the `Highcharts.ajax` function
 * instead.
 */
function getJSON(url, success) {
    HttpUtilities.ajax({
        url: url,
        success: success,
        dataType: 'json',
        headers: {
            // Override the Content-Type to avoid preflight problems with CORS
            // in the Highcharts demos
            'Content-Type': 'text/plain'
        }
    });
}
/**
 * The post utility.
 *
 * @private
 * @function Highcharts.post
 *
 * @param {string} url
 * Post URL.
 * @param {Object} data
 * Post data.
 * @param {RequestInit} [fetchOptions]
 * Additional attributes for the post request.
 */
function post(url, data, fetchOptions) {
    return HttpUtilities_awaiter(this, void 0, void 0, function () {
        var formData,
            response,
            text,
            link;
        return HttpUtilities_generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    formData = new HttpUtilities_win.FormData();
                    // Add the data to the form
                    objectEach(data, function (value, name) {
                        formData.append(name, value);
                    });
                    formData.append('b64', 'true');
                    return [4 /*yield*/, HttpUtilities_win.fetch(url, __assign({ method: 'POST', body: formData }, fetchOptions))];
                case 1:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.text()];
                case 2:
                    text = _a.sent();
                    link = document.createElement('a');
                    link.href = "data:".concat(data.type, ";base64,").concat(text);
                    link.download = data.filename;
                    link.click();
                    // Remove the link
                    discardElement(link);
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
/* *
 *
 *  Default Export
 *
 * */
var HttpUtilities = {
    ajax: ajax,
    getJSON: getJSON,
    post: post
};
/* harmony default export */ var Core_HttpUtilities = (HttpUtilities);
/* *
 *
 *  API Declarations
 *
 * */
/**
 * @interface Highcharts.AjaxSettingsObject
 */ /**
* The payload to send.
*
* @name Highcharts.AjaxSettingsObject#data
* @type {string | Highcharts.Dictionary<any> | undefined}
*/ /**
* The data type expected.
*
* @name Highcharts.AjaxSettingsObject#dataType
* @type {"json" | "xml" | "text" | "octet" | undefined}
*/ /**
* Function to call on error.
*
* @name Highcharts.AjaxSettingsObject#error
* @type {Function | undefined}
*/ /**
* The headers; keyed on header name.
*
* @name Highcharts.AjaxSettingsObject#headers
* @type {Highcharts.Dictionary<string> | undefined}
*/ /**
* Function to call on success.
*
* @name Highcharts.AjaxSettingsObject#success
* @type {Function | undefined}
*/ /**
* The HTTP method to use. For example GET or POST.
*
* @name Highcharts.AjaxSettingsObject#type
* @type {string | undefined}
*/ /**
* The URL to call.
*
* @name Highcharts.AjaxSettingsObject#url
* @type {string}
*/
(''); // Keeps doclets above in JS file

;// ./code/es5/es-modules/Extensions/Exporting/Exporting.js
/* *
 *
 *  Exporting module
 *
 *  (c) 2010-2025 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */

var Exporting_assign = (undefined && undefined.__assign) || function () {
    Exporting_assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return Exporting_assign.apply(this, arguments);
};
var Exporting_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var Exporting_generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0,
        sent: function() { if (t[0] & 1) throw t[1]; return t[1]; },
        trys: [],
        ops: [] },
        f,
        y,
        t,
        g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};




var defaultOptions = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).defaultOptions, setOptions = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).setOptions;

var Exporting_downloadURL = Extensions_DownloadURL.downloadURL, Exporting_getScript = Extensions_DownloadURL.getScript;




var Exporting_composed = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).composed, Exporting_doc = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).doc, isFirefox = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).isFirefox, isMS = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).isMS, Exporting_isSafari = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).isSafari, SVG_NS = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).SVG_NS, Exporting_win = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).win;


var Exporting_addEvent = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).addEvent, Exporting_clearTimeout = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).clearTimeout, createElement = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).createElement, css = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).css, Exporting_discardElement = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).discardElement, Exporting_error = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).error, extend = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).extend, find = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).find, Exporting_fireEvent = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).fireEvent, isObject = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).isObject, merge = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).merge, Exporting_objectEach = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).objectEach, pick = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).pick, Exporting_pushUnique = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).pushUnique, removeEvent = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).removeEvent, splat = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).splat, uniqueKey = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).uniqueKey;
highcharts_AST_commonjs_highcharts_AST_commonjs2_highcharts_AST_root_Highcharts_AST_default().allowedAttributes.push('data-z-index', 'fill-opacity', 'filter', 'preserveAspectRatio', 'rx', 'ry', 'stroke-dasharray', 'stroke-linejoin', 'stroke-opacity', 'text-anchor', 'transform', 'transform-origin', 'version', 'viewBox', 'visibility', 'xmlns', 'xmlns:xlink');
highcharts_AST_commonjs_highcharts_AST_commonjs2_highcharts_AST_root_Highcharts_AST_default().allowedTags.push('desc', 'clippath', 'fedropshadow', 'femorphology', 'g', 'image');
/* *
 *
 *  Constants
 *
 * */
var Exporting_domurl = Exporting_win.URL || Exporting_win.webkitURL || Exporting_win;
/* *
 *
 *  Class
 *
 * */
/**
 * The Exporting class provides methods for exporting charts to images. If the
 * exporting module is loaded, this class is instantiated on the chart and
 * available through the `chart.exporting` property. Read more about the
 * [exporting module](https://www.highcharts.com/docs/export-module-overview).
 *
 * @class
 * @name Highcharts.Exporting
 *
 * @param {Highcharts.Chart} chart
 * The chart instance.
 *
 */
var Exporting = /** @class */ (function () {
    /* *
     *
     *  Constructor
     *
     * */
    function Exporting(chart, options) {
        this.options = {};
        this.chart = chart;
        this.options = options;
        this.btnCount = 0;
        this.buttonOffset = 0;
        this.divElements = [];
        this.svgElements = [];
    }
    /* *
     *
     *  Static Functions
     *
     * */
    /**
     * Make hyphenated property names out of camelCase.
     *
     * @private
     * @static
     * @function Highcharts.Exporting#hyphenate
     *
     * @param {string} property
     * Property name in camelCase.
     *
     * @return {string}
     * Hyphenated property name.
     *
     * @requires modules/exporting
     */
    Exporting.hyphenate = function (property) {
        return property.replace(/[A-Z]/g, function (match) {
            return '-' + match.toLowerCase();
        });
    };
    /**
     * Get data:URL from image URL.
     *
     * @private
     * @static
     * @async
     * @function Highcharts.Exporting#imageToDataURL
     *
     * @param {string} imageURL
     * The address or URL of the image.
     * @param {number} scale
     * The scale of the image.
     * @param {string} imageType
     * The export type of the image.
     *
     * @requires modules/exporting
     */
    Exporting.imageToDataURL = function (imageURL, scale, imageType) {
        return Exporting_awaiter(this, void 0, void 0, function () {
            var img,
                canvas,
                ctx;
            return Exporting_generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Exporting.loadImage(imageURL)];
                    case 1:
                        img = _a.sent(), canvas = Exporting_doc.createElement('canvas'), ctx = canvas === null || canvas === void 0 ? void 0 : canvas.getContext('2d');
                        if (!ctx) {
                            throw new Error('No canvas found!');
                        }
                        else {
                            canvas.height = img.height * scale;
                            canvas.width = img.width * scale;
                            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                            // Now we try to get the contents of the canvas
                            return [2 /*return*/, canvas.toDataURL(imageType)];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Exporting.fetchCSS = function (href) {
        return Exporting_awaiter(this, void 0, void 0, function () {
            var content,
                newSheet;
            return Exporting_generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(href)
                            .then(function (res) { return res.text(); })];
                    case 1:
                        content = _a.sent();
                        newSheet = new CSSStyleSheet();
                        newSheet.replaceSync(content);
                        return [2 /*return*/, newSheet];
                }
            });
        });
    };
    Exporting.handleStyleSheet = function (sheet, resultArray) {
        return Exporting_awaiter(this, void 0, void 0, function () {
            var _loop_1,
                _i,
                _a,
                rule,
                _b,
                newSheet;
            return Exporting_generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 5, , 9]);
                        _loop_1 = function (rule) {
                            var sheet_1,
                                cssText,
                                baseUrl_1,
                                regexp;
                            return Exporting_generator(this, function (_d) {
                                switch (_d.label) {
                                    case 0:
                                        if (!(rule instanceof CSSImportRule)) return [3 /*break*/, 3];
                                        return [4 /*yield*/, Exporting.fetchCSS(rule.href)];
                                    case 1:
                                        sheet_1 = _d.sent();
                                        return [4 /*yield*/, Exporting.handleStyleSheet(sheet_1, resultArray)];
                                    case 2:
                                        _d.sent();
                                        _d.label = 3;
                                    case 3:
                                        if (rule instanceof CSSFontFaceRule) {
                                            cssText = rule.cssText;
                                            if (sheet.href) {
                                                baseUrl_1 = sheet.href, regexp = /url\(\s*(['"]?)(?![a-z]+:|\/\/)([^'")]+?)\1\s*\)/gi;
                                                // Replace relative URLs
                                                cssText = cssText.replace(regexp, function (_, quote, relPath) {
                                                    var absolutePath = new URL(relPath,
                                                        baseUrl_1).href;
                                                    return "url(".concat(quote).concat(absolutePath).concat(quote, ")");
                                                });
                                            }
                                            resultArray.push(cssText);
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        };
                        _i = 0, _a = Array.from(sheet.cssRules);
                        _c.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        rule = _a[_i];
                        return [5 /*yield**/, _loop_1(rule)];
                    case 2:
                        _c.sent();
                        _c.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [3 /*break*/, 9];
                    case 5:
                        _b = _c.sent();
                        if (!sheet.href) return [3 /*break*/, 8];
                        return [4 /*yield*/, Exporting.fetchCSS(sheet.href)];
                    case 6:
                        newSheet = _c.sent();
                        return [4 /*yield*/, Exporting.handleStyleSheet(newSheet, resultArray)];
                    case 7:
                        _c.sent();
                        _c.label = 8;
                    case 8: return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    Exporting.fetchStyleSheets = function () {
        return Exporting_awaiter(this, void 0, void 0, function () {
            var cssTexts,
                _i,
                _a,
                sheet;
            return Exporting_generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        cssTexts = [];
                        _i = 0, _a = Array.from(Exporting_doc.styleSheets);
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        sheet = _a[_i];
                        return [4 /*yield*/, Exporting.handleStyleSheet(sheet, cssTexts)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, cssTexts];
                }
            });
        });
    };
    Exporting.inlineFonts = function (svg) {
        return Exporting_awaiter(this, void 0, void 0, function () {
            var cssTexts,
                urlRegex,
                urls,
                cssText,
                match,
                m,
                arrayBufferToBase64,
                replacements,
                _i,
                urls_1,
                url,
                res,
                contentType,
                b64,
                _a,
                _b,
                styleEl;
            return Exporting_generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, Exporting.fetchStyleSheets()];
                    case 1:
                        cssTexts = _c.sent(), urlRegex = /url\(([^)]+)\)/g, urls = [];
                        cssText = cssTexts.join('\n');
                        while ((match = urlRegex.exec(cssText))) {
                            m = match[1].replace(/['"]/g, '');
                            if (!urls.includes(m)) {
                                urls.push(m);
                            }
                        }
                        arrayBufferToBase64 = function (buffer) {
                            var binary = '';
                            var bytes = new Uint8Array(buffer);
                            for (var i = 0; i < bytes.byteLength; i++) {
                                binary += String.fromCharCode(bytes[i]);
                            }
                            return btoa(binary);
                        };
                        replacements = {};
                        _i = 0, urls_1 = urls;
                        _c.label = 2;
                    case 2:
                        if (!(_i < urls_1.length)) return [3 /*break*/, 8];
                        url = urls_1[_i];
                        _c.label = 3;
                    case 3:
                        _c.trys.push([3, 6, , 7]);
                        return [4 /*yield*/, fetch(url)];
                    case 4:
                        res = _c.sent(), contentType = res.headers.get('Content-Type') || '';
                        _a = arrayBufferToBase64;
                        return [4 /*yield*/, res.arrayBuffer()];
                    case 5:
                        b64 = _a.apply(void 0, [_c.sent()]);
                        replacements[url] = "data:".concat(contentType, ";base64,").concat(b64);
                        return [3 /*break*/, 7];
                    case 6:
                        _b = _c.sent();
                        return [3 /*break*/, 7];
                    case 7:
                        _i++;
                        return [3 /*break*/, 2];
                    case 8:
                        cssText = cssText.replace(urlRegex, function (_, url) {
                            var strippedUrl = url.replace(/['"]/g, '');
                            return "url(".concat(replacements[strippedUrl] || strippedUrl, ")");
                        });
                        styleEl = document.createElementNS('http://www.w3.org/2000/svg', 'style');
                        styleEl.textContent = cssText;
                        // Needs to be appended to pass sanitization
                        svg.append(styleEl);
                        return [2 /*return*/, svg];
                }
            });
        });
    };
    /**
     * Loads an image from the provided URL.
     *
     * @private
     * @static
     * @function Highcharts.Exporting#loadImage
     *
     * @param {string} imageURL
     * The address or URL of the image.
     *
     * @return {Promise<HTMLImageElement>}
     * Returns a Promise that resolves with the loaded HTMLImageElement.
     *
     * @requires modules/exporting
     */
    Exporting.loadImage = function (imageURL) {
        return new Promise(function (resolve, reject) {
            // Create an image
            var image = new Exporting_win.Image();
            // Must be set prior to loading image source
            image.crossOrigin = 'Anonymous';
            // Return the image in case of success
            image.onload = function () {
                // IE bug where image is not always ready despite load event
                setTimeout(function () {
                    resolve(image);
                }, Exporting.loadEventDeferDelay);
            };
            // Reject in case of fail
            image.onerror = function (error) {
                // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
                reject(error);
            };
            // Provide the image URL
            image.src = imageURL;
        });
    };
    /**
     * Prepares and returns the image export options with default values where
     * necessary.
     *
     * @private
     * @static
     * @function Highcharts.Exporting#prepareImageOptions
     *
     * @param {Highcharts.ExportingOptions} exportingOptions
     * The exporting options.
     *
     * @return {Exporting.ImageOptions}
     * The finalized image export options with ensured values.
     *
     * @requires modules/exporting
     */
    Exporting.prepareImageOptions = function (exportingOptions) {
        var _a;
        var type = (exportingOptions === null || exportingOptions === void 0 ? void 0 : exportingOptions.type) || 'image/png',
            libURL = ((exportingOptions === null || exportingOptions === void 0 ? void 0 : exportingOptions.libURL) ||
                ((_a = defaultOptions.exporting) === null || _a === void 0 ? void 0 : _a.libURL));
        return {
            type: type,
            filename: (((exportingOptions === null || exportingOptions === void 0 ? void 0 : exportingOptions.filename) || 'chart') +
                '.' +
                (type === 'image/svg+xml' ? 'svg' : type.split('/')[1])),
            scale: (exportingOptions === null || exportingOptions === void 0 ? void 0 : exportingOptions.scale) || 1,
            // Allow libURL to end with or without fordward slash
            libURL: (libURL === null || libURL === void 0 ? void 0 : libURL.slice(-1)) !== '/' ? libURL + '/' : libURL
        };
    };
    /**
     * A collection of fixes on the produced SVG to account for expand
     * properties and browser bugs. Returns a cleaned SVG.
     *
     * @private
     * @static
     * @function Highcharts.Exporting#sanitizeSVG
     *
     * @param {string} svg
     * SVG code to sanitize.
     * @param {Highcharts.Options} options
     * Chart options to apply.
     *
     * @return {string}
     * Sanitized SVG code.
     *
     * @requires modules/exporting
     */
    Exporting.sanitizeSVG = function (svg, options) {
        var _a;
        var split = svg.indexOf('</svg>') + 6, useForeignObject = svg.indexOf('<foreignObject') > -1;
        var html = svg.substr(split);
        // Remove any HTML added to the container after the SVG (#894, #9087)
        svg = svg.substr(0, split);
        if (useForeignObject) {
            // Some tags needs to be closed in xhtml (#13726)
            svg = svg.replace(/(<(?:img|br).*?(?=\>))>/g, '$1 />');
            // Move HTML into a foreignObject
        }
        else if (html && ((_a = options === null || options === void 0 ? void 0 : options.exporting) === null || _a === void 0 ? void 0 : _a.allowHTML)) {
            html = '<foreignObject x="0" y="0" ' +
                'width="' + options.chart.width + '" ' +
                'height="' + options.chart.height + '">' +
                '<body xmlns="http://www.w3.org/1999/xhtml">' +
                // Some tags needs to be closed in xhtml (#13726)
                html.replace(/(<(?:img|br).*?(?=\>))>/g, '$1 />') +
                '</body>' +
                '</foreignObject>';
            svg = svg.replace('</svg>', html + '</svg>');
        }
        svg = svg
            .replace(/zIndex="[^"]+"/g, '')
            .replace(/symbolName="[^"]+"/g, '')
            .replace(/jQuery\d+="[^"]+"/g, '')
            .replace(/url\(("|&quot;)(.*?)("|&quot;)\;?\)/g, 'url($2)')
            .replace(/url\([^#]+#/g, 'url(#')
            .replace(/<svg /, '<svg xmlns:xlink="http://www.w3.org/1999/xlink" ')
            .replace(/ (NS\d+\:)?href=/g, ' xlink:href=') // #3567
            .replace(/\n+/g, ' ')
            // Replace HTML entities, issue #347
            .replace(/&nbsp;/g, '\u00A0') // No-break space
            .replace(/&shy;/g, '\u00AD'); // Soft hyphen
        return svg;
    };
    /**
     * Get blob URL from SVG code. Falls back to normal data URI.
     *
     * @private
     * @static
     * @function Highcharts.Exporting#svgToDataURL
     *
     * @param {string} svg
     * SVG to get the URL from.
     *
     * @return {string}
     * The data URL.
     *
     * @requires modules/exporting
     */
    Exporting.svgToDataURL = function (svg) {
        // Webkit and not chrome
        var userAgent = Exporting_win.navigator.userAgent;
        var webKit = (userAgent.indexOf('WebKit') > -1 &&
                userAgent.indexOf('Chrome') < 0);
        try {
            // Safari requires data URI since it doesn't allow navigation to
            // blob URLs. ForeignObjects also don't work well in Blobs in Chrome
            // (#14780).
            if (!webKit && svg.indexOf('<foreignObject') === -1) {
                return Exporting_domurl.createObjectURL(new Exporting_win.Blob([svg], {
                    type: 'image/svg+xml;charset-utf-16'
                }));
            }
        }
        catch (_a) {
            // Ignore
        }
        return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
    };
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Add the export button to the chart, with options.
     *
     * @private
     * @function Highcharts.Exporting#addButton
     *
     * @param {Highcharts.ExportingButtonOptions} options
     * The exporting button options object.
     *
     * @requires modules/exporting
     */
    Exporting.prototype.addButton = function (options) {
        var _a;
        var exporting = this,
            chart = exporting.chart,
            renderer = chart.renderer,
            btnOptions = merge((_a = chart.options.navigation) === null || _a === void 0 ? void 0 : _a.buttonOptions,
            options),
            onclick = btnOptions.onclick,
            menuItems = btnOptions.menuItems,
            symbolSize = btnOptions.symbolSize || 12;
        var symbol;
        if (btnOptions.enabled === false || !btnOptions.theme) {
            return;
        }
        var theme = chart.styledMode ? {} : btnOptions.theme;
        var callback = (function () { });
        if (onclick) {
            callback = function (e) {
                if (e) {
                    e.stopPropagation();
                }
                onclick.call(chart, e);
            };
        }
        else if (menuItems) {
            callback = function (e) {
                // Consistent with onclick call (#3495)
                if (e) {
                    e.stopPropagation();
                }
                exporting.contextMenu(button.menuClassName, menuItems, button.translateX || 0, button.translateY || 0, button.width || 0, button.height || 0, button);
                button.setState(2);
            };
        }
        if (btnOptions.text && btnOptions.symbol) {
            theme.paddingLeft = pick(theme.paddingLeft, 30);
        }
        else if (!btnOptions.text) {
            extend(theme, {
                width: btnOptions.width,
                height: btnOptions.height,
                padding: 0
            });
        }
        var button = renderer
                .button(btnOptions.text || '', 0, 0,
            callback,
            theme,
            void 0,
            void 0,
            void 0,
            void 0,
            btnOptions.useHTML)
                .addClass(options.className || '')
                .attr({
                title: pick(chart.options.lang[(btnOptions._titleKey ||
                    btnOptions.titleKey)], '')
            });
        button.menuClassName = (options.menuClassName ||
            'highcharts-menu-' + exporting.btnCount++);
        if (btnOptions.symbol) {
            symbol = renderer
                .symbol(btnOptions.symbol, Math.round((btnOptions.symbolX || 0) - (symbolSize / 2)), Math.round((btnOptions.symbolY || 0) - (symbolSize / 2)), symbolSize, symbolSize, 
            // If symbol is an image, scale it (#7957)
            {
                width: symbolSize,
                height: symbolSize
            })
                .addClass('highcharts-button-symbol')
                .attr({
                zIndex: 1
            })
                .add(button);
            if (!chart.styledMode) {
                symbol.attr({
                    stroke: btnOptions.symbolStroke,
                    fill: btnOptions.symbolFill,
                    'stroke-width': btnOptions.symbolStrokeWidth || 1
                });
            }
        }
        button
            .add(exporting.group)
            .align(extend(btnOptions, {
            width: button.width,
            x: pick(btnOptions.x, exporting.buttonOffset) // #1654
        }), true, 'spacingBox');
        exporting.buttonOffset += (((button.width || 0) + (btnOptions.buttonSpacing || 0)) *
            (btnOptions.align === 'right' ? -1 : 1));
        exporting.svgElements.push(button, symbol);
    };
    /**
     * Clean up after printing a chart.
     *
     * @private
     * @function Highcharts.Exporting#afterPrint
     *
     * @emits Highcharts.Chart#event:afterPrint
     *
     * @requires modules/exporting
     */
    Exporting.prototype.afterPrint = function () {
        var chart = this.chart;
        if (!this.printReverseInfo) {
            return void 0;
        }
        var _a = this.printReverseInfo,
            childNodes = _a.childNodes,
            origDisplay = _a.origDisplay,
            resetParams = _a.resetParams;
        // Put the chart back in
        this.moveContainers(chart.renderTo);
        // Restore all body content
        [].forEach.call(childNodes, function (node, i) {
            if (node.nodeType === 1) {
                node.style.display = (origDisplay[i] || '');
            }
        });
        this.isPrinting = false;
        // Reset printMaxWidth
        if (resetParams) {
            chart.setSize.apply(chart, resetParams);
        }
        delete this.printReverseInfo;
        Exporting.printingChart = void 0;
        Exporting_fireEvent(chart, 'afterPrint');
    };
    /**
     * Prepare chart and document before printing a chart.
     *
     * @private
     * @function Highcharts.Exporting#beforePrint
     *
     * @emits Highcharts.Chart#event:beforePrint
     *
     * @requires modules/exporting
     */
    Exporting.prototype.beforePrint = function () {
        var _a;
        var chart = this.chart,
            body = Exporting_doc.body,
            printMaxWidth = this.options.printMaxWidth,
            printReverseInfo = {
                childNodes: body.childNodes,
                origDisplay: [],
                resetParams: void 0
            };
        this.isPrinting = true;
        (_a = chart.pointer) === null || _a === void 0 ? void 0 : _a.reset(void 0, 0);
        Exporting_fireEvent(chart, 'beforePrint');
        // Handle printMaxWidth
        if (printMaxWidth && chart.chartWidth > printMaxWidth) {
            printReverseInfo.resetParams = [
                chart.options.chart.width,
                void 0,
                false
            ];
            chart.setSize(printMaxWidth, void 0, false);
        }
        // Hide all body content
        [].forEach.call(printReverseInfo.childNodes, function (node, i) {
            if (node.nodeType === 1) {
                printReverseInfo.origDisplay[i] = node.style.display;
                node.style.display = 'none';
            }
        });
        // Pull out the chart
        this.moveContainers(body);
        // Storage details for undo action after printing
        this.printReverseInfo = printReverseInfo;
    };
    /**
     * Display a popup menu for choosing the export type.
     *
     * @private
     * @function Highcharts.Exporting#contextMenu
     *
     * @param {string} className
     * An identifier for the menu.
     * @param {Array<(string | Highcharts.ExportingMenuObject)>} items
     * A collection with text and onclicks for the items.
     * @param {number} x
     * The x position of the opener button.
     * @param {number} y
     * The y position of the opener button.
     * @param {number} width
     * The width of the opener button.
     * @param {number} height
     * The height of the opener button.
     * @param {SVGElement} button
     * The SVG button element.
     *
     * @emits Highcharts.Chart#event:exportMenuHidden
     * @emits Highcharts.Chart#event:exportMenuShown
     *
     * @requires modules/exporting
     */
    Exporting.prototype.contextMenu = function (className, items, x, y, width, height, button) {
        var _a,
            _b,
            _c;
        var exporting = this,
            chart = exporting.chart,
            navOptions = chart.options.navigation,
            chartWidth = chart.chartWidth,
            chartHeight = chart.chartHeight,
            cacheName = 'cache-' + className, 
            // For mouse leave detection
            menuPadding = Math.max(width,
            height);
        var innerMenu,
            menu = chart[cacheName];
        // Create the menu only the first time
        if (!menu) {
            // Create a HTML element above the SVG
            exporting.contextMenuEl = chart[cacheName] = menu =
                createElement('div', {
                    className: className
                }, Exporting_assign({ position: 'absolute', zIndex: 1000, padding: menuPadding + 'px', pointerEvents: 'auto' }, chart.renderer.style), ((_a = chart.scrollablePlotArea) === null || _a === void 0 ? void 0 : _a.fixedDiv) || chart.container);
            innerMenu = createElement('ul', { className: 'highcharts-menu' }, chart.styledMode ? {} : {
                listStyle: 'none',
                margin: 0,
                padding: 0
            }, menu);
            // Presentational CSS
            if (!chart.styledMode) {
                css(innerMenu, extend({
                    MozBoxShadow: '3px 3px 10px #0008',
                    WebkitBoxShadow: '3px 3px 10px #0008',
                    boxShadow: '3px 3px 10px #0008'
                }, (navOptions === null || navOptions === void 0 ? void 0 : navOptions.menuStyle) || {}));
            }
            // Hide on mouse out
            menu.hideMenu = function () {
                css(menu, { display: 'none' });
                if (button) {
                    button.setState(0);
                }
                if (chart.exporting) {
                    chart.exporting.openMenu = false;
                }
                // #10361, #9998
                css(chart.renderTo, { overflow: 'hidden' });
                css(chart.container, { overflow: 'hidden' });
                Exporting_clearTimeout(menu.hideTimer);
                Exporting_fireEvent(chart, 'exportMenuHidden');
            };
            // Hide the menu some time after mouse leave (#1357)
            (_b = exporting.events) === null || _b === void 0 ? void 0 : _b.push(Exporting_addEvent(menu, 'mouseleave', function () {
                menu.hideTimer = Exporting_win.setTimeout(menu.hideMenu, 500);
            }), Exporting_addEvent(menu, 'mouseenter', function () {
                Exporting_clearTimeout(menu.hideTimer);
            }), 
            // Hide it on clicking or touching outside the menu (#2258,
            // #2335, #2407)
            Exporting_addEvent(Exporting_doc, 'mouseup', function (e) {
                var _a;
                if (!((_a = chart.pointer) === null || _a === void 0 ? void 0 : _a.inClass(e.target, className))) {
                    menu.hideMenu();
                }
            }), Exporting_addEvent(menu, 'click', function () {
                var _a;
                if ((_a = chart.exporting) === null || _a === void 0 ? void 0 : _a.openMenu) {
                    menu.hideMenu();
                }
            }));
            // Create the items
            items.forEach(function (item) {
                var _a;
                if (typeof item === 'string') {
                    if ((_a = exporting.options.menuItemDefinitions) === null || _a === void 0 ? void 0 : _a[item]) {
                        item = exporting.options.menuItemDefinitions[item];
                    }
                }
                if (isObject(item, true)) {
                    var element = void 0;
                    if (item.separator) {
                        element = createElement('hr', void 0, void 0, innerMenu);
                    }
                    else {
                        // When chart initialized with the table, wrong button
                        // text displayed, #14352.
                        if (item.textKey === 'viewData' &&
                            exporting.isDataTableVisible) {
                            item.textKey = 'hideData';
                        }
                        element = createElement('li', {
                            className: 'highcharts-menu-item',
                            onclick: function (e) {
                                if (e) { // IE7
                                    e.stopPropagation();
                                }
                                menu.hideMenu();
                                if (typeof item !== 'string' && item.onclick) {
                                    // eslint-disable-next-line @typescript-eslint/no-floating-promises
                                    item.onclick.apply(chart, arguments);
                                }
                            }
                        }, void 0, innerMenu);
                        highcharts_AST_commonjs_highcharts_AST_commonjs2_highcharts_AST_root_Highcharts_AST_default().setElementHTML(element, item.text || chart.options.lang[item.textKey]);
                        if (!chart.styledMode) {
                            element.onmouseover = function () {
                                css(this, (navOptions === null || navOptions === void 0 ? void 0 : navOptions.menuItemHoverStyle) || {});
                            };
                            element.onmouseout = function () {
                                css(this, (navOptions === null || navOptions === void 0 ? void 0 : navOptions.menuItemStyle) || {});
                            };
                            css(element, extend({
                                cursor: 'pointer'
                            }, (navOptions === null || navOptions === void 0 ? void 0 : navOptions.menuItemStyle) || {}));
                        }
                    }
                    // Keep references to menu divs to be able to destroy them
                    exporting.divElements.push(element);
                }
            });
            // Keep references to menu and innerMenu div to be able to destroy
            // them
            exporting.divElements.push(innerMenu, menu);
            exporting.menuHeight = menu.offsetHeight;
            exporting.menuWidth = menu.offsetWidth;
        }
        var menuStyle = { display: 'block' };
        // If outside right, right align it
        if (x + (exporting.menuWidth || 0) > chartWidth) {
            menuStyle.right = (chartWidth - x - width - menuPadding) + 'px';
        }
        else {
            menuStyle.left = (x - menuPadding) + 'px';
        }
        // If outside bottom, bottom align it
        if (y + height + (exporting.menuHeight || 0) >
            chartHeight &&
            ((_c = button.alignOptions) === null || _c === void 0 ? void 0 : _c.verticalAlign) !== 'top') {
            menuStyle.bottom = (chartHeight - y - menuPadding) + 'px';
        }
        else {
            menuStyle.top = (y + height - menuPadding) + 'px';
        }
        css(menu, menuStyle);
        // #10361, #9998
        css(chart.renderTo, { overflow: '' });
        css(chart.container, { overflow: '' });
        if (chart.exporting) {
            chart.exporting.openMenu = true;
        }
        Exporting_fireEvent(chart, 'exportMenuShown');
    };
    /**
     * Destroy the export buttons.
     *
     * @private
     * @function Highcharts.Exporting#destroy
     *
     * @param {global.Event} [e]
     * Event object.
     *
     * @requires modules/exporting
     */
    Exporting.prototype.destroy = function (e) {
        var exporting = this,
            chart = e ? e.target : exporting.chart,
            divElements = exporting.divElements,
            events = exporting.events,
            svgElements = exporting.svgElements;
        var cacheName;
        // Destroy the extra buttons added
        svgElements.forEach(function (elem, i) {
            // Destroy and null the svg elements
            if (elem) { // #1822
                elem.onclick = elem.ontouchstart = null;
                cacheName = 'cache-' + elem.menuClassName;
                if (chart[cacheName]) {
                    delete chart[cacheName];
                }
                svgElements[i] = elem.destroy();
            }
        });
        svgElements.length = 0;
        // Destroy the exporting group
        if (exporting.group) {
            exporting.group.destroy();
            delete exporting.group;
        }
        // Destroy the divs for the menu
        divElements.forEach(function (elem, i) {
            if (elem) {
                // Remove the event handler
                Exporting_clearTimeout(elem.hideTimer); // #5427
                removeEvent(elem, 'mouseleave');
                // Remove inline events
                divElements[i] =
                    elem.onmouseout =
                        elem.onmouseover =
                            elem.ontouchstart =
                                elem.onclick = null;
                // Destroy the div by moving to garbage bin
                Exporting_discardElement(elem);
            }
        });
        divElements.length = 0;
        if (events) {
            events.forEach(function (unbind) {
                unbind();
            });
            events.length = 0;
        }
    };
    /**
     * Get data URL to an image of an SVG and call download on its options
     * object:
     *
     * - **filename:** Name of resulting downloaded file without extension.
     * Default is based on the chart title.
     * - **type:** File type of resulting download. Default is `image/png`.
     * - **scale:** Scaling factor of downloaded image compared to source.
     * Default is `2`.
     * - **libURL:** URL pointing to location of dependency scripts to download
     * on demand. Default is the exporting.libURL option of the global
     * Highcharts options pointing to our server.
     *
     * @async
     * @private
     * @function Highcharts.Exporting#downloadSVG
     *
     * @param {string} svg
     * The generated SVG.
     * @param {Highcharts.ExportingOptions} exportingOptions
     * The exporting options.
     *
     * @requires modules/exporting
     */
    // eslint-disable-next-line @typescript-eslint/require-await
    Exporting.prototype.downloadSVG = function (svg, exportingOptions) {
        return Exporting_awaiter(this, void 0, void 0, function () {
            var eventArgs,
                _a,
                type,
                filename,
                scale,
                libURL,
                svgURL,
                blob,
                dataURL,
                error_1,
                canvas_1,
                ctx_1,
                matchedImageWidth,
                matchedImageHeight,
                imageWidth,
                imageHeight,
                downloadWithCanVG;
            return Exporting_generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        eventArgs = {
                            svg: svg,
                            exportingOptions: exportingOptions,
                            exporting: this
                        };
                        // Fire a custom event before the export starts
                        Exporting_fireEvent(Exporting.prototype, 'downloadSVG', eventArgs);
                        // If the event was prevented, do not proceed with the export
                        if (eventArgs.defaultPrevented) {
                            return [2 /*return*/];
                        }
                        _a = Exporting.prepareImageOptions(exportingOptions), type = _a.type, filename = _a.filename, scale = _a.scale, libURL = _a.libURL;
                        if (!(type === 'application/pdf')) return [3 /*break*/, 1];
                        // Error in case of offline-exporting module is not loaded
                        throw new Error('Offline exporting logic for PDF type is not found.');
                    case 1:
                        if (!(type === 'image/svg+xml')) return [3 /*break*/, 2];
                        // SVG download. In this case, we want to use Microsoft specific
                        // Blob if available
                        if (typeof Exporting_win.MSBlobBuilder !== 'undefined') {
                            blob = new Exporting_win.MSBlobBuilder();
                            blob.append(svg);
                            svgURL = blob.getBlob('image/svg+xml');
                        }
                        else {
                            svgURL = Exporting.svgToDataURL(svg);
                        }
                        // Download the chart
                        Exporting_downloadURL(svgURL, filename);
                        return [3 /*break*/, 10];
                    case 2:
                        // PNG/JPEG download - create bitmap from SVG
                        svgURL = Exporting.svgToDataURL(svg);
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 5, 9, 10]);
                        Exporting.objectURLRevoke = true;
                        return [4 /*yield*/, Exporting.imageToDataURL(svgURL, scale, type)];
                    case 4:
                        dataURL = _b.sent();
                        Exporting_downloadURL(dataURL, filename);
                        return [3 /*break*/, 10];
                    case 5:
                        error_1 = _b.sent();
                        // No need for the below logic to run in case no canvas is
                        // found
                        if (error_1.message === 'No canvas found!') {
                            throw error_1;
                        }
                        // Or in case of exceeding the input length
                        if (svg.length > 100000000 /* RegexLimits.svgLimit */) {
                            throw new Error('Input too long');
                        }
                        canvas_1 = Exporting_doc.createElement('canvas'), ctx_1 = canvas_1.getContext('2d'), matchedImageWidth = svg.match(
                        // eslint-disable-next-line max-len
                        /^<svg[^>]*\s{,1000}width\s{,1000}=\s{,1000}\"?(\d+)\"?[^>]*>/), matchedImageHeight = svg.match(
                        // eslint-disable-next-line max-len
                        /^<svg[^>]*\s{0,1000}height\s{,1000}=\s{,1000}\"?(\d+)\"?[^>]*>/);
                        if (!(ctx_1 &&
                            matchedImageWidth &&
                            matchedImageHeight)) return [3 /*break*/, 8];
                        imageWidth = +matchedImageWidth[1] * scale, imageHeight = +matchedImageHeight[1] * scale, downloadWithCanVG = function () {
                            var v = Exporting_win.canvg.Canvg.fromString(ctx_1,
                                svg);
                            v.start();
                            Exporting_downloadURL(Exporting_win.navigator.msSaveOrOpenBlob ?
                                canvas_1.msToBlob() :
                                canvas_1.toDataURL(type), filename);
                        };
                        canvas_1.width = imageWidth;
                        canvas_1.height = imageHeight;
                        if (!!Exporting_win.canvg) return [3 /*break*/, 7];
                        Exporting.objectURLRevoke = true;
                        return [4 /*yield*/, Exporting_getScript(libURL + 'canvg.js')];
                    case 6:
                        _b.sent();
                        _b.label = 7;
                    case 7:
                        // Use loaded canvg
                        downloadWithCanVG();
                        _b.label = 8;
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        if (Exporting.objectURLRevoke) {
                            try {
                                Exporting_domurl.revokeObjectURL(svgURL);
                            }
                            catch (_c) {
                                // Ignore
                            }
                        }
                        return [7 /*endfinally*/];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Submit an SVG version of the chart along with some parameters for local
     * conversion (PNG, JPEG, and SVG) or conversion on a server (PDF).
     *
     * @sample highcharts/members/chart-exportchart/
     * Export with no options
     * @sample highcharts/members/chart-exportchart-filename/
     * PDF type and custom filename
     * @sample highcharts/exporting/menuitemdefinitions-webp/
     * Export to WebP
     * @sample highcharts/members/chart-exportchart-custom-background/
     * Different chart background in export
     * @sample stock/members/chart-exportchart/
     * Export with Highcharts Stock
     *
     * @async
     * @function Highcharts.Exporting#exportChart
     *
     * @param {Highcharts.ExportingOptions} [exportingOptions]
     * Exporting options in addition to those defined in
     * [exporting](https://api.highcharts.com/highcharts/exporting).
     * @param {Highcharts.Options} [chartOptions]
     * Additional chart options for the exported chart. For example a different
     * background color can be added here, or `dataLabels` for export only.
     *
     * @requires modules/exporting
     */
    Exporting.prototype.exportChart = function (exportingOptions, chartOptions) {
        return Exporting_awaiter(this, void 0, void 0, function () {
            var svg;
            return Exporting_generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Merge the options
                        exportingOptions = merge(this.options, exportingOptions);
                        if (!exportingOptions.local) return [3 /*break*/, 2];
                        // Trigger the local export logic
                        return [4 /*yield*/, this.localExport(exportingOptions, chartOptions || {})];
                    case 1:
                        // Trigger the local export logic
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        svg = this.getSVGForExport(exportingOptions, chartOptions);
                        if (!exportingOptions.url) return [3 /*break*/, 4];
                        return [4 /*yield*/, Core_HttpUtilities.post(exportingOptions.url, {
                                filename: exportingOptions.filename ?
                                    exportingOptions.filename.replace(/\//g, '-') :
                                    this.getFilename(),
                                type: exportingOptions.type,
                                width: exportingOptions.width,
                                scale: exportingOptions.scale,
                                svg: svg
                            }, exportingOptions.fetchOptions)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Handles the fallback to the export server when a local export fails.
     *
     * @private
     * @async
     * @function Highcharts.Exporting#fallbackToServer
     *
     * @param {Highcharts.ExportingOptions} exportingOptions
     * The exporting options.
     * @param {Error} err
     * The error that caused the local export to fail.
     *
     * @return {Promise<void>}
     * A promise that resolves when the fallback process is complete.
     *
     * @requires modules/exporting
     */
    Exporting.prototype.fallbackToServer = function (exportingOptions, err) {
        return Exporting_awaiter(this, void 0, void 0, function () {
            return Exporting_generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(exportingOptions.fallbackToExportServer === false)) return [3 /*break*/, 1];
                        if (exportingOptions.error) {
                            exportingOptions.error(exportingOptions, err);
                        }
                        else {
                            // Fallback disabled
                            Exporting_error(28, true);
                        }
                        return [3 /*break*/, 3];
                    case 1:
                        if (!(exportingOptions.type === 'application/pdf')) return [3 /*break*/, 3];
                        // The local must be false to fallback to server for PDF export
                        exportingOptions.local = false;
                        // Allow fallbacking to server only for PDFs that failed locally
                        return [4 /*yield*/, this.exportChart(exportingOptions)];
                    case 2:
                        // Allow fallbacking to server only for PDFs that failed locally
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Return the unfiltered innerHTML of the chart container. Used as hook for
     * plugins. In styled mode, it also takes care of inlining CSS style rules.
     *
     * @see Chart#getSVG
     *
     * @function Highcharts.Exporting#getChartHTML
     *
     * @param {boolean} [applyStyleSheets]
     * whether or not to apply the style sheets.
     *
     * @return {string}
     * The unfiltered SVG of the chart.
     *
     * @requires modules/exporting
     */
    Exporting.prototype.getChartHTML = function (applyStyleSheets) {
        var chart = this.chart;
        if (applyStyleSheets) {
            this.inlineStyles();
        }
        this.resolveCSSVariables();
        return chart.container.innerHTML;
    };
    /**
     * Get the default file name used for exported charts. By default it creates
     * a file name based on the chart title.
     *
     * @function Highcharts.Exporting#getFilename
     *
     * @return {string}
     * A file name without extension.
     *
     * @requires modules/exporting
     */
    Exporting.prototype.getFilename = function () {
        var _a;
        var titleText = (_a = this.chart.userOptions.title) === null || _a === void 0 ? void 0 : _a.text;
        var filename = this.options.filename;
        if (filename) {
            return filename.replace(/\//g, '-');
        }
        if (typeof titleText === 'string') {
            filename = titleText
                .toLowerCase()
                .replace(/<\/?[^>]+(>|$)/g, '') // Strip HTML tags
                .replace(/[\s_]+/g, '-')
                .replace(/[^a-z\d\-]/g, '') // Preserve only latin
                .replace(/^[\-]+/g, '') // Dashes in the start
                .replace(/[\-]+/g, '-') // Dashes in a row
                .substr(0, 24)
                .replace(/[\-]+$/g, ''); // Dashes in the end;
        }
        if (!filename || filename.length < 5) {
            filename = 'chart';
        }
        return filename;
    };
    /**
     * Return an SVG representation of the chart.
     *
     * @sample highcharts/members/chart-getsvg/
     * View the SVG from a button
     *
     * @function Highcharts.Exporting#getSVG
     *
     * @param {Highcharts.Options} [chartOptions]
     * Additional chart options for the generated SVG representation. For
     * collections like `xAxis`, `yAxis` or `series`, the additional options is
     * either merged in to the original item of the same `id`, or to the first
     * item if a common id is not found.
     *
     * @return {string}
     * The SVG representation of the rendered chart.
     *
     * @emits Highcharts.Chart#event:getSVG
     *
     * @requires modules/exporting
     */
    Exporting.prototype.getSVG = function (chartOptions) {
        var _a,
            _b,
            _c,
            _d;
        var chart = this.chart;
        var svg,
            seriesOptions, 
            // Copy the options and add extra options
            options = merge(chart.options,
            chartOptions);
        // Use userOptions to make the options chain in series right (#3881)
        options.plotOptions = merge(chart.userOptions.plotOptions, chartOptions === null || chartOptions === void 0 ? void 0 : chartOptions.plotOptions);
        // ... and likewise with time, avoid that undefined time properties are
        // merged over legacy global time options
        options.time = merge(chart.userOptions.time, chartOptions === null || chartOptions === void 0 ? void 0 : chartOptions.time);
        // Create a sandbox where a new chart will be generated
        var sandbox = createElement('div',
            void 0, {
                position: 'absolute',
                top: '-9999em',
                width: chart.chartWidth + 'px',
                height: chart.chartHeight + 'px'
            },
            Exporting_doc.body);
        // Get the source size
        var cssWidth = chart.renderTo.style.width, cssHeight = chart.renderTo.style.height, sourceWidth = ((_a = options.exporting) === null || _a === void 0 ? void 0 : _a.sourceWidth) ||
                options.chart.width ||
                (/px$/.test(cssWidth) && parseInt(cssWidth, 10)) ||
                (options.isGantt ? 800 : 600), sourceHeight = ((_b = options.exporting) === null || _b === void 0 ? void 0 : _b.sourceHeight) ||
                options.chart.height ||
                (/px$/.test(cssHeight) && parseInt(cssHeight, 10)) ||
                400;
        // Override some options
        extend(options.chart, {
            animation: false,
            renderTo: sandbox,
            forExport: true,
            renderer: 'SVGRenderer',
            width: sourceWidth,
            height: sourceHeight
        });
        if (options.exporting) {
            options.exporting.enabled = false; // Hide buttons in print
        }
        delete options.data; // #3004
        // Prepare for replicating the chart
        options.series = [];
        chart.series.forEach(function (serie) {
            var _a;
            seriesOptions = merge(serie.userOptions, {
                animation: false, // Turn off animation
                enableMouseTracking: false,
                showCheckbox: false,
                visible: serie.visible
            });
            // Used for the navigator series that has its own option set
            if (!seriesOptions.isInternal) {
                (_a = options === null || options === void 0 ? void 0 : options.series) === null || _a === void 0 ? void 0 : _a.push(seriesOptions);
            }
        });
        var colls = {};
        chart.axes.forEach(function (axis) {
            // Assign an internal key to ensure a one-to-one mapping (#5924)
            if (!axis.userOptions.internalKey) { // #6444
                axis.userOptions.internalKey = uniqueKey();
            }
            if (options && !axis.options.isInternal) {
                if (!colls[axis.coll]) {
                    colls[axis.coll] = true;
                    options[axis.coll] = [];
                }
                options[axis.coll].push(merge(axis.userOptions, {
                    visible: axis.visible,
                    // Force some options that could have be set directly on
                    // the axis while missing in the userOptions or options.
                    type: axis.type,
                    uniqueNames: axis.uniqueNames
                }));
            }
        });
        // Make sure the `colorAxis` object of the `defaultOptions` isn't used
        // in the chart copy's user options, because a color axis should only be
        // added when the user actually applies it.
        options.colorAxis = chart.userOptions.colorAxis;
        // Generate the chart copy
        var chartCopy = new chart.constructor(options,
            chart.callback);
        // Axis options and series options  (#2022, #3900, #5982)
        if (chartOptions) {
            ['xAxis', 'yAxis', 'series'].forEach(function (coll) {
                var _a;
                if (chartOptions[coll]) {
                    chartCopy.update((_a = {},
                        _a[coll] = chartOptions[coll],
                        _a));
                }
            });
        }
        // Reflect axis extremes in the export (#5924)
        chart.axes.forEach(function (axis) {
            var axisCopy = find(chartCopy.axes,
                function (copy) {
                    return copy.options.internalKey === axis.userOptions.internalKey;
            });
            if (axisCopy) {
                var extremes = axis.getExtremes(), 
                    // Make sure min and max overrides in the
                    // `exporting.chartOptions.xAxis` settings are reflected.
                    // These should override user-set extremes via zooming,
                    // scrollbar etc (#7873).
                    exportOverride = splat((chartOptions === null || chartOptions === void 0 ? void 0 : chartOptions[axis.coll]) || {})[0],
                    userMin = 'min' in exportOverride ?
                        exportOverride.min :
                        extremes.userMin,
                    userMax = 'max' in exportOverride ?
                        exportOverride.max :
                        extremes.userMax;
                if (((typeof userMin !== 'undefined' &&
                    userMin !== axisCopy.min) || (typeof userMax !== 'undefined' &&
                    userMax !== axisCopy.max))) {
                    axisCopy.setExtremes(userMin !== null && userMin !== void 0 ? userMin : void 0, userMax !== null && userMax !== void 0 ? userMax : void 0, true, false);
                }
            }
        });
        // Get the SVG from the container's innerHTML
        svg = ((_c = chartCopy.exporting) === null || _c === void 0 ? void 0 : _c.getChartHTML(chart.styledMode ||
            ((_d = options.exporting) === null || _d === void 0 ? void 0 : _d.applyStyleSheets))) || '';
        Exporting_fireEvent(chart, 'getSVG', { chartCopy: chartCopy });
        svg = Exporting.sanitizeSVG(svg, options);
        // Free up memory
        options = void 0;
        chartCopy.destroy();
        Exporting_discardElement(sandbox);
        return svg;
    };
    /**
     * Gets the SVG for export using the getSVG function with additional
     * options.
     *
     * @private
     * @function Highcharts.Exporting#getSVGForExport
     *
     * @param {Highcharts.ExportingOptions} [exportingOptions]
     * The exporting options.
     * @param {Highcharts.Options} [chartOptions]
     * Additional chart options for the exported chart.
     *
     * @return {string}
     * The SVG representation of the rendered chart.
     *
     * @requires modules/exporting
     */
    Exporting.prototype.getSVGForExport = function (exportingOptions, chartOptions) {
        var currentExportingOptions = this.options;
        return this.getSVG(merge({ chart: { borderRadius: 0 } }, currentExportingOptions.chartOptions, chartOptions, {
            exporting: {
                sourceWidth: ((exportingOptions === null || exportingOptions === void 0 ? void 0 : exportingOptions.sourceWidth) ||
                    currentExportingOptions.sourceWidth),
                sourceHeight: ((exportingOptions === null || exportingOptions === void 0 ? void 0 : exportingOptions.sourceHeight) ||
                    currentExportingOptions.sourceHeight)
            }
        }));
    };
    /**
     * Analyze inherited styles from stylesheets and add them inline.
     *
     * @private
     * @function Highcharts.Exporting#inlineStyles
     *
     * @todo What are the border styles for text about? In general, text has a
     * lot of properties.
     *
     * @todo Make it work with IE9 and IE10.
     *
     * @requires modules/exporting
     */
    Exporting.prototype.inlineStyles = function () {
        var _a;
        var denylist = Exporting.inlineDenylist,
            allowlist = Exporting.inlineAllowlist, // For IE
            defaultStyles = {};
        var dummySVG;
        // Create an iframe where we read default styles without pollution from
        // this body
        var iframe = createElement('iframe',
            void 0, {
                width: '1px',
                height: '1px',
                visibility: 'hidden'
            },
            Exporting_doc.body);
        var iframeDoc = (_a = iframe.contentWindow) === null || _a === void 0 ? void 0 : _a.document;
        if (iframeDoc) {
            iframeDoc.body.appendChild(iframeDoc.createElementNS(SVG_NS, 'svg'));
        }
        /**
         * Call this on all elements and recurse to children.
         *
         * @private
         * @function recurse
         *
         * @param {Highcharts.HTMLDOMElement | Highcharts.SVGSVGElement} node
         * Element child.
         */
        function recurse(node) {
            var filteredStyles = {};
            var styles,
                parentStyles,
                dummy,
                denylisted,
                allowlisted,
                i;
            /**
             * Check computed styles and whether they are in the allow/denylist
             * for styles or attributes.
             *
             * @private
             * @function filterStyles
             *
             * @param {string | number | Highcharts.GradientColor | Highcharts.PatternObject | undefined} val
             * Style value.
             * @param {string} prop
             * Style property name.
             */
            function filterStyles(val, prop) {
                // Check against allowlist & denylist
                denylisted = allowlisted = false;
                if (allowlist.length) {
                    // Styled mode in IE has a allowlist instead. Exclude all
                    // props not in this list.
                    i = allowlist.length;
                    while (i-- && !allowlisted) {
                        allowlisted = allowlist[i].test(prop);
                    }
                    denylisted = !allowlisted;
                }
                // Explicitly remove empty transforms
                if (prop === 'transform' && val === 'none') {
                    denylisted = true;
                }
                i = denylist.length;
                while (i-- && !denylisted) {
                    if (prop.length > 1000 /* RegexLimits.shortLimit */) {
                        throw new Error('Input too long');
                    }
                    denylisted = (denylist[i].test(prop) ||
                        typeof val === 'function');
                }
                if (!denylisted) {
                    // If parent node has the same style, it gets inherited, no
                    // need to inline it. Top-level props should be diffed
                    // against parent (#7687).
                    if ((parentStyles[prop] !== val ||
                        node.nodeName === 'svg') &&
                        (defaultStyles[node.nodeName])[prop] !== val) {
                        // Attributes
                        if (!Exporting.inlineToAttributes ||
                            Exporting.inlineToAttributes.indexOf(prop) !== -1) {
                            if (val) {
                                node.setAttribute(Exporting.hyphenate(prop), val);
                            }
                            // Styles
                        }
                        else {
                            filteredStyles[prop] = val;
                        }
                    }
                }
            }
            if (iframeDoc &&
                node.nodeType === 1 &&
                Exporting.unstyledElements.indexOf(node.nodeName) === -1) {
                styles =
                    Exporting_win.getComputedStyle(node, null);
                parentStyles = node.nodeName === 'svg' ?
                    {} :
                    Exporting_win.getComputedStyle(node.parentNode, null);
                // Get default styles from the browser so that we don't have to
                // add these
                if (!defaultStyles[node.nodeName]) {
                    /*
                    If (!dummySVG) {
                        dummySVG = doc.createElementNS(H.SVG_NS, 'svg');
                        dummySVG.setAttribute('version', '1.1');
                        doc.body.appendChild(dummySVG);
                    }
                    */
                    dummySVG =
                        iframeDoc.getElementsByTagName('svg')[0];
                    dummy = iframeDoc.createElementNS(node.namespaceURI, node.nodeName);
                    dummySVG.appendChild(dummy);
                    // Get the defaults into a standard object (simple merge
                    // won't do)
                    var s = Exporting_win.getComputedStyle(dummy,
                        null),
                        defaults = {};
                    // eslint-disable-next-line @typescript-eslint/no-for-in-array
                    for (var key in s) {
                        if (key.length < 1000 /* RegexLimits.shortLimit */ &&
                            typeof s[key] === 'string' &&
                            !/^\d+$/.test(key)) {
                            defaults[key] = s[key];
                        }
                    }
                    defaultStyles[node.nodeName] = defaults;
                    // Remove default fill, otherwise text disappears when
                    // exported
                    if (node.nodeName === 'text') {
                        delete defaultStyles.text.fill;
                    }
                    dummySVG.removeChild(dummy);
                }
                // Loop through all styles and add them inline if they are ok
                for (var p in styles) {
                    if (
                    // Some browsers put lots of styles on the prototype...
                    isFirefox ||
                        isMS ||
                        Exporting_isSafari || // #16902
                        // ... Chrome puts them on the instance
                        Object.hasOwnProperty.call(styles, p)) {
                        filterStyles(styles[p], p);
                    }
                }
                // Apply styles
                css(node, filteredStyles);
                // Set default stroke width (needed at least for IE)
                if (node.nodeName === 'svg') {
                    node.setAttribute('stroke-width', '1px');
                }
                if (node.nodeName === 'text') {
                    return;
                }
                // Recurse
                [].forEach.call(node.children || node.childNodes, recurse);
            }
        }
        /**
         * Remove the dummy objects used to get defaults.
         *
         * @private
         * @function tearDown
         */
        function tearDown() {
            dummySVG.parentNode.removeChild(dummySVG);
            // Remove trash from DOM that stayed after each exporting
            iframe.parentNode.removeChild(iframe);
        }
        recurse(this.chart.container.querySelector('svg'));
        tearDown();
    };
    /**
     * Get SVG of chart prepared for client side export. This converts embedded
     * images in the SVG to data URIs. It requires the regular exporting module.
     * The options and chartOptions arguments are passed to the getSVGForExport
     * function.
     *
     * @private
     * @async
     * @function Highcharts.Exporting#localExport
     *
     * @param {Highcharts.ExportingOptions} exportingOptions
     * The exporting options.
     * @param {Highcharts.Options} chartOptions
     * Additional chart options for the exported chart.
     *
     * @return {Promise<string>}
     * The sanitized SVG.
     *
     * @requires modules/exporting
     */
    Exporting.prototype.localExport = function (exportingOptions, chartOptions) {
        return Exporting_awaiter(this, void 0, void 0, function () {
            var chart,
                exporting, 
                // After grabbing the SVG of the chart's copy container we need
                // to do sanitation on the SVG
                sanitize, 
                // Return true if the SVG contains images with external data.
                // With the boost module there are `image` elements with encoded
                // PNGs, these are supported by svg2pdf and should pass (#10243)
                hasExternalImages,
                chartCopyContainer,
                chartCopyOptions,
                href,
                images,
                unbindGetSVG,
                imagesArray,
                _i,
                imagesArray_1,
                image,
                dataURL,
                svgElement,
                sanitizedSVG,
                error_2;
            var _a,
                _b,
                _c;
            return Exporting_generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        chart = this.chart, exporting = this, sanitize = function (svg) { return Exporting.sanitizeSVG(svg || '', chartCopyOptions); }, hasExternalImages = function () {
                            return [].some.call(chart.container.getElementsByTagName('image'), function (image) {
                                var href = image.getAttribute('href');
                                return (href !== '' &&
                                    typeof href === 'string' &&
                                    href.indexOf('data:') !== 0);
                            });
                        };
                        href = null;
                        // If we are on IE and in styled mode, add an allowlist to the
                        // renderer for inline styles that we want to pass through. There
                        // are so many styles by default in IE that we don't want to
                        // denylist them all
                        if (isMS && chart.styledMode && !Exporting.inlineAllowlist.length) {
                            Exporting.inlineAllowlist.push(/^blockSize/, /^border/, /^caretColor/, /^color/, /^columnRule/, /^columnRuleColor/, /^cssFloat/, /^cursor/, /^fill$/, /^fillOpacity/, /^font/, /^inlineSize/, /^length/, /^lineHeight/, /^opacity/, /^outline/, /^parentRule/, /^rx$/, /^ry$/, /^stroke/, /^textAlign/, /^textAnchor/, /^textDecoration/, /^transform/, /^vectorEffect/, /^visibility/, /^x$/, /^y$/);
                        }
                        if (!((isMS &&
                            (exportingOptions.type === 'application/pdf' ||
                                chart.container.getElementsByTagName('image').length &&
                                    exportingOptions.type !== 'image/svg+xml')) || (exportingOptions.type === 'application/pdf' &&
                            hasExternalImages()))) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.fallbackToServer(exportingOptions, new Error('Image type not supported for this chart/browser.'))];
                    case 1:
                        _d.sent();
                        return [2 /*return*/];
                    case 2:
                        unbindGetSVG = Exporting_addEvent(chart, 'getSVG', function (e) {
                            chartCopyOptions = e.chartCopy.options;
                            chartCopyContainer =
                                e.chartCopy.container.cloneNode(true);
                            images = chartCopyContainer && chartCopyContainer
                                .getElementsByTagName('image') || [];
                        });
                        _d.label = 3;
                    case 3:
                        _d.trys.push([3, 14, 16, 17]);
                        // Trigger hook to get chart copy
                        this.getSVGForExport(exportingOptions, chartOptions);
                        imagesArray = images ? Array.from(images) : [];
                        _i = 0, imagesArray_1 = imagesArray;
                        _d.label = 4;
                    case 4:
                        if (!(_i < imagesArray_1.length)) return [3 /*break*/, 8];
                        image = imagesArray_1[_i];
                        href = image.getAttributeNS('http://www.w3.org/1999/xlink', 'href');
                        if (!href) return [3 /*break*/, 6];
                        Exporting.objectURLRevoke = false;
                        return [4 /*yield*/, Exporting.imageToDataURL(href, (exportingOptions === null || exportingOptions === void 0 ? void 0 : exportingOptions.scale) || 1, (exportingOptions === null || exportingOptions === void 0 ? void 0 : exportingOptions.type) || 'image/png')];
                    case 5:
                        dataURL = _d.sent();
                        // Change image href in chart copy
                        image.setAttributeNS('http://www.w3.org/1999/xlink', 'href', dataURL);
                        return [3 /*break*/, 7];
                    case 6:
                        image.parentNode.removeChild(image);
                        _d.label = 7;
                    case 7:
                        _i++;
                        return [3 /*break*/, 4];
                    case 8:
                        svgElement = chartCopyContainer === null || chartCopyContainer === void 0 ? void 0 : chartCopyContainer.querySelector('svg');
                        if (!(svgElement &&
                            !((_c = (_b = (_a = exportingOptions.chartOptions) === null || _a === void 0 ? void 0 : _a.chart) === null || _b === void 0 ? void 0 : _b.style) === null || _c === void 0 ? void 0 : _c.fontFamily))) return [3 /*break*/, 10];
                        return [4 /*yield*/, Exporting.inlineFonts(svgElement)];
                    case 9:
                        _d.sent();
                        _d.label = 10;
                    case 10:
                        sanitizedSVG = sanitize(chartCopyContainer === null || chartCopyContainer === void 0 ? void 0 : chartCopyContainer.innerHTML);
                        if (!(sanitizedSVG.indexOf('<foreignObject') > -1 &&
                            exportingOptions.type !== 'image/svg+xml' &&
                            (isMS ||
                                exportingOptions.type === 'application/pdf'))) return [3 /*break*/, 11];
                        throw new Error('Image type not supported for charts with embedded HTML');
                    case 11: 
                    // Trigger SVG download
                    return [4 /*yield*/, exporting.downloadSVG(sanitizedSVG, extend({ filename: exporting.getFilename() }, exportingOptions))];
                    case 12:
                        // Trigger SVG download
                        _d.sent();
                        _d.label = 13;
                    case 13: 
                    // Return the sanitized SVG
                    return [2 /*return*/, sanitizedSVG];
                    case 14:
                        error_2 = _d.sent();
                        return [4 /*yield*/, this.fallbackToServer(exportingOptions, error_2)];
                    case 15:
                        _d.sent();
                        return [3 /*break*/, 17];
                    case 16:
                        // Clean up
                        unbindGetSVG();
                        return [7 /*endfinally*/];
                    case 17: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Move the chart container(s) to another div.
     *
     * @private
     * @function Highcharts.Exporting#moveContainers
     *
     * @param {Highcharts.HTMLDOMElement} moveTo
     * Move target.
     *
     * @requires modules/exporting
     */
    Exporting.prototype.moveContainers = function (moveTo) {
        var chart = this.chart,
            scrollablePlotArea = chart.scrollablePlotArea;
        (
        // When scrollablePlotArea is active (#9533)
        scrollablePlotArea ?
            [
                scrollablePlotArea.fixedDiv,
                scrollablePlotArea.scrollingContainer
            ] :
            [chart.container]).forEach(function (div) {
            moveTo.appendChild(div);
        });
    };
    /**
     * Clears away other elements in the page and prints the chart as it is
     * displayed. By default, when the exporting module is enabled, a context
     * button with a drop down menu in the upper right corner accesses this
     * function.
     *
     * @sample highcharts/members/chart-print/
     * Print from a HTML button
     *
     * @function Highcharts.Exporting#print
     *
     * @emits Highcharts.Chart#event:beforePrint
     * @emits Highcharts.Chart#event:afterPrint
     *
     * @requires modules/exporting
     */
    Exporting.prototype.print = function () {
        var chart = this.chart;
        // Block the button while in printing mode
        if (this.isPrinting) {
            return;
        }
        Exporting.printingChart = chart;
        if (!Exporting_isSafari) {
            this.beforePrint();
        }
        // Give the browser time to draw WebGL content, an issue that randomly
        // appears (at least) in Chrome ~67 on the Mac (#8708).
        setTimeout(function () {
            Exporting_win.focus(); // #1510
            Exporting_win.print();
            // Allow the browser to prepare before reverting
            if (!Exporting_isSafari) {
                setTimeout(function () {
                    var _a;
                    (_a = chart.exporting) === null || _a === void 0 ? void 0 : _a.afterPrint();
                }, 1000);
            }
        }, 1);
    };
    /**
     * Add the buttons on chart load.
     *
     * @private
     * @function Highcharts.Exporting#render
     *
     * @requires modules/exporting
     */
    Exporting.prototype.render = function () {
        var exporting = this,
            chart = exporting.chart,
            options = exporting.options,
            isDirty = (exporting === null || exporting === void 0 ? void 0 : exporting.isDirty) || !(exporting === null || exporting === void 0 ? void 0 : exporting.svgElements.length);
        exporting.buttonOffset = 0;
        if (exporting.isDirty) {
            exporting.destroy();
        }
        if (isDirty && options.enabled !== false) {
            exporting.events = [];
            exporting.group || (exporting.group = chart.renderer.g('exporting-group').attr({
                zIndex: 3 // #4955, // #8392
            }).add());
            Exporting_objectEach(options === null || options === void 0 ? void 0 : options.buttons, function (button) {
                exporting.addButton(button);
            });
            exporting.isDirty = false;
        }
    };
    /**
     * Resolve CSS variables into hex colors.
     *
     * @private
     * @function Highcharts.Exporting#resolveCSSVariables
     *
     * @requires modules/exporting
     */
    Exporting.prototype.resolveCSSVariables = function () {
        Array.from(this.chart.container.querySelectorAll('*')).forEach(function (element) {
            ['color', 'fill', 'stop-color', 'stroke'].forEach(function (prop) {
                var _a;
                var attrValue = element.getAttribute(prop);
                if (attrValue === null || attrValue === void 0 ? void 0 : attrValue.includes('var(')) {
                    element.setAttribute(prop, getComputedStyle(element).getPropertyValue(prop));
                }
                var styleValue = (_a = element.style) === null || _a === void 0 ? void 0 : _a[prop];
                if (styleValue === null || styleValue === void 0 ? void 0 : styleValue.includes('var(')) {
                    element.style[prop] =
                        getComputedStyle(element).getPropertyValue(prop);
                }
            });
        });
    };
    /**
     * Updates the exporting object with the provided exporting options.
     *
     * @private
     * @function Highcharts.Exporting#update
     *
     * @param {Highcharts.ExportingOptions} exportingOptions
     * The exporting options to update with.
     * @param {boolean} [redraw=true]
     * Whether to redraw or not.
     *
     * @requires modules/exporting
     */
    Exporting.prototype.update = function (exportingOptions, redraw) {
        this.isDirty = true;
        merge(true, this.options, exportingOptions);
        if (pick(redraw, true)) {
            this.chart.redraw();
        }
    };
    /* *
     *
     *  Static Properties
     *
     * */
    Exporting.inlineAllowlist = [];
    // These CSS properties are not inlined. Remember camelCase.
    Exporting.inlineDenylist = [
        /-/, // In Firefox, both hyphened and camelCased names are listed
        /^(clipPath|cssText|d|height|width)$/, // Full words
        /^font$/, // More specific props are set
        /[lL]ogical(Width|Height)$/,
        /^parentRule$/,
        /^(cssRules|ownerRules)$/, // #19516 read-only properties
        /perspective/,
        /TapHighlightColor/,
        /^transition/,
        /^length$/, // #7700
        /^\d+$/ // #17538
    ];
    // These ones are translated to attributes rather than styles
    Exporting.inlineToAttributes = [
        'fill',
        'stroke',
        'strokeLinecap',
        'strokeLinejoin',
        'strokeWidth',
        'textAnchor',
        'x',
        'y'
    ];
    // Milliseconds to defer image load event handlers to offset IE bug
    Exporting.loadEventDeferDelay = isMS ? 150 : 0;
    Exporting.unstyledElements = [
        'clipPath',
        'defs',
        'desc'
    ];
    return Exporting;
}());
/* *
 *
 *  Class Namespace
 *
 * */
(function (Exporting) {
    /* *
     *
     *  Declarations
     *
     * */
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Composition function.
     *
     * @private
     * @function Highcharts.Exporting#compose
     *
     * @param {ChartClass} ChartClass
     * Chart class.
     * @param {SVGRendererClass} SVGRendererClass
     * SVGRenderer class.
     *
     * @requires modules/exporting
     */
    function compose(ChartClass, SVGRendererClass) {
        Exporting_ExportingSymbols.compose(SVGRendererClass);
        Exporting_Fullscreen.compose(ChartClass);
        // Check the composition registry for the Exporting
        if (!Exporting_pushUnique(Exporting_composed, 'Exporting')) {
            return;
        }
        // Adding wrappers for the deprecated functions
        extend((highcharts_Chart_commonjs_highcharts_Chart_commonjs2_highcharts_Chart_root_Highcharts_Chart_default()).prototype, {
            exportChart: function (exportingOptions, chartOptions) {
                return Exporting_awaiter(this, void 0, void 0, function () {
                    var _a;
                    return Exporting_generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, ((_a = this.exporting) === null || _a === void 0 ? void 0 : _a.exportChart(exportingOptions, chartOptions))];
                            case 1:
                                _b.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            },
            getChartHTML: function (applyStyleSheets) {
                var _a;
                return (_a = this.exporting) === null || _a === void 0 ? void 0 : _a.getChartHTML(applyStyleSheets);
            },
            getFilename: function () {
                var _a;
                return (_a = this.exporting) === null || _a === void 0 ? void 0 : _a.getFilename();
            },
            getSVG: function (chartOptions) {
                var _a;
                return (_a = this.exporting) === null || _a === void 0 ? void 0 : _a.getSVG(chartOptions);
            },
            print: function () {
                var _a;
                return (_a = this.exporting) === null || _a === void 0 ? void 0 : _a.print();
            }
        });
        ChartClass.prototype.callbacks.push(chartCallback);
        Exporting_addEvent(ChartClass, 'afterInit', onChartAfterInit);
        Exporting_addEvent(ChartClass, 'layOutTitle', onChartLayOutTitle);
        if (Exporting_isSafari) {
            Exporting_win.matchMedia('print').addListener(function (mqlEvent) {
                var _a,
                    _b;
                if (!Exporting.printingChart) {
                    return void 0;
                }
                if (mqlEvent.matches) {
                    (_a = Exporting.printingChart.exporting) === null || _a === void 0 ? void 0 : _a.beforePrint();
                }
                else {
                    (_b = Exporting.printingChart.exporting) === null || _b === void 0 ? void 0 : _b.afterPrint();
                }
            });
        }
        // Update with defaults of the exporting module
        setOptions(Exporting_ExportingDefaults);
    }
    Exporting.compose = compose;
    /**
     * Function that is added to the callbacks array that runs on chart load.
     *
     * @private
     * @function Highcharts#chartCallback
     *
     * @param {Highcharts.Chart} chart
     * The chart instance.
     *
     * @requires modules/exporting
     */
    function chartCallback(chart) {
        var exporting = chart.exporting;
        if (exporting) {
            exporting.render();
            // Add the exporting buttons on each chart redraw
            Exporting_addEvent(chart, 'redraw', function () {
                var _a;
                (_a = this.exporting) === null || _a === void 0 ? void 0 : _a.render();
            });
            // Destroy the export elements at chart destroy
            Exporting_addEvent(chart, 'destroy', function () {
                var _a;
                (_a = this.exporting) === null || _a === void 0 ? void 0 : _a.destroy();
            });
        }
        // Uncomment this to see a button directly below the chart, for quick
        // testing of export
        // let button, viewImage, viewSource;
        // if (!chart.renderer.forExport) {
        //     viewImage = function (): void {
        //         const div = doc.createElement('div');
        //         div.innerHTML = chart.exporting?.getSVGForExport() || '';
        //         chart.renderTo.parentNode.appendChild(div);
        //     };
        //     viewSource = function (): void {
        //         const pre = doc.createElement('pre');
        //         pre.innerHTML = chart.exporting?.getSVGForExport()
        //             .replace(/</g, '\n&lt;')
        //             .replace(/>/g, '&gt;') || '';
        //         chart.renderTo.parentNode.appendChild(pre);
        //     };
        //     viewImage();
        //     // View SVG Image
        //     button = doc.createElement('button');
        //     button.innerHTML = 'View SVG Image';
        //     chart.renderTo.parentNode.appendChild(button);
        //     button.onclick = viewImage;
        //     // View SVG Source
        //     button = doc.createElement('button');
        //     button.innerHTML = 'View SVG Source';
        //     chart.renderTo.parentNode.appendChild(button);
        //     button.onclick = viewSource;
        // }
    }
    /**
     * Add update methods to handle chart.update and chart.exporting.update and
     * chart.navigation.update. These must be added to the chart instance rather
     * than the Chart prototype in order to use the chart instance inside the
     * update function.
     *
     * @private
     * @function Highcharts#onChartAfterInit
     *
     * @requires modules/exporting
     */
    function onChartAfterInit() {
        var chart = this;
        // Create the exporting instance
        if (chart.options.exporting) {
            /**
             * Exporting object.
             *
             * @name Highcharts.Chart#exporting
             * @type {Highcharts.Exporting}
             */
            chart.exporting = new Exporting(chart, chart.options.exporting);
            // Register update() method for navigation. Cannot be set the same
            // way as for exporting, because navigation options are shared with
            // bindings which has separate update() logic.
            Chart_ChartNavigationComposition
                .compose(chart).navigation
                .addUpdate(function (options, redraw) {
                if (chart.exporting) {
                    chart.exporting.isDirty = true;
                    merge(true, chart.options.navigation, options);
                    if (pick(redraw, true)) {
                        chart.redraw();
                    }
                }
            });
        }
    }
    /**
     * On layout of titles (title, subtitle and caption), adjust the `alignTo`
     * box to avoid the context menu button.
     *
     * @private
     * @function Highcharts#onChartLayOutTitle
     *
     * @requires modules/exporting
     */
    function onChartLayOutTitle(_a) {
        var _b,
            _c,
            _d,
            _e;
        var alignTo = _a.alignTo,
            key = _a.key,
            textPxLength = _a.textPxLength;
        var exportingOptions = this.options.exporting,
            _f = merge((_b = this.options.navigation) === null || _b === void 0 ? void 0 : _b.buttonOptions, (_c = exportingOptions === null || exportingOptions === void 0 ? void 0 : exportingOptions.buttons) === null || _c === void 0 ? void 0 : _c.contextButton),
            align = _f.align,
            _g = _f.buttonSpacing,
            buttonSpacing = _g === void 0 ? 0 : _g,
            verticalAlign = _f.verticalAlign,
            _h = _f.width,
            width = _h === void 0 ? 0 : _h,
            space = alignTo.width - textPxLength,
            widthAdjust = width + buttonSpacing;
        if (((_d = exportingOptions === null || exportingOptions === void 0 ? void 0 : exportingOptions.enabled) !== null && _d !== void 0 ? _d : true) &&
            key === 'title' &&
            align === 'right' &&
            verticalAlign === 'top') {
            if (space < 2 * widthAdjust) {
                if (space < widthAdjust) {
                    alignTo.width -= widthAdjust;
                }
                else if (((_e = this.title) === null || _e === void 0 ? void 0 : _e.alignValue) !== 'left') {
                    alignTo.x -= widthAdjust - space / 2;
                }
            }
        }
    }
})(Exporting || (Exporting = {}));
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ var Exporting_Exporting = (Exporting);
/* *
 *
 *  API Declarations
 *
 * */
/**
 * Gets fired after a chart is printed through the context menu item or the
 * Chart.print method.
 *
 * @callback Highcharts.ExportingAfterPrintCallbackFunction
 *
 * @param {Highcharts.Chart} this
 * The chart on which the event occurred.
 * @param {global.Event} event
 * The event that occurred.
 */
/**
 * Gets fired before a chart is printed through the context menu item or the
 * Chart.print method.
 *
 * @callback Highcharts.ExportingBeforePrintCallbackFunction
 *
 * @param {Highcharts.Chart} this
 * The chart on which the event occurred.
 * @param {global.Event} event
 * The event that occurred.
 */
/**
 * Function to call if the offline-exporting module fails to export a chart on
 * the client side.
 *
 * @callback Highcharts.ExportingErrorCallbackFunction
 *
 * @param {Highcharts.ExportingOptions} options
 * The exporting options.
 * @param {global.Error} err
 * The error from the module.
 */
/**
 * Definition for a menu item in the context menu.
 *
 * @interface Highcharts.ExportingMenuObject
 */ /**
* The text for the menu item.
*
* @name Highcharts.ExportingMenuObject#text
* @type {string | undefined}
*/ /**
* If internationalization is required, the key to a language string.
*
* @name Highcharts.ExportingMenuObject#textKey
* @type {string | undefined}
*/ /**
* The click handler for the menu item.
*
* @name Highcharts.ExportingMenuObject#onclick
* @type {Highcharts.EventCallbackFunction<Highcharts.Chart> | undefined}
*/ /**
* Indicates a separator line instead of an item.
*
* @name Highcharts.ExportingMenuObject#separator
* @type {boolean | undefined}
*/
/**
 * Possible MIME types for exporting.
 *
 * @typedef {"image/png" | "image/jpeg" | "application/pdf" | "image/svg+xml"} Highcharts.ExportingMimeTypeValue
 */
(''); // Keeps doclets above in transpiled file
/* *
 *
 *  API Options
 *
 * */
/**
 * Fires after a chart is printed through the context menu item or the
 * `Chart.print` method.
 *
 * @sample highcharts/chart/events-beforeprint-afterprint/
 * Rescale the chart to print
 *
 * @type {Highcharts.ExportingAfterPrintCallbackFunction}
 * @since 4.1.0
 * @context Highcharts.Chart
 * @requires modules/exporting
 * @apioption chart.events.afterPrint
 */
/**
 * Fires before a chart is printed through the context menu item or
 * the `Chart.print` method.
 *
 * @sample highcharts/chart/events-beforeprint-afterprint/
 * Rescale the chart to print
 *
 * @type {Highcharts.ExportingBeforePrintCallbackFunction}
 * @since 4.1.0
 * @context Highcharts.Chart
 * @requires modules/exporting
 * @apioption chart.events.beforePrint
 */
(''); // Keeps doclets above in transpiled file

;// ./code/es5/es-modules/masters/modules/exporting.src.js





var G = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
// Class
G.Exporting = Exporting_Exporting;
// Compatibility
G.HttpUtilities = G.HttpUtilities || Core_HttpUtilities;
G.ajax = G.HttpUtilities.ajax;
G.getJSON = G.HttpUtilities.getJSON;
G.post = G.HttpUtilities.post;
// Compose
Exporting_Exporting.compose(G.Chart, G.Renderer);
/* harmony default export */ var exporting_src = ((highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()));

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});