import React, { Component } from 'react';
import JSZip from 'jszip';
import { Store } from '../index';
import './dropbox.css';

export const DropBox = class DropBox extends Component {

	constructor(props) {
		super(props);
		this.clickFile = this.clickFile.bind(this);
		this.inputOnClick = this.inputOnClick.bind(this);
		this.onDropHandler = this.onDropHandler.bind(this);
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

	onDropHandler(e) {
		var dt = e.dataTransfer;
		if (dt.items) {
			// Use DataTransferItemList interface to access the file(s)
			for (let i = 0; i < dt.items.length; i++) {
				if (dt.items[i].kind === "file") {
					var f = dt.items[i].getAsFile();
					this.handleFile(f);
					break;
				}
			}
		} else {
			// Use DataTransfer interface to access the file(s)
			for (let i = 0; i < dt.files.length; i++) {
				console.log("... file[" + i + "].name = " + dt.files[i].name);
				this.handleFile(dt.files[i]);
				break;
			}
		}
		e.preventDefault();
	}

	inputOnClick(e) {
		Array.from(e.target.files).forEach(f => this.handleFile(f))
	}

	render() {
		let element;
		if (this.props.displayType === 'full') {
			element = (
				<div className="dropBox flex center" onClick={this.clickFile} onDrop={this.onDropHandler} onDragOver={(e) => { e.preventDefault(); }}>
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