//============================
/*
  Author: Abbas Abdulmalik
  Creation Date: February 12, 2016
  Title: lib.js
  Revised: February 20, 2016
  Purpose:A Quick-and-Dirty JS library 
  using intermediate-level JS features
  similar to jQuery
  Notes:
    keyPressed added
    on()method now takes args e,m: ...
    e is the event object, m is the target object for collections
    This is possible a breaking change if prior code expected only m.
    current methods (near line 128):
    //--------------------------------
      getElement()
      getArray()
      on(event, handler)    (near line 140)
      css(property, value)
      html(aString)         (near line 170)
      get(url, handler)
      click(handler)        (near line 203)
      overAndOut(overHandler, outHandler)  (near line 219)
      toggle(onHandler, offHandler)  (near line 239)
      hover(overHandler, outHandler) (same as overAndOut)
      keyPressed(event);
    //-----------------------------------------
*/
//=============================
function lib(string){
  //the string above selects elements by id, tagname, or class

  var libObject = {};   // The "API" object (exposes the interface) returned by lib.
  var element = null;   // The element that string points to.
  var array = [];       // Collection of elements of a class or tagname. 
  var toggleOn = true; // Flag for an element's toggle method.
  var arrayToggleOn = []// Flags for array objects' toggle method.
  
  //---get our element or class array---
  getElementOrArray(string);
  
  //===internal helper functions===
  function getElementOrArray(s){
    /**
      below is an "if-else-if" ladder to analyze the
      string for type: object, id, class, or tagname
    */
    
    //object already?
    if(typeof (s) === 'object' && type(s) !== 'array'){
      element = s;
      //the type() function (defined below) returns the true type
      //by calling Object.prototype's toString() method on s  
    }
    //id selector?
    else if(type(s) === 'string' && s.charAt(0) === '#' && s.length > 1){
      var id = s.slice(1);
      element = document.getElementById(id);      
    }
    //class selector?
    else if(type(s) === 'string' && s.charAt(0)=== '.' && s.length > 1){
      array = getClassMembers(s);//assumes s has a leading "."
      fillToggleArray();
    }
    //element selector? (by tag name)
    else if(type(s) === 'string' && s.length > 0){
      var elements = document.getElementsByTagName(s);
      for(var j = 0; j< elements.length; j++){
          array.push(elements[j]);
      }
      fillToggleArray();
    }
  }//--END of getElementOrArray---
  //-------------------------
  //----function to pre-fill the arrayToggleOn array 
  //with true for each array object
  function fillToggleArray(){
      array.forEach(function(m){
          arrayToggleOn.push(true);
      });
  }
  //------------------------
  function type(x){
    //sometimes better than typeof because it returns a string
    //describing x's true type. if x is an array, "array" is returned
    //(whereas typeof array would return "object")
    
    var rawType = {}.toString.call(x);//same as Object.prototype.toString.call(x)
    var exactType = rawType.slice(8, rawType.length-1);
    exactType = exactType.trim().toLowerCase();
    //----------------
    return exactType;
  }
  libObject.type = type;
  lib.type = type;
  //------------------------
  function getClassMembers(className){
    //return an array of named class members if there are any, 
    //or return undefined if not. Assumes className is a string that starts
    // with "."(the same as a css class selector)
    if(className.charAt(0) === "."){
      /*
      1. Save our class name.
      2. Make an array of all elements, and ...
      3. collect only those elements that match the class name.
      4. Return the array if there is one, or return undefined if not.
     */
    
      //1. save our classname
      className = className.slice(1);
    
      //2. make an array of all elements
      var allElements = document.getElementsByTagName("*");
      var classMembers = [];
    
      // 3. collect those elements that match the class name
      for(var i = 0;  i<allElements.length; i++){
        if(allElements[i].className === className){
          classMembers.push(allElements[i]);        
        }  
      }//--END of for(;;) gathering class members
      return classMembers;
    }//---END of if-a-class
    else return;
   }//---END of getClassMembers---
   //-----------------------------------------------
   
  //=================================================
  //===Functions to attach to our api object (libObject)===
  function getElement(){
    return element;
  }
  libObject.getElement = getElement;
  lib.getElement = getElement;  
  //--------------------------------
  function getArray(){
    return array;
  }
  libObject.getArray = getArray;
  lib.getArray = getArray;  
  //--------------------------------
  function on(event, handler){
    if(element !== null){
       element.addEventListener(event, handler);
    }
    else if(array.length !== 0){
      array.forEach(function(m){
        m.addEventListener(event, function(e){
          handler(e, m);
        });
      });      
    }    
    return libObject;
  }
  libObject.on = on;
  lib.on = on;  
  //--------------------------------
  function css(property, value){
    if(element !== null){
      element.style[property] = value;      
    }
    else if(array.length !== 0){
      array.forEach(function(m){
        m.style[property] = value;
      });
    }
    return libObject;
  }
  libObject.css = css;
  lib.css = css;  
  //--------------------------------
  function html(aString){
    if(element !== null){
      element.innerHTML = aString;      
    }
    else if(array.length !== 0){
      array.forEach(function(m){
        m.innerHTML = aString;
      });      
    }
    return libObject;
  }
  libObject.html = html;
  lib.html = html;  
  //--------------------------------
  function get(url, handler){
    try{
      var ajax = new XMLHttpRequest();
      ajax.open("GET", url);
      ajax.send();
      //-----
      ajax.onload = function(){
        handler(ajax.response);
      };
    }
    catch(error){
      alert(error);
      console.log(error);
    }
    return libObject;
  }
  libObject.get = get;
  lib.get = get;  
  //--------------------------------
  function click(handler){
    if(element !== null){
      element.addEventListener("click",handler);    
    }
    else if(array.length !== 0){
      array.forEach(function(m){
        m.addEventListener("click", function(){
            handler(m);
        });
      });      
    }
    return libObject;    
  }
  libObject.click = click;
  lib.click = click;    
  //--------------------------------
  function overAndOut(overHandler, outHandler){
    if(element !== null){
      element.onmouseover = overHandler;
      element.onmouseout = outHandler;
    }
    else if(array.length !== 0){
      array.forEach(function(m){ 
        m.onmouseover = function(){
              overHandler(m);
        };
        m.onmouseout = function(){ 
              outHandler(m);          
        };
      });      
    }    
    return libObject;
  }
  libObject.overAndOut = overAndOut;
  lib.overAndOut = overAndOut;
  //--------------------------------
  function toggle(onHandler, offHandler){
  //global toggleOn variable starts true;  
    if(element !== null){
      element.onclick = function(e){
        if(toggleOn){
          onHandler();
          toggleOn = false;
        }
        else{
          offHandler();
          toggleOn = true;
        }
        e.stopPropagation();
      };//---END of element.onclick method
    }
    else if(array.length !== 0){
      array.forEach(function(m,i){
        m.onclick = function(){
          if(arrayToggleOn[i]){
            onHandler(m);
            arrayToggleOn[i] = false;
          }
          else{
            offHandler(m);
            arrayToggleOn[i] = true; 
          }
          e.stopPropagation();
        };
      });      
    }    
    return libObject; 
  }//---END of toggle() method
  libObject.toggle = toggle;
  lib.toggle = toggle;
  //--------------------------------
  function keyPressed(e){
      var theKey=0;
      e=(window.event)?event:e;
      theKey=(e.keyCode)?e.keyCode:e.charCode;
      return theKey;
    } 
  libObject.keyPressed = keyPressed;
  lib.keyPressed = keyPressed;    
  //--------------------------------
  //================================

  //use $ as lib's internal reference to itself:
  libObject.$ = lib;
  
  //a css-type alias for overAndOut method
  libObject.hover = overAndOut;
  lib.hover = overAndOut;
  //---------------------------
  return libObject;
}//---END of lib()---
//=============================
