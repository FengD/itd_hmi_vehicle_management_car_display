import { MessageDescriptor } from './types';
declare type Messages<Names extends keyof any = string> = {
    [key in Names]: MessageDescriptor;
};
export default function defineMessages<Names extends keyof any>(messageDescriptors: Messages<Names>): Messages<Names>;
export {};
