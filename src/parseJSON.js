// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  // your code goes here
  var result;
  var strToParse = arguments[0];

  var funcToUse = arguments[1];
  // determine function
  //   remove whitespace
  //   check first char - determines func
  //     if empty return ''
  //     else return funcToUse()
  result = determineValue(strToParse);

  return result;
};



var discardWhitespace = function(str) {
  return str.trim();
}
var firstChar = function(str) {
  // discardWhitespace
  // check first char
  //   if none throw error
  //   else return char
  str = discardWhitespace(str);
  var firstChar = str[0]; 
  if (firstChar === undefined) {
    throw SyntaxError("Nothing to parse")
  }
  else {
    return firstChar; 
  }

}
var makeString = function() {

}
var makeObject = function() {

}
var makeArray = function() {

}
var makeNumber = function() {

}
var makeTrue = function() {

}
var makeFalse = function() {

}
var makeNull = function(str) {

}
var determineValue = function(str) { // determines next value to parse
  // get firstChar
  // if it matches one these cases, pass string to that function
  // else throw error
  var first = firstChar(str);


  if (first === 'n') { //first char is n
    // pass to makeNull
  }
  else if (first === 't') { //first char is t
    //pass to makeTrue
  }
  else if (first === 'f') { //first char is f
    //pass to makeFalse
  }
  else if (first === '{') { //first char is {
    //pass to makeObject
  }
  else if (first === '[') { //first char is [
    //pass to makeArray
  }
  else if (first === '"') { // first char is "
    //pass to makeString
  }
  else if (first === '-' || Number(first) !== NaN) { // - or number
    //pass to makeNumber
  }
  else {
    throw SyntaxError("Not a valid value")
  }


}
var  = function() {

}
var  = function() {

}
var  = function() {

}
var  = function() {

}
var  = function() {

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

//goes in determine

if () { //first char is {

}
else if () { //first char is [

}
else if () { // first char is "

}
else if () { // - or number

}
else if () { // t

}
else if () { // f

}
else if () { // n

}
else {
  //throw error
}

//beginning character determines
//pass whole string into which function determined by the first char
//that func moves through the string until it comes to another starting value
//passes the string from that point on back to itself
//self determines first char and passes string into proper function 
//if the end of the string is reached (passed in string is empty, return result




