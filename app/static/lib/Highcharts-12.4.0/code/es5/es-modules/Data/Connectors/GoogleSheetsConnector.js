/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Torstein Hønsi
 *  - Gøran Slettemark
 *  - Wojciech Chmiel
 *  - Sophie Bremer
 *  - Jomar Hønsi
 *
 * */
'use strict';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import DataConnector from './DataConnector.js';
import GoogleSheetsConverter from '../Converters/GoogleSheetsConverter.js';
import U from '../../Core/Utilities.js';
var merge = U.merge, pick = U.pick, defined = U.defined;
/* *
 *
 *  Functions
 *
 * */
/**
 * Tests Google's response for error.
 * @private
 */
function isGoogleError(json) {
    return (typeof json === 'object' && json &&
        typeof json.error === 'object' && json.error &&
        typeof json.error.code === 'number' &&
        typeof json.error.message === 'string' &&
        typeof json.error.status === 'string');
}
/* *
 *
 *  Class
 *
 * */
/**
 * @private
 * @todo implement save, requires oauth2
 */
var GoogleSheetsConnector = /** @class */ (function (_super) {
    __extends(GoogleSheetsConnector, _super);
    /* *
     *
     *  Constructor
     *
     * */
    /**
     * Constructs an instance of GoogleSheetsConnector
     *
     * @param {GoogleSheetsConnector.UserOptions} [options]
     * Options for the connector and converter.
     *
     * @param {Array<DataTableOptions>} [dataTables]
     * Multiple connector data tables options.
     *
     */
    function GoogleSheetsConnector(options, dataTables) {
        var _this = this;
        var mergedOptions = merge(GoogleSheetsConnector.defaultOptions, options);
        _this = _super.call(this, mergedOptions, dataTables) || this;
        _this.options = defined(dataTables) ?
            merge(mergedOptions, { dataTables: dataTables }) : mergedOptions;
        return _this;
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Loads data from a Google Spreadsheet.
     *
     * @param {DataEvent.Detail} [eventDetail]
     * Custom information for pending events.
     *
     * @return {Promise<this>}
     * Same connector instance with modified table.
     */
    GoogleSheetsConnector.prototype.load = function (eventDetail) {
        var _this = this;
        var _a;
        var connector = this, tables = connector.dataTables, _b = connector.options, dataModifier = _b.dataModifier, dataRefreshRate = _b.dataRefreshRate, enablePolling = _b.enablePolling, googleAPIKey = _b.googleAPIKey, googleSpreadsheetKey = _b.googleSpreadsheetKey, dataTables = _b.dataTables, url = GoogleSheetsConnector.buildFetchURL(googleAPIKey, googleSpreadsheetKey, connector.options);
        connector.emit({
            type: 'load',
            detail: eventDetail,
            tables: tables,
            url: url
        });
        if (!URL.canParse(url)) {
            throw new Error('Invalid URL: ' + url);
        }
        return fetch(url, { signal: (_a = connector === null || connector === void 0 ? void 0 : connector.pollingController) === null || _a === void 0 ? void 0 : _a.signal })
            .then(function (response) { return (response.json()); })
            .then(function (json) {
            if (isGoogleError(json)) {
                throw new Error(json.error.message);
            }
            _this.initConverters(json, function (key) {
                var _a, _b;
                var options = _this.options;
                var tableOptions = dataTables === null || dataTables === void 0 ? void 0 : dataTables.find(function (dataTable) { return dataTable.key === key; });
                // Takes over the connector default options.
                var mergedTableOptions = {
                    dataTableKey: key,
                    firstRowAsNames: (_a = tableOptions === null || tableOptions === void 0 ? void 0 : tableOptions.firstRowAsNames) !== null && _a !== void 0 ? _a : options.firstRowAsNames,
                    beforeParse: (_b = tableOptions === null || tableOptions === void 0 ? void 0 : tableOptions.beforeParse) !== null && _b !== void 0 ? _b : options.beforeParse
                };
                return new GoogleSheetsConverter(merge(_this.options, mergedTableOptions));
            }, function (converter, data) {
                converter.parse({ json: data });
            });
            return connector.setModifierOptions(dataModifier, dataTables);
        })
            .then(function () {
            connector.emit({
                type: 'afterLoad',
                detail: eventDetail,
                tables: tables,
                url: url
            });
            // Polling
            if (enablePolling) {
                setTimeout(function () { return connector.load(); }, Math.max(dataRefreshRate || 0, 1) * 1000);
            }
            return connector;
        })['catch'](function (error) {
            connector.emit({
                type: 'loadError',
                detail: eventDetail,
                error: error,
                tables: tables
            });
            throw error;
        });
    };
    /* *
     *
     *  Static Properties
     *
     * */
    GoogleSheetsConnector.defaultOptions = {
        googleAPIKey: '',
        googleSpreadsheetKey: '',
        enablePolling: false,
        dataRefreshRate: 2,
        firstRowAsNames: true
    };
    return GoogleSheetsConnector;
}(DataConnector));
/* *
 *
 *  Class Namespace
 *
 * */
(function (GoogleSheetsConnector) {
    /* *
     *
     *  Declarations
     *
     * */
    /* *
     *
     *  Constants
     *
     * */
    var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Creates GoogleSheets API v4 URL.
     * @private
     */
    function buildFetchURL(apiKey, sheetKey, options) {
        if (options === void 0) { options = {}; }
        var url = new URL("https://sheets.googleapis.com/v4/spreadsheets/".concat(sheetKey, "/values/"));
        var range = options.onlyColumnNames ?
            'A1:Z1' : buildQueryRange(options);
        url.pathname += range;
        var searchParams = url.searchParams;
        searchParams.set('alt', 'json');
        if (!options.onlyColumnNames) {
            searchParams.set('dateTimeRenderOption', 'FORMATTED_STRING');
            searchParams.set('majorDimension', 'COLUMNS');
            searchParams.set('valueRenderOption', 'UNFORMATTED_VALUE');
        }
        searchParams.set('prettyPrint', 'false');
        searchParams.set('key', apiKey);
        return url.href;
    }
    GoogleSheetsConnector.buildFetchURL = buildFetchURL;
    /**
     * Creates sheets range.
     * @private
     */
    function buildQueryRange(options) {
        if (options === void 0) { options = {}; }
        var endColumn = options.endColumn, endRow = options.endRow, googleSpreadsheetRange = options.googleSpreadsheetRange, startColumn = options.startColumn, startRow = options.startRow;
        return googleSpreadsheetRange || ((alphabet[startColumn || 0] || 'A') +
            (Math.max((startRow || 0), 0) + 1) +
            ':' +
            (alphabet[pick(endColumn, 25)] || 'Z') +
            (endRow ?
                Math.max(endRow, 0) :
                'Z'));
    }
    GoogleSheetsConnector.buildQueryRange = buildQueryRange;
})(GoogleSheetsConnector || (GoogleSheetsConnector = {}));
DataConnector.registerType('GoogleSheets', GoogleSheetsConnector);
/* *
 *
 *  Default Export
 *
 * */
export default GoogleSheetsConnector;
