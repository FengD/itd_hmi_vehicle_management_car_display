var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import * as React from 'react';
import { invariantIntlContext } from '../utils';
import { Context } from './injectIntl';
var DisplayName;
(function (DisplayName) {
    DisplayName["formatDate"] = "FormattedDate";
    DisplayName["formatTime"] = "FormattedTime";
    DisplayName["formatNumber"] = "FormattedNumber";
})(DisplayName || (DisplayName = {}));
var DisplayNameParts;
(function (DisplayNameParts) {
    DisplayNameParts["formatDate"] = "FormattedDateParts";
    DisplayNameParts["formatTime"] = "FormattedTimeParts";
    DisplayNameParts["formatNumber"] = "FormattedNumberParts";
})(DisplayNameParts || (DisplayNameParts = {}));
export const FormattedNumberParts = props => (React.createElement(Context.Consumer, null, intl => {
    invariantIntlContext(intl);
    const { value, children } = props, formatProps = __rest(props, ["value", "children"]);
    return children(intl.formatNumberToParts(value, formatProps));
}));
FormattedNumberParts.displayName = 'FormattedNumberParts';
export function createFormattedDateTimePartsComponent(name) {
    const ComponentParts = props => (React.createElement(Context.Consumer, null, intl => {
        invariantIntlContext(intl);
        const { value, children } = props, formatProps = __rest(props, ["value", "children"]);
        const date = typeof value === 'string' ? new Date(value || 0) : value;
        const formattedParts = name === 'formatDate'
            ? intl.formatDateToParts(date, formatProps)
            : intl.formatTimeToParts(date, formatProps);
        return children(formattedParts);
    }));
    ComponentParts.displayName = DisplayNameParts[name];
    return ComponentParts;
}
export function createFormattedComponent(name) {
    const Component = props => (React.createElement(Context.Consumer, null, intl => {
        invariantIntlContext(intl);
        const { value, children } = props, formatProps = __rest(props, ["value", "children"]);
        const formattedValue = intl[name](value, formatProps);
        if (typeof children === 'function') {
            return children(formattedValue);
        }
        const Text = intl.textComponent || React.Fragment;
        return React.createElement(Text, null, formattedValue);
    }));
    Component.displayName = DisplayName[name];
    return Component;
}
