/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sophie Bremer
 *  - Wojciech Chmiel
 *  - Gøran Slettemark
 *
 * */
'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
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
import DataModifier from '../Modifiers/DataModifier.js';
import DataTable from '../DataTable.js';
import U from '../../Core/Utilities.js';
var addEvent = U.addEvent, fireEvent = U.fireEvent, merge = U.merge, pick = U.pick;
/* *
 *
 *  Class
 *
 * */
/**
 * Abstract class providing an interface for managing a DataConnector.
 *
 * @private
 */
var DataConnector = /** @class */ (function () {
    /* *
     *
     *  Constructor
     *
     * */
    /**
     * Constructor for the connector class.
     *
     * @param {DataConnector.UserOptions} [options]
     * Options to use in the connector.
     *
     * @param {Array<DataTableOptions>} [dataTables]
     * Multiple connector data tables options.
     */
    function DataConnector(options, dataTables) {
        if (options === void 0) { options = {}; }
        if (dataTables === void 0) { dataTables = []; }
        /**
         * Tables managed by this DataConnector instance.
         */
        this.dataTables = {};
        /**
         * Helper flag for detecting whether the data connector is loaded.
         * @internal
         */
        this.loaded = false;
        this.metadata = options.metadata || { columns: {} };
        // Create a data table for each defined in the dataTables user options.
        var dataTableIndex = 0;
        if ((dataTables === null || dataTables === void 0 ? void 0 : dataTables.length) > 0) {
            for (var i = 0, iEnd = dataTables.length; i < iEnd; ++i) {
                var dataTable = dataTables[i];
                var key = dataTable === null || dataTable === void 0 ? void 0 : dataTable.key;
                this.dataTables[key !== null && key !== void 0 ? key : dataTableIndex] =
                    new DataTable(dataTable);
                if (!key) {
                    dataTableIndex++;
                }
            }
            // If user options dataTables is not defined, generate a default table.
        }
        else {
            this.dataTables[0] = new DataTable(options.dataTable);
        }
    }
    Object.defineProperty(DataConnector.prototype, "polling", {
        /**
         * Poll timer ID, if active.
         */
        get: function () {
            return !!this._polling;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataConnector.prototype, "table", {
        /**
         * Gets the first data table.
         *
         * @return {DataTable}
         * The data table instance.
         */
        get: function () {
            return this.getTable();
        },
        enumerable: false,
        configurable: true
    });
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Method for adding metadata for a single column.
     *
     * @param {string} name
     * The name of the column to be described.
     *
     * @param {DataConnector.MetaColumn} columnMeta
     * The metadata to apply to the column.
     */
    DataConnector.prototype.describeColumn = function (name, columnMeta) {
        var connector = this, columns = connector.metadata.columns;
        columns[name] = merge(columns[name] || {}, columnMeta);
    };
    /**
     * Method for applying columns meta information to the whole DataConnector.
     *
     * @param {Highcharts.Dictionary<DataConnector.MetaColumn>} columns
     * Pairs of column names and MetaColumn objects.
     */
    DataConnector.prototype.describeColumns = function (columns) {
        var connector = this, columnNames = Object.keys(columns);
        var columnName;
        while (typeof (columnName = columnNames.pop()) === 'string') {
            connector.describeColumn(columnName, columns[columnName]);
        }
    };
    /**
     * Emits an event on the connector to all registered callbacks of this
     * event.
     *
     * @param {DataConnector.Event} [e]
     * Event object containing additional event information.
     */
    DataConnector.prototype.emit = function (e) {
        fireEvent(this, e.type, e);
    };
    /**
     * Returns the order of columns.
     *
     * @param {boolean} [usePresentationState]
     * Whether to use the column order of the presentation state of the table.
     *
     * @return {Array<string>|undefined}
     * Order of columns.
     */
    DataConnector.prototype.getColumnOrder = function (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    usePresentationState) {
        var connector = this, columns = connector.metadata.columns, names = Object.keys(columns || {});
        if (names.length) {
            return names.sort(function (a, b) { return (pick(columns[a].index, 0) - pick(columns[b].index, 0)); });
        }
    };
    /**
     * Returns a single data table instance based on the provided key.
     * Otherwise, returns the first data table.
     *
     * @param {string} [key]
     * The data table key.
     *
     * @return {DataTable}
     * The data table instance.
     */
    DataConnector.prototype.getTable = function (key) {
        if (key) {
            return this.dataTables[key];
        }
        return Object.values(this.dataTables)[0];
    };
    /**
     * Retrieves the columns of the dataTable,
     * applies column order from meta.
     *
     * @param {boolean} [usePresentationOrder]
     * Whether to use the column order of the presentation state of the table.
     *
     * @return {Highcharts.DataTableColumnCollection}
     * An object with the properties `columnNames` and `columnValues`
     */
    DataConnector.prototype.getSortedColumns = function (usePresentationOrder) {
        return this.table.getColumns(this.getColumnOrder(usePresentationOrder));
    };
    /**
     * The default load method, which fires the `afterLoad` event
     *
     * @return {Promise<DataConnector>}
     * The loaded connector.
     *
     * @emits DataConnector#afterLoad
     */
    DataConnector.prototype.load = function () {
        fireEvent(this, 'afterLoad', { table: this.table });
        return Promise.resolve(this);
    };
    /**
     * Registers a callback for a specific connector event.
     *
     * @param {string} type
     * Event type as a string.
     *
     * @param {DataEventEmitter.Callback} callback
     * Function to register for the connector callback.
     *
     * @return {Function}
     * Function to unregister callback from the connector event.
     */
    DataConnector.prototype.on = function (type, callback) {
        return addEvent(this, type, callback);
    };
    /**
     * The default save method, which fires the `afterSave` event.
     *
     * @return {Promise<DataConnector>}
     * The saved connector.
     *
     * @emits DataConnector#afterSave
     * @emits DataConnector#saveError
     */
    DataConnector.prototype.save = function () {
        fireEvent(this, 'saveError', { table: this.table });
        return Promise.reject(new Error('Not implemented'));
    };
    /**
     * Sets the index and order of columns.
     *
     * @param {Array<string>} columnNames
     * Order of columns.
     */
    DataConnector.prototype.setColumnOrder = function (columnNames) {
        var connector = this;
        for (var i = 0, iEnd = columnNames.length; i < iEnd; ++i) {
            connector.describeColumn(columnNames[i], { index: i });
        }
    };
    DataConnector.prototype.setModifierOptions = function (modifierOptions, tablesOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var _loop_1, _i, _a, _b, key, table;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _loop_1 = function (key, table) {
                            var tableOptions, mergedModifierOptions, ModifierClass;
                            return __generator(this, function (_d) {
                                switch (_d.label) {
                                    case 0:
                                        tableOptions = tablesOptions === null || tablesOptions === void 0 ? void 0 : tablesOptions.find(function (dataTable) { return dataTable.key === key; });
                                        mergedModifierOptions = merge(tableOptions === null || tableOptions === void 0 ? void 0 : tableOptions.dataModifier, modifierOptions);
                                        ModifierClass = (mergedModifierOptions &&
                                            DataModifier.types[mergedModifierOptions.type]);
                                        return [4 /*yield*/, table.setModifier(ModifierClass ?
                                                new ModifierClass(mergedModifierOptions) :
                                                void 0)];
                                    case 1:
                                        _d.sent();
                                        return [2 /*return*/];
                                }
                            });
                        };
                        _i = 0, _a = Object.entries(this.dataTables);
                        _c.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        _b = _a[_i], key = _b[0], table = _b[1];
                        return [5 /*yield**/, _loop_1(key, table)];
                    case 2:
                        _c.sent();
                        _c.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, this];
                }
            });
        });
    };
    /**
     * Starts polling new data after the specific time span in milliseconds.
     *
     * @param {number} refreshTime
     * Refresh time in milliseconds between polls.
     */
    DataConnector.prototype.startPolling = function (refreshTime) {
        if (refreshTime === void 0) { refreshTime = 1000; }
        var connector = this;
        var tables = connector.dataTables;
        // Assign a new abort controller.
        this.pollingController = new AbortController();
        // Clear the polling timeout.
        window.clearTimeout(connector._polling);
        connector._polling = window.setTimeout(function () { return connector
            .load()['catch'](function (error) { return connector.emit({
            type: 'loadError',
            error: error,
            tables: tables
        }); })
            .then(function () {
            if (connector._polling) {
                connector.startPolling(refreshTime);
            }
        }); }, refreshTime);
    };
    /**
     * Stops polling data. Shouldn't be performed if polling is already stopped.
     */
    DataConnector.prototype.stopPolling = function () {
        var _a;
        var connector = this;
        if (!connector.polling) {
            return;
        }
        // Abort the existing request.
        (_a = connector === null || connector === void 0 ? void 0 : connector.pollingController) === null || _a === void 0 ? void 0 : _a.abort();
        // Clear the polling timeout.
        window.clearTimeout(connector._polling);
        delete connector._polling;
    };
    /**
     * Retrieves metadata from a single column.
     *
     * @param {string} name
     * The identifier for the column that should be described
     *
     * @return {DataConnector.MetaColumn|undefined}
     * Returns a MetaColumn object if found.
     */
    DataConnector.prototype.whatIs = function (name) {
        return this.metadata.columns[name];
    };
    /**
     * Iterates over the dataTables and initiates the corresponding converters.
     * Updates the dataTables and assigns the first converter.
     *
     * @param {T}[data]
     * Data specific to the corresponding converter.
     *
     * @param {DataConnector.CreateConverterFunction}[createConverter]
     * Creates a specific converter combining the dataTable options.
     *
     * @param {DataConnector.ParseDataFunction<T>}[parseData]
     * Runs the converter parse method with the specific data type.
     */
    DataConnector.prototype.initConverters = function (data, createConverter, parseData) {
        var index = 0;
        for (var _i = 0, _a = Object.entries(this.dataTables); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], table = _b[1];
            // Create a proper converter and parse its data.
            var converter = createConverter(key, table);
            parseData(converter, data);
            // Update the dataTable.
            table.deleteColumns();
            table.setColumns(converter.getTable().getColumns());
            // Assign the first converter.
            if (index === 0) {
                this.converter = converter;
            }
            index++;
        }
    };
    return DataConnector;
}());
/* *
 *
 *  Class Namespace
 *
 * */
(function (DataConnector) {
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
    /**
     * Registry as a record object with connector names and their class.
     */
    DataConnector.types = {};
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Adds a connector class to the registry. The connector has to provide the
     * `DataConnector.options` property and the `DataConnector.load` method to
     * modify the table.
     *
     * @private
     *
     * @param {string} key
     * Registry key of the connector class.
     *
     * @param {DataConnectorType} DataConnectorClass
     * Connector class (aka class constructor) to register.
     *
     * @return {boolean}
     * Returns true, if the registration was successful. False is returned, if
     * their is already a connector registered with this key.
     */
    function registerType(key, DataConnectorClass) {
        return (!!key &&
            !DataConnector.types[key] &&
            !!(DataConnector.types[key] = DataConnectorClass));
    }
    DataConnector.registerType = registerType;
})(DataConnector || (DataConnector = {}));
/* *
 *
 *  Default Export
 *
 * */
export default DataConnector;
