import React from 'react';
import ReactDOM from 'react-dom';

var timeout = 10000;
var res;
var total;

class Website extends React.Component{
		
}

class Box extends React.Component{
	constructor (props){
		super(props);
	}
	
	render(){
		return (
			<div class='result'>
				<h2 class='title'>Title : {this.props.title}</h2>
				<div class='text'>Text : {this.props.txt}</div>
				<div class='author'>Author : {this.props.author}</div>
			</div>
		);
	}
}

class Page extends React.Component{
	render(){
		return (
		<Box title='huck finn' txt='tom sawyer' author='samuel langhorne clemens'/>
		);
	}
}

function Send(props){
	clearTimeout(timeout);
	timeout = setTimeout(sent, 500);
}

ReactDOM.render(
	<Send />,
	document.getElementById('results')
);