function printContent(object)
{
	for (let i of object)
	{
		document.write(i)
		document.write("<br>")
	}
}

function printStructure(object)
{
	for (let i in object)
	{
		document.write(i)
		document.write("<br>")
	}
}