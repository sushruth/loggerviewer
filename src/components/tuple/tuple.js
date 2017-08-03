import React, {Component} from 'react';
import './tuple.css'

export class Tuple extends Component {
	render() {
		return(
			<div className={this.props.className + ' tuple' }>
				<div className="item property">{this.props.property}</div>
				<div className="item value">{this.props.value}</div>
			</div>
		);
	}
}