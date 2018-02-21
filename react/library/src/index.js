import React from 'react';
import ReactDOM from 'react-dom';
import deadpool from "./1920x1080-377756-deadpool-desktop-wallpaper-hd-wallpapers.jpg"
import './index.css';

var timeout = 10000;
var res;
var total;
var curr;
var maxPages;

function print(props)
{
	var z=[];
	var i, page=curr;
	var lmt = Math.min(total,3*page);
	
	for ( i=3*(page-1); i<lmt; i++)
	{
		
		var source = res[i]._source;
		var title = source.title;
		var author = 'Authors : '+source.author;
		var line = 'Line : '+source.line_no;
		var txt = res[i].highlight.text[0];
	
		z.push(<Box title={title} author={author} line={line} txt={txt}/>);
	}
	ReactDOM.render(z, document.getElementById('id'));
	curr=curr+1;
}

function get(props)
{
	if (this.readyState===4 && this.status===200)
	{
		res = this.responseText;
		res = JSON.parse(res).hits.hits;
		total = res.length;
		maxPages = Math.floor(total/3)+(total%3>0);
		curr=1;
		print();
	}
}

function clear(props) {
	var z=[];
	
	for (var i=0;i<3;i++)	z.push(<Box title={''} author={''} line={''} txt={''}/>);
	ReactDOM.render(z, document.getElementById('id'));
}
function sent(props) {
	var xhttp = new XMLHttpRequest();
	var data = document.getElementById('search').value;
	if (data==='')	
	{
		clear();
		return;
	}

	get.bind(this);
	xhttp.onreadystatechange = get;
	
	xhttp.open("POST", 'http://127.0.0.1:8000/server/', true);
	xhttp.send(data);
}

function send(props) {
	clearTimeout(timeout);
	sent.bind(this);
	timeout = setTimeout(sent, 300);
}

function prev(props) {
	curr--;
	curr=Math.max(curr,1);
	print();
}

function next(props) {
	curr++;
	curr=Math.min(curr,maxPages);
	print();
}

class Body extends React.Component {
	render() {
		return (
			<div>
				<div className='centered'>
					<img src={deadpool} alt=''/>
				</div>
				<div id='in' className='centered'>
					<button id='prev' className='nav'onClick={prev}>Prev</button>
					<input id='search' autofocus="autofocus" onInput={send}/>
					<button id='next' className='nav'onClick={next}>Next</button>
				</div>
				<div id='id'></div>
				<div id='test'></div>
			</div>
		);
	}
}

class Box extends React.Component{
	render(){
		return (
			<div className='result'>
				<h2 className='title'>{this.props.title}</h2>
				<div className='text' dangerouslySetInnerHTML={{__html : this.props.txt}}/>
				<div className='line'>{this.props.line}</div>
				<div className='author'>{this.props.author}</div>
			</div>
		);
	}
}

ReactDOM.render(
	<Body />,
	document.getElementById('root')
);