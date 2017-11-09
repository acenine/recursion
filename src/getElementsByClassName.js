// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {
  // your code here
  var result = [];

  checkForClassName = function(root) {
	if (root.classList.contains(className)) { //check for class name
		result.push(root);//append element to result
	}
	if (root.children.length !== 0) { 
	  for (let i = 0; i  < root.children.length; i++) {
		checkForClassName(root.children[i])
	  }//do funcion on children
	}
	return
  }
  checkForClassName(document.body);
  return result;
};

//take document.body as root -- check for class name
//take child nodes (.children) and for each -- check
//if .children.length == 0 stop
