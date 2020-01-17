import * as React from 'react';
import { IntlShape, FormatDateOptions, FormatNumberOptions } from '../types';
declare type Formatter = {
    formatDate: FormatDateOptions;
    formatTime: FormatDateOptions;
    formatNumber: FormatNumberOptions;
};
export declare const FormattedNumberParts: React.FC<Formatter['formatNumber'] & {
    value: Parameters<IntlShape['formatNumber']>[0];
    children(val: Intl.NumberFormatPart[]): React.ReactElement | null;
}>;
export declare function createFormattedDateTimePartsComponent<Name extends keyof Formatter>(name: Name): React.FunctionComponent<Formatter[Name] & {
    value: Parameters<IntlShape[Name]>[0];
    children(val: Intl.DateTimeFormatPart[]): React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | null;
}>;
export declare function createFormattedComponent<Name extends keyof Formatter>(name: Name): React.FunctionComponent<Formatter[Name] & {
    value: Parameters<IntlShape[Name]>[0];
}>;
export {};
