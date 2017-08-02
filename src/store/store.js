import { observable } from 'mobx';
import {getIfExists} from '../components';

export const Store = observable({
	imageStore: new Map(),
	logStore: {},
	logStoreIsSet: false,
	logFilters: {
		hosts: []
	}
});

Store.pushImage = (key, data) => {
	Store.imageStore.set(key, data);
};

Store.setLogStore = (logString) => {
	Store.logStore = JSON.parse(logString).map((entry) => {
		entry.enabled = true;
		if(getIfExists(entry, 'request.url')) {
			entry.request.url = new URL(entry.request.url);
		}
		return entry;
	});
	Store.logStoreIsSet = true;
};

let sortByTimestamp = (a, b) => {
	let timeA = new Date(a.timestamp);
	let timeB = new Date(b.timestamp);
	if (timeA < timeB) {
		return -1;
	}
	if (timeA > timeB) {
		return 1;
	}
	return 0;
}

Store.getSortedLog = () => {
	let logData = Store.logStore;
	// logData.sort(sortByTimestamp);
	return logData;
};

Store.isHostAllowed = function(host) {
	if(Store.logFilters.hosts.includes(host)) {
		return true;
	} else if(Store.logFilters.hosts.length === 0) {
		return true
	} else {
		return false;
	}
}