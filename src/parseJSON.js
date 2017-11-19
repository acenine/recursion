// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  // your code goes here
  var result;
  var doneParsing = false;
  var strToParse = json.slice();

  //var funcToUse = arguments[1];

  var discardWhitespace = function() {
    return strToParse.trim();
  }

  var firstChar = function() {
    // discardWhitespace
    // check first char
    //   if none throw error
    //   else return char
    strToParse = discardWhitespace();
    var firstChar = strToParse[0]; 
    if (firstChar === undefined) {
      throw SyntaxError("Nothing to parse")
    }
    else {
      return firstChar; 
    }

  }
  var makeString = function() {
    var str = '';
    return str;
  }
  var makeObject = function() {
    var obj = {};
    return obj;
  }
  var makeArray = function() {
    var arr = [];
    return arr;
  }
  var makeNumber = function() {

  }
  var makeTrue = function() {

      strToParse = strToParse.slice(4);
      return true;
  }
  var makeFalse = function() {

      strToParse = strToParse.slice(5);
      return false;
  }
  var makeNull = function() {

      strToParse = strToParse.slice(4);
      return null;
  }
  // recurse on determine, not full func
  // the full function needs to keep the first (outer most) value 

  var determineValue = function() { // determines next value to parse
    // get firstChar
    // if it matches one these cases, pass string to that function
    // else throw error
    // if var is undefined, it is the outermost function
    var value; 
    var first = firstChar();


    if (strToParse.substr(0, 4) === 'null') { //first char is n
      // pass to makeNull
      value = makeNull();
    }
    else if (strToParse.substr(0, 4) === 'true') { //first char is t
      //pass to makeTrue
      value = makeTrue();
    }
    else if (strToParse.substr(0, 5) === 'false') { //first char is f
      //pass to makeFalse
      value = makeFalse();
    }
    else if (first === '{') { //first char is {
      //pass to makeObject
      value = makeObject();
    }
    else if (first === '[') { //first char is [
      //pass to makeArray
      value = makeArray();
    }
    else if (first === '"') { // first char is "
      //pass to makeString
      value = makeString();
    }
    else if (first === '-' || Number(first) !== NaN) { // - or number
      //pass to makeNumber
      value = makeNumber();
    }
    else {
      throw SyntaxError("Not a valid value")
    }

    return value;

  }
  //check first char
  // { - object check for }
  // [ - array check for ]
  // " - string check for "
  // if Number(char) !== NaN - number
  // else find whole char string
  // *special case for / 
  // somehow account for whitespace

  //take first char of input string and return the rest of the string to the right function

  
  //beginning character determines
  //pass whole string into which function determined by the first char
  //that func moves through the string until it comes to another starting value
  //passes the string from that point on back to itself
  //self determines first char and passes string into proper function 
  //if the end of the string is reached (passed in string is empty, return result


  result = determineValue();

  if (result !== undefined && strToParse.length === 0) {
    return result;
  }
  else {
    throw SyntaxError("Unexpected ending");
  }
};





