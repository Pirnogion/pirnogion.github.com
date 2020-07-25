"use strict"

let commands = new Map()
let ops = new Map()
	.set("+", (a, b) => a+b)
	.set("-", (a, b) => a-b)
	.set("*", (a, b) => a*b)
	.set("/", (a, b) => a/b)

let initialValue, sequence
let result

function parseCmd(value)
{
	let pattern = /(\w+)\s*([+\-*/])=\s*([\-]*\d+)/
	let parsed = pattern.exec(value)

	return (parsed) ? {name: parsed[1], func: (x) => ops.get(parsed[2])(x, Number(parsed[3]))} : null
}

function addCmd()
{
	let button = document.forms.commands.button

	let input = document.createElement("input")
	input.type = "text"
	input.name = "cmd" + document.forms.commands.length
	input.placeholder = document.forms.commands.length + " команда"
	input.onchange = "update()"

	document.forms.commands.insertBefore(document.createTextNode(" "), button);
	document.forms.commands.insertBefore(input, button)
	document.forms.commands.insertBefore(document.createTextNode(" "), button);
}

function init()
{
	initialValue = document.forms.userdata["initial-value"]
	sequence = document.forms.userdata["sequence"]
	result = document.getElementById("result")
}

function update()
{
	let number = Number(initialValue.value)
	let program = sequence.value

	commands = new Map()

	for (let i = 0; i < document.forms.commands.length-1; ++i)
	{
		let parsed = parseCmd(document.forms.commands["cmd" + (i+1)].value)

		if (parsed)
		{
			commands.set(parsed.name, parsed.func)
		}
	}

	for (let i = 0; i < program.length; ++i)
	{
		let cmd = commands.get(program[i])

		if (cmd)
		{
			number = cmd(number)
		}
	}

	result.innerHTML = number
}