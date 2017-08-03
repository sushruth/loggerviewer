import React, { Component } from 'react';
import Highlight from 'react-highlight';
import ReactDOM from 'react-dom'
import './networkcall.css';

import { getIfExists, Tuple } from '../index';

let endpointUrl = (pathname, endpoint) => {
	return (
		<span><span>{pathname.replace(endpoint, '')}</span><span className="endpoint">{endpoint}</span></span>
	)
}

export const NetworkCall = class NetworkCall extends Component {

	constructor(props) {
		super(props);

		this.state = {
			expanded: false
		};

		this.collapse = this.collapse.bind(this);
		this.expand = this.expand.bind(this);
		this.toggle = this.toggle.bind(this);
		this.copyData = this.copyData.bind(this);
	}

	expand() {
		this.setState({
			expanded: true
		})
	}

	collapse() {
		this.setState({
			expanded: false
		});
	}

	toggle() {
		if (this.state.expanded) {
			this.collapse();
		} else {
			this.expand();
		}
	}

	copyData(e, node) {
		node = ReactDOM.findDOMNode(node);
		let range = document.createRange();
		let selection = window.getSelection();
		range.selectNodeContents(node);
		selection.removeAllRanges();
		selection.addRange(range);

		try {
			document.execCommand('copy');
		} catch (err) {
			console.log('Oops, unable to copy');
		}

		window.getSelection().removeAllRanges();
	}

	getTuple(dataArray, filter) {
		return dataArray.map((query, index) => {
			if(!!filter && !!query.name.match(filter)) { return '' }
			return (
				<Tuple className="item" property={query.name} value={query.value} key={index} />
			);
			
		})
	}

	render() {
		let url = new URL(this.props.call.request.url);
		let endpoint = url.pathname.split('/').slice(-1);
		let statusCode = getIfExists(this.props.call, 'response.content.body.response.header.statusCode') || '';
		let statusColor = 'statusNone', errorCall = '', callMethod = this.props.call.request.method;

		let requestBody = JSON.stringify(getIfExists(this.props.call, 'request.postData.body'), null, 2);
		let responseBody = JSON.stringify(getIfExists(this.props.call, 'response.content.body'), null, 2);

		if (statusCode === '0000') {
			statusColor = 'statusGreen';
		} else if (statusCode === 'error') {
			statusColor = 'statusRed';
			errorCall = 'error';
		}

		let expandedSection = '';

		let queryString = this.getTuple(this.props.call.request.queryString);

		// let requestHeaders = this.getTuple(this.props.call.request.headers,  /(cookie|:path)/g);
		// let requestCookies = this.getTuple(this.props.call.request.cookies);

		// let responseHeaders = this.getTuple(this.props.call.response.headers, /(cookie|:path)/g);
		// let responseCookies = this.getTuple(this.props.call.response.cookies);

		if (this.state.expanded) {
			expandedSection = (
				<div className="expandedCall flex col">
					<div className="item shrink">
						<div className="eesTitle">
							Query string
						</div>
						<div className="tupleContainer flex">
							{queryString}
						</div>
					</div>
					<div className="item flex">
						<div className="item requestBox">
							<div className="eesTitle">
								Request
							</div>
							<div className="requestBody">
								<div className="copy" onClick={e => this.copyData(e, this.requestText)}><img src={require('./../../assets/images/copy.png')} alt="" /></div>
								<Highlight className="json" ref={(requestText) => { this.requestText = requestText; }}>{requestBody}</Highlight>
							</div>
							{/* <div className="flex">
								<div className="item">
									<div className="eesTitle">
										Headers
									</div>
									<div className="flex col">
										{requestHeaders}
									</div>
								</div>
								<div className="item">
									<div className="eesTitle">
										Cookies
									</div>
									<div className="flex col">
										{requestCookies}
									</div>
								</div>
							</div> */}
						</div>
						<div className="item responseBox">
							<div className="eesTitle">
								Response
							</div>
							<div className="responseBody">
								<div className="copy" onClick={e => this.copyData(e, this.responseText)}><img src={require('./../../assets/images/copy.png')} alt="" /></div>
								<Highlight className="json" ref={(responseText) => { this.responseText = responseText; }}>{responseBody}</Highlight>
							</div>
							{/* <div className="flex">
								<div className="item">
									<div className="eesTitle">
										Headers
									</div>
									<div className="flex col">
										{responseHeaders}
									</div>
								</div>
								<div className="item">
									<div className="eesTitle">
										Cookies
									</div>
									<div className="flex col">
										{responseCookies}
									</div>
								</div>
							</div> */}
						</div>
					</div>
				</div>
			);
		}

		return (
			<div>
				<div className={'networkcall flex center ' + errorCall}>
					<div className="shrink method">{callMethod}</div>
					<div className="item flex start topLeft">
						<div className={'item shrink urlPart ' + url.protocol.replace(':', '')}>{url.protocol + '//'}</div>
						<div className="item shrink urlPart hostname">{url.hostname}</div>
						<div className="item shrink urlPart">{endpoint ? endpointUrl(url.pathname, endpoint) : url.pathname}</div>
						<div className="flex item right callRight">
							{statusCode ? <div className={'shrink urlPart ' + statusColor}>
								{statusCode}
							</div> : null}
						</div>
					</div>
					<div className="shrink urlPart dropdown" onClick={this.toggle}>
						<img src={require('./../../assets/images/caret.png')} alt="" />
					</div>
				</div>
				{expandedSection}
			</div>
		);
	}
};