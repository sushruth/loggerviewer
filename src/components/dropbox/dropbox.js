import React, { Component } from 'react';
import JSZip from 'jszip';
import { Store } from '../index';
import './dropbox.css';

export const DropBox = class DropBox extends Component {

	constructor(props) {
		super(props);
		this.clickFile = this.clickFile.bind(this);
		this.inputOnClick = this.inputOnClick.bind(this);
	}

	clickFile() {
		this.fileInput.click()
	}

	handleFile(f) {
		JSZip.loadAsync(f)
			.then((zip) => {
				zip.forEach((relativePath) => {
					if (relativePath.match(/\.json$/)) {
						zip.file(relativePath).async('string').then((content) => {
							Store.setLogStore(String(content));
						}, (e) => {
							console.log(e)
						})
					}
					if (relativePath.match(/\.jpeg$/)) {
						zip.file(relativePath).async('base64').then((content) => {
							Store.pushImage(relativePath.replace('screenshots/', ''), 'data:image/jpeg;base64,' + content);
						}, (e) => {
							console.log(e);
						});
					}
				});
			}, (e) => {
				console.log(e);
			});
	}

	inputOnClick(evt) {
		Array.from(evt.target.files).forEach(f => this.handleFile(f))
	}

	render() {
		let element;
		if(this.props.displayType === 'full') {
			element = (
				<div className="dropBox flex center" onClick={this.clickFile}>
					<div className="dropArea">
						Drop the file here
						<div>or click here to select the file</div>
						<input className="dropInput" ref={(input) => { this.fileInput = input; }} onChange={this.inputOnClick} type="file" />
					</div>
				</div>
			);
		} else if (this.props.displayType === 'icon') {
			element = (
				<div className="dropBoxIcon">
					<div className="dropArea">
						<input className="dropInput" ref={(input) => { this.fileInput = input; }} onChange={this.inputOnClick} type="file" />
					</div>
				</div>
			);
		}
		return element;
	}
}