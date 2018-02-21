var timeout = 10000;
var xhttp = new XMLHttpRequest();

function print()
{
	if (xhttp.readyState==4 && xhttp.status==200)
	{
		document.write(this.responseText)
	}
}

function sent()
{
	data = document.getElementById('search').value;
	if (data=='')	return;

	xhttp.onreadystatechange = print;
	
	xhttp.open("POST", data, true);
	xhttp.send(data);
}

function send() 
{
	clearTimeout(timeout);
	timeout = setTimeout(sent, 2000);
}