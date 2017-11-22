// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  // your code goes here
  var result;
  var strToParse = json.slice();

  ///////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////////////////////
  // --- helper functions

  var discardWhitespace = function() {
    return strToParse.trim();
  }

  var firstChar = function() {
    // discardWhitespace
    // check first char
    //   if none throw error
    //   else return char
    strToParse = discardWhitespace();
    var firstChar = skim(1); 
    if (firstChar === undefined) {
      throw SyntaxError('Nothing to parse')
    }
    else {
      return firstChar; 
    }

  }

  var chop = function(num) { //takes off num many chars from the start of strToParse
    if (strToParse.length === 0) {
      throw SyntaxError('String ended unexpectedly')
    }
    strToParse = strToParse.slice(num);
    return;
  }

  var skim = function(num) { // returns the first num many chars of strToParse in a string
    return strToParse.substr(0, num)
  }

  var skimOff = function(num) {
    var chunk = skim(num);
    chop(num);
    return chunk;
  }
  var nextIsNumberPart = function() { //returns boolean
    var next = skim(1);
    return numberParts.includes(next) || digits.includes(next);
  } 

  var digits = '0123456789';
  var numberParts = '-+eE.';
  var specialChars = 'bfnrt/"';


  ///////////////////////////////////////////////////////////////////////////////////
  // --- recursive function 

  // recurse on determine, not full func
  // the full function needs to keep the first (outer most) value 

  var determineValue = function() { // determines next value to parse
    // get firstChar
    // if it matches one these cases, pass string to that function
    // else throw error
    var value; 
    var first = firstChar();


    if (skim(4) === 'null') { //first char is n
      // pass to makeNull
      value = makeNull();
    }
    else if (skim(4) === 'true') { //first char is t
      //pass to makeTrue
      value = makeTrue();
    }
    else if (skim(5) === 'false') { //first char is f
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
      throw SyntaxError('Not a valid value')
    }


    return value;
  } // ends determine



  ///////////////////////////////////////////////////////////////////////////////////
  // --- maker functions

  var makeObject = function() {
    var obj = {};
    chop(1);

    
    if (firstChar() === '}') { 
        chop(1);
        return obj;
    }
////// else make pairs
    var addPairs = function() {

      if (firstChar() === '"') { // key is a string
        
        var objKey = determineValue(); 
        if (firstChar() === ':') {
          chop(1); 
          var objVal = determineValue();
          obj[objKey] = objVal;
          if (firstChar() === ',') {
            chop(1);
            return addPairs();
          }
          else if (firstChar() === '}') { // end of object
            chop(1);
            return obj;
          }
          else {
            throw SyntaxError('Not a valid object -- missing "," ');
          }
        } 
        else{
          throw SyntaxError('Not a valid object -- missing ":" ');
        }
      } 
      else { //key not a string
        throw SyntaxError('Object key must be a string');
      }
    } // end of addPairs

    return addPairs();
  }


  var makeArray = function() {
    var arr = [];
    chop(1);

    if (firstChar() === ']') { 
        chop(1);
        return arr;
    }
////// else add items
    var addItems = function() {
      var arrItem = determineValue();
      arr.push(arrItem);
      if (firstChar() === ',') { // more items to add
        chop(1);
        return addItems();
      }
      else if (firstChar() === ']') { //end of array
        chop(1);
        return arr;
      }
      else { //throw error
        throw SyntaxError('Not a valid array -- missing ","');
      }

    } // end of addItems
    return addItems();
  }

  var makeString = function() {

    var str = '';
    chop(1);
////// else add characters
    var addChars = function() {  
      var char = skimOff(1);

      if (char === '"') {
        return str;
      }
      else if (char === '\\') { // escape stuff 
        var next = skimOff(1);
        if (next === '\\') { //double back slash means next char should be special
          str += '\\'; 
          if (specialChars.includes(skim(1))) {
            str += skimOff(1); 
          }
          return addChars();
        }
        else if (next === 'u') { //check for unicode
          var hex = skimOff(4);
          var isHex = hex.split('').every(function(item) {
            return digits.includes(item);
          });
          if (isHex) { // followed by 4 digits
            str += '\\u' + hex;
            return addChars();
          }
          else { // else throw error
            throw SyntaxError('Not a valid unicode')
          }
        }
        else { // next is not special - just return char
          str += next; 
          return addChars(); 
        }
      }
      else {
        str += char;
        return addChars();
      }
    } // end of addChars*/
    return addChars();
  }

  var makeNumber = function() {
    var num = '';
    while (nextIsNumberPart() && strToParse.length > 0) {
      num = num.concat(skimOff(1));
    }
    num = Number(num);
    if (num === NaN) {
      throw SyntaxError('Not a valid number');
    }
    return num;
  }


  var makeTrue = function() {
    chop(4);
    return true;
  }


  var makeFalse = function() {
    chop(5);
    return false;
  }


  var makeNull = function() {
    chop(4);
    return null;
  }

  ///////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////////////////////

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

  ///////////////////////////////////////////////////////////////////////////////////

  result = determineValue();

  if (result !== undefined && strToParse.length === 0) {
    return result;
  }
  else {
    throw SyntaxError('Unexpected ending');
  }
};





