
//   var inputs=document.getElementsByTagName("input");

//   id = e => { return e.name || e.id || e.innerText || e.placeholder.replace(/\s/g, '_'); };

//   for(var i=0;i<inputs.length;i++){
//     var input=inputs[i];
//     console.info(input)
//     if(input.type=="password"){
//       {input.value="Password@123"} 
//       // keydownupFunc(input.value)
//     }
//     if(input.type=="text" || input.type =="email" || input.type =="number"){
//       {input.value="weuio"}
//       // keydownupFunc(input.value);
//     }
//     if(input.type  && input.type == "submit"){
//       input.click();
//       if(input.formNoValidate === false){
//         input.value = ""
//         break;
//       }    
//       console.log(input)
//     };
//   }

//   var btnElement = document.getElementsByTagName("button");
// for(const ele of btnElement){
//    var expVal = new RegExp('(?:login)|(?:sign)|(?:Sign)|(?:submit)|(?:loginform)|(?:continue)|(?:next)', 'i');              
//    const name = id(ele);
//     if(expVal.test(name)){
//       console.log(name)
//      ele.click();
//    }
//   }

  //   function keydownupFunc(value) {
    
  //   ['change', 'input'].forEach(name => {
  //     console.log("name of dispatch event"+ name)
  //     input.dispatchEvent(new Event(name, { bubbles: true }));
  //   });
 // }

    
//      function removeEverything() {
//         while (document.body.firstChild) {
//           document.body.firstChild.remove();
//         }
// }
//      var buttonLogin = document.getElementsByTagName('button');


//      (function() {
//         debugger;
//         if (window.hasRun === true){
//                 removeEverything()  
//         }else{
//                 console.log('domELE', document);
//                 var inputs=document.getElementsByTagName("input"); 
        
//                 for(var i=0;i<inputs.length;i++){{    //for each input on document
        
//                   var input=inputs[i];     //look at whatever input
        
//                   if(input.type=="password"){
//                           {input.value="645e1ecbbd7a0"}
//                   }
//                   if(input.type=="text" || input.type =="email" || input.type =="number"){
//                           {input.value="antony@codeboardtech.com"}
//                   }
//              }};
                
//         }
        //     return true;  // Will ultimately be passed back to executeScript
        // window.hasRun = true;
        // rest of code ... 
        // No return value here, so the return value is "undefined" (without quotes).
//     })();
     
        // var loginField = document.getElementById('username');
  
        // var passwordField=  document.getElementById('password')

        //     loginField.value = 'antony@codeboardtech.com';
        //     passwordField.value = '645e1ecbbd7a0';
   