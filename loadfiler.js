function navigationMethod(obj) {
    // console.log('odjopwufhudewfef',selectedObj);
    var inputs=document.getElementsByTagName("input");
    // console.log('omr',identity);
   id = e => { return e.name || e.id || e.innerText || e.placeholder.replace(/\s/g, '_'); };
  
   for(var i=0;i<inputs.length;i++){
     var input=inputs[i];
     console.info(input)
     if(input.type=="password"){
       {input.value=obj.url} 
       // keydownupFunc(input.value)
     }
     if(input.type=="text" || input.type =="email" || input.type =="number"){
       {input.value='dedfeijfhi'}
       // keydownupFunc(input.value);
     }
     if(input.type  && input.type == "submit"){
       input.click();
       if(input.formNoValidate === false){
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
  }