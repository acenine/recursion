// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  // your code goes here
  if (obj === null) {
  	return 'null';
  }
  if (typeof obj === 'number' || typeof obj === 'boolean') {
  	return obj.toString();
  }
  if (typeof obj === 'function' || obj === undefined || typeof obj === 'symbol') {
  	return undefined;
  }
  if (typeof obj === 'string') {
  	return '"' + obj + '"';
  }
  if (Array.isArray(obj)) {
  	return "[" + obj.map(stringifyJSON).join(',') + "]";
  }
  else {
  	let result = [];
  	for (let item in obj) {
  	  if (stringifyJSON(obj[item]) !== undefined){
  	  	result.push(stringifyJSON(item) + ":" + stringifyJSON(obj[item]));
  	  }
  	}
  	return "{" + result.join(",") + "}";
  }
};
