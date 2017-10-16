/**
 * 倒计时组件
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Util = require('../Util');

var _Util2 = _interopRequireDefault(_Util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Countdown = function (_React$Component) {
    (0, _inherits3.default)(Countdown, _React$Component);

    function Countdown() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, Countdown);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Countdown.__proto__ || (0, _getPrototypeOf2.default)(Countdown)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            leftsec: 0
        }, _this.componentDidMount = function () {
            _Util2.default.setInterval(function () {
                var current = new Date().getTime();
                current = parseInt(current / 1000);
                var leftsec = _this.props.endtime - current;
                _this.setState({
                    leftsec: leftsec < 0 ? 0 : leftsec
                });
            }, 1000);
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(Countdown, [{
        key: 'render',
        value: function render() {
            var day = void 0,
                hour = void 0,
                minute = void 0,
                second = void 0;
            var leftsecond = this.state.leftsec;
            if (leftsecond < 0) {
                day = hour = minute = second = 0;
            } else {
                day = Math.floor(leftsecond / (60 * 60 * 24));
                hour = Math.floor((leftsecond - day * 24 * 60 * 60) / 3600);
                minute = Math.floor((leftsecond - day * 24 * 60 * 60 - hour * 3600) / 60);
                second = Math.floor(leftsecond - day * 24 * 60 * 60 - hour * 3600 - minute * 60);
            }
            return day > 0 ? _react2.default.createElement(
                'span',
                { className: 'weui_countdown' },
                _Util2.default.preZero(day),
                '\u5929',
                _Util2.default.preZero(hour),
                '\u5C0F\u65F6'
            ) : _react2.default.createElement(
                'span',
                { className: 'weui_countdown' },
                _Util2.default.preZero(hour),
                ':',
                _Util2.default.preZero(minute),
                ':',
                _Util2.default.preZero(second)
            );
        }
    }]);
    return Countdown;
}(_react2.default.Component);

exports.default = Countdown;
module.exports = exports['default'];