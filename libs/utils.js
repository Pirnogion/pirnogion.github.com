function find(value, arr)
{
	for (let i = 0; i < arr.length; ++i)
	{
		if (arr[i] == value.toUpperCase()) return i;
	}

	return -1
}