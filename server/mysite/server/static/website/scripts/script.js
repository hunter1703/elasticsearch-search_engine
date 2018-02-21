var timeout = 10000;

function print()
{
	if (this.readyState==4 && this.status==200)
	{
		var res = this.responseText;
		res = JSON.parse(res).hits.hits;
		
		var z='';
		for (x in res)
		{
			var source = res[x]._source;
			
			var title = source.title;
			var author = source.author;
			var line = source.line_no;
			var text = source.text;
			
			
			for (y in source)
			{
				z+=source[y]+'<br>';
			}
			
			z+='<br>';
		}
		
		document.getElementById('id').innerHTML = z;
	}
}

function sent()
{
	var xhttp = new XMLHttpRequest();
	data = document.getElementById('search').value;
	if (data=='')	return;

	xhttp.onreadystatechange = print;
	
	xhttp.open("POST", 'server/', true);
	xhttp.send(data);
}

function send() 
{
	clearTimeout(timeout);
	timeout = setTimeout(sent, 1000);
}