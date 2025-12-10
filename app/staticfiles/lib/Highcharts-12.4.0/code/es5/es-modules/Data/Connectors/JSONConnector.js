/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Pawel Lysy
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
import U from '../../Core/Utilities.js';
import JSONConverter from '../Converters/JSONConverter.js';
var merge = U.merge, defined = U.defined;
/* *
 *
 *  Class
 *
 * */
/**
 * Class that handles creating a DataConnector from JSON structure
 *
 * @private
 */
var JSONConnector = /** @class */ (function (_super) {
    __extends(JSONConnector, _super);
    /* *
     *
     *  Constructor
     *
     * */
    /**
     * Constructs an instance of JSONConnector.
     *
     * @param {JSONConnector.UserOptions} [options]
     * Options for the connector and converter.
     *
     * @param {Array<DataTableOptions>} [dataTables]
     * Multiple connector data tables options.
     */
    function JSONConnector(options, dataTables) {
        var _this = this;
        var mergedOptions = merge(JSONConnector.defaultOptions, options);
        _this = _super.call(this, mergedOptions, dataTables) || this;
        _this.options = defined(dataTables) ?
            merge(mergedOptions, { dataTables: dataTables }) : mergedOptions;
        if (mergedOptions.enablePolling) {
            _this.startPolling(Math.max(mergedOptions.dataRefreshRate || 0, 1) * 1000);
        }
        return _this;
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Initiates the loading of the JSON source to the connector
     *
     * @param {DataEvent.Detail} [eventDetail]
     * Custom information for pending events.
     *
     * @emits JSONConnector#load
     * @emits JSONConnector#afterLoad
     */
    JSONConnector.prototype.load = function (eventDetail) {
        var _this = this;
        var _a;
        var connector = this, tables = connector.dataTables, _b = connector.options, data = _b.data, dataUrl = _b.dataUrl, dataModifier = _b.dataModifier, dataTables = _b.dataTables;
        connector.emit({
            type: 'load',
            data: data,
            detail: eventDetail,
            tables: tables
        });
        return Promise
            .resolve(dataUrl ?
            fetch(dataUrl, {
                signal: (_a = connector === null || connector === void 0 ? void 0 : connector.pollingController) === null || _a === void 0 ? void 0 : _a.signal
            }).then(function (response) { return response.json(); })['catch'](function (error) {
                connector.emit({
                    type: 'loadError',
                    detail: eventDetail,
                    error: error,
                    tables: tables
                });
                console.warn("Unable to fetch data from ".concat(dataUrl, ".")); // eslint-disable-line no-console
            }) :
            data || [])
            .then(function (data) {
            if (data) {
                _this.initConverters(data, function (key) {
                    var _a, _b, _c, _d;
                    var options = _this.options;
                    var tableOptions = dataTables === null || dataTables === void 0 ? void 0 : dataTables.find(function (dataTable) { return dataTable.key === key; });
                    // Takes over the connector default options.
                    var mergedTableOptions = {
                        dataTableKey: key,
                        columnNames: (_a = tableOptions === null || tableOptions === void 0 ? void 0 : tableOptions.columnNames) !== null && _a !== void 0 ? _a : options.columnNames,
                        firstRowAsNames: (_b = tableOptions === null || tableOptions === void 0 ? void 0 : tableOptions.firstRowAsNames) !== null && _b !== void 0 ? _b : options.firstRowAsNames,
                        orientation: (_c = tableOptions === null || tableOptions === void 0 ? void 0 : tableOptions.orientation) !== null && _c !== void 0 ? _c : options.orientation,
                        beforeParse: (_d = tableOptions === null || tableOptions === void 0 ? void 0 : tableOptions.beforeParse) !== null && _d !== void 0 ? _d : options.beforeParse
                    };
                    return new JSONConverter(merge(_this.options, mergedTableOptions));
                }, function (converter, data) {
                    converter.parse({ data: data });
                });
            }
            return connector.setModifierOptions(dataModifier, dataTables)
                .then(function () { return data; });
        })
            .then(function (data) {
            connector.emit({
                type: 'afterLoad',
                data: data,
                detail: eventDetail,
                tables: tables
            });
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
    JSONConnector.defaultOptions = {
        enablePolling: false,
        dataRefreshRate: 0,
        firstRowAsNames: true,
        orientation: 'rows'
    };
    return JSONConnector;
}(DataConnector));
DataConnector.registerType('JSON', JSONConnector);
/* *
 *
 *  Default Export
 *
 * */
export default JSONConnector;
