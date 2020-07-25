"use strict"

let digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']

let block
let fromValue, fromBase, toBase
let result

function valueFilter(value, base)
{
	if (new RegExp("[^" + digits.join("") + "]", "i").exec(value) == null)
	{
		let result = true

		for (let i = 0; i < value.length; ++i)
		{
			result &= find(value[i], digits) < base
		}

		return result
	}

	return false
}

function baseFilter(number)
{
	return /\d/.exec(number) && number > 1 && number <= digits.length
}

function addDigit(newDigit)
{
	for (let i = 0; i < digits.length; ++i)
	{
		if (digits[i] == newDigit.toUpperCase()) { drawDigits(block); return false }
	}

	digits[digits.length] = newDigit.toUpperCase()

	drawDigits(block)
	update()

	return true
}

function drawDigits(block)
{
	block.innerHTML = ""
	block.innerHTML += "<p>Цифровые символы</p>"
	for (let i = 0; i < digits.length; ++i)
	{
		block.innerHTML += "<div id=\"digit\">" + digits[i] + "</div>"
	}

	block.innerHTML += "<input type=\"text\" name=\"new-digit\" placeholder=\"&#128933\" maxlength=\"1\" onchange=\"addDigit(this.value)\">"
}

function init()
{
	block = document.getElementById("digits")

	drawDigits(block)

	fromValue = document.forms.userdata["from-value"]
	fromBase = document.forms.userdata["from-base"]
	toBase = document.forms.userdata["to-base"]

	result = document.getElementById("to-value")

	fromValue.value = 10
	fromBase.value = 2
	toBase.value = 10
}

function calc(value, from, to)
{
	let result = ""
	let reversed = ""
	let decimal = 0

	for (let i = 0; i < value.length; ++i)
	{
		decimal += find(value[i], digits)*Math.pow(from, value.length-1-i)
	}

	while (decimal > 0)
	{
		reversed += digits[decimal % to]
		decimal = Math.floor(decimal / to)
	}

	for (let i = 0; i < reversed.length; ++i)
	{
		result += reversed[reversed.length-1-i];
	}

	return result;
}

function update()
{
	if (!valueFilter(fromValue.value, fromBase.value))
	{
		result.innerHTML = "Неверное значение"
	}
	else if (!baseFilter(fromBase.value, fromBase.value) || !baseFilter(toBase.value, toBase.value))
	{
		result.innerHTML = "Неверное основание системы счисления"
	}
	else if (!(fromValue.value && fromBase.value && toBase.value))
		result.innerHTML = "Введите значения"
	else
	{
		result.innerHTML = calc(fromValue.value, fromBase.value, toBase.value)
	}
}