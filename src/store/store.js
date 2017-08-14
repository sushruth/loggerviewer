import { observable } from 'mobx';
import { getIfExists } from '../components';

export const Store = observable({
	imageStore: new Map(),
	logStore: {},
	logStoreIsSet: false,
	logFilters: {
		hostlist: [],
		hosts: [
			{
				host: '',
				enabled: false
			}
		]
	},
});

Store.pushImage = (key, data) => {
	Store.imageStore.set(key, data);
};

Store.setLogStore = (logString) => {
	Store.logStore = JSON.parse(logString).map((entry) => {
		entry.enabled = true;
		if (getIfExists(entry, 'request.url')) {
			entry.request.url = new URL(entry.request.url);
			if (!Store.logFilters.hostlist.includes(entry.request.url.hostname)) {
				Store.logFilters.hostlist.push(entry.request.url.hostname);
				Store.logFilters.hosts.push({
					host: entry.request.url.hostname,
					enabled: false
				});
			}
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
	Array.from(logData).sort(sortByTimestamp);
	return logData;
};

Store.enableHosts = function(hostList) {
	// hostList.forEach(function(host) {
		Store.logFilters.hosts.forEach((v, i) => {
			if(hostList.includes(v.host)) {
				Store.logFilters.hosts[i].enabled = true;
			} else {
				Store.logFilters.hosts[i].enabled = false;				
			}
		})
	// });
};

Store.isHostAllowed = function (host) {
	if (Store.logFilters.hosts.filter(v => (v.host === host && v.enabled)).length > 0) {
		return true;
	} else {
		return false;
	}
}