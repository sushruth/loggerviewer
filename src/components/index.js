export { Header } from './header/header.js';
export { DropBox } from './dropbox/dropbox.js'
export { Store } from './../store/store';
export { Timeline } from './timeline/timeline';
export { Screenshot } from './screenshot/screenshot';
export { NetworkCall } from './networkcall/networkcall';

export const getIfExists = (obj, key) => {
    return key.split(".").reduce(function(o, x) {
        return (typeof o === "undefined" || o === null) ? o : o[x];
    }, obj);
}