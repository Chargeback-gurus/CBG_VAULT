
  var inputs=document.getElementsByTagName("input");

  id = e => { return e.name || e.id || e.innerText || e.placeholder.replace(/\s/g, '_'); };

  for(var i=0;i<inputs.length;i++){
    var input=inputs[i];
    console.info(input)
    if(input.type=="password"){
      {input.value="645e1ecbbd7a0y"} 
      // keydownupFunc(input.value)
    }
    if(input.type=="text" || input.type =="email" || input.type =="number"){
      {input.value="antony@codeboardtech.com"}
      // keydownupFunc(input.value);
    }
    if(input.type  && input.type == "submit"){
        input.addEventListener('click' , (e)=>{
                console.log('dedede',e);
        }).then((res)=> console.log('fkjhrh',res))
        try{
                input.addEventListener('click' , (e)=>{
                        console.log('dedede',e);
                });      
        } catch (error) {
                console.log('dede',error);
        }
      input.click();
      console.log('xeidje',input.form);
      if(input.formNoValidate === false){
        input.value = ""
        break;
      }    
      console.log(input)
    };
  }

  var btnElement = document.getElementsByTagName("button");
for(const ele of btnElement){
   var expVal = new RegExp('(?:login)|(?:sign)|(?:Sign)|(?:submit)|(?:loginform)|(?:continue)|(?:next)', 'i');              
   const name = id(ele);
    if(expVal.test(name)){
      console.log(name)
     ele.click();
   }
  }

//     function keydownupFunc(value) {
    
//     ['change', 'input'].forEach(name => {
//       console.log("name of dispatch event"+ name)
//       input.dispatchEvent(new Event(name, { bubbles: true }));
//     });
//  }

    
//      function removeEverything() {
//         while (document.body.firstChild) {
//           document.body.firstChild.remove();
//         }
// }
//      var buttonLogin = document.getElementsByTagName('button');


     
//         var loginField = document.getElementById('username');
  
//         var passwordField=  document.getElementById('password')

//             loginField.value = 'antony@codeboardtech.com';
//             passwordField.value = '645e1ecbbd7a0';
   