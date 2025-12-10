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
 *  - Christer Vasseng
 *  - Gøran Slettemark
 *  - Sophie Bremer
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
import CSVConverter from '../Converters/CSVConverter.js';
import DataConnector from './DataConnector.js';
import U from '../../Core/Utilities.js';
var merge = U.merge, defined = U.defined;
/* *
 *
 *  Class
 *
 * */
/**
 * Class that handles creating a DataConnector from CSV
 *
 * @private
 */
var CSVConnector = /** @class */ (function (_super) {
    __extends(CSVConnector, _super);
    /* *
     *
     *  Constructor
     *
     * */
    /**
     * Constructs an instance of CSVConnector.
     *
     * @param {CSVConnector.UserOptions} [options]
     * Options for the connector and converter.
     *
     * @param {Array<DataTableOptions>} [dataTables]
     * Multiple connector data tables options.
     *
     */
    function CSVConnector(options, dataTables) {
        var _this = this;
        var mergedOptions = merge(CSVConnector.defaultOptions, options);
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
     * Initiates the loading of the CSV source to the connector
     *
     * @param {DataEvent.Detail} [eventDetail]
     * Custom information for pending events.
     *
     * @emits CSVConnector#load
     * @emits CSVConnector#afterLoad
     */
    CSVConnector.prototype.load = function (eventDetail) {
        var _this = this;
        var _a;
        var connector = this, tables = connector.dataTables, _b = connector.options, csv = _b.csv, csvURL = _b.csvURL, dataModifier = _b.dataModifier, dataTables = _b.dataTables;
        connector.emit({
            type: 'load',
            csv: csv,
            detail: eventDetail,
            tables: tables
        });
        return Promise
            .resolve(csvURL ?
            fetch(csvURL, {
                signal: (_a = connector === null || connector === void 0 ? void 0 : connector.pollingController) === null || _a === void 0 ? void 0 : _a.signal
            }).then(function (response) { return response.text(); }) :
            csv || '')
            .then(function (csv) {
            if (csv) {
                _this.initConverters(csv, function (key) {
                    var _a, _b;
                    var options = _this.options;
                    var tableOptions = dataTables === null || dataTables === void 0 ? void 0 : dataTables.find(function (dataTable) { return dataTable.key === key; });
                    // Takes over the connector default options.
                    var mergedTableOptions = {
                        dataTableKey: key,
                        firstRowAsNames: (_a = tableOptions === null || tableOptions === void 0 ? void 0 : tableOptions.firstRowAsNames) !== null && _a !== void 0 ? _a : options.firstRowAsNames,
                        beforeParse: (_b = tableOptions === null || tableOptions === void 0 ? void 0 : tableOptions.beforeParse) !== null && _b !== void 0 ? _b : options.beforeParse
                    };
                    return new CSVConverter(merge(_this.options, mergedTableOptions));
                }, function (converter, data) {
                    converter.parse({ csv: data });
                });
            }
            return connector
                .setModifierOptions(dataModifier, dataTables)
                .then(function () { return csv; });
        })
            .then(function (csv) {
            connector.emit({
                type: 'afterLoad',
                csv: csv,
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
    CSVConnector.defaultOptions = {
        csv: '',
        csvURL: '',
        enablePolling: false,
        dataRefreshRate: 1,
        firstRowAsNames: true
    };
    return CSVConnector;
}(DataConnector));
DataConnector.registerType('CSV', CSVConnector);
/* *
 *
 *  Default Export
 *
 * */
export default CSVConnector;
