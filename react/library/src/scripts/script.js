function print(page)
{
	var z='';
	var i;
	var lmt = Math.min(total,3*page);
	for ( i=3*(page-1); i<lmt; i++)
	{
		
		var source = res[i]._source;
		var title = source.title;
		var author = source.author;
		var line = source.line_no;
		var text = source.text;	
		for (y in source)	z+=source[y]+'<br>';
		
		z+='<br>';
	}
}

function get()
{
	if (this.readyState==4 && this.status==200)
	{
		res = this.responseText;
		res = JSON.parse(res).hits.hits;
		total = res.length;
		print(1);
	}
}

function sent()
{
	var xhttp = new XMLHttpRequest();
	data = document.getElementById('search').value;
	if (data=='')	return;

	xhttp.onreadystatechange = get;
	
	xhttp.open("POST", 'http://127.0.0.1:8000/server/', true);
	xhttp.send(data);
}

function send() 
{
	clearTimeout(timeout);
	timeout = setTimeout(sent, 500);
}