// class Decryption{
  export function   getDecrypt(response){
        let listArray =[];
        response.forEach((res)=>{
            var encryptedBase64Key = res.Key;
            var parsedBase64Key = CryptoJS.enc.Base64.parse(encryptedBase64Key);
            var encryptUsername = res.userName;
            var encryptPassword = res.password;
            var encryptUrl = res.url;
            var decryptedUserName = CryptoJS.AES.decrypt(encryptUsername,parsedBase64Key,{
              mode: CryptoJS.mode.ECB,
              padding: CryptoJS.pad.Pkcs7
            });
            var decryptedPassword = CryptoJS.AES.decrypt( encryptPassword, parsedBase64Key, {
              mode: CryptoJS.mode.ECB,
              padding: CryptoJS.pad.Pkcs7
              });
              var decryptedURL = CryptoJS.AES.decrypt( encryptUrl, parsedBase64Key, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
                });
              var decryptedTextUsername = decryptedUserName.toString( CryptoJS.enc.Utf8);
              var decryptedTextPassword = decryptedPassword.toString( CryptoJS.enc.Utf8);
              var decryptedTextURL = decryptedURL.toString( CryptoJS.enc.Utf8);
              let tempObj ={
                userName:decryptedTextUsername,
                password:decryptedTextPassword,
                url:decryptedTextURL
              }
              listArray.push(tempObj)
          });
          var ul = document.getElementById("listofItem");
          for (var i = 0; i < listArray.length; i++) {
            var name = listArray[i].url;
            var li = document.createElement('li');
            li.appendChild(document.createTextNode(name));
            ul.appendChild(li);
          }
    }
    
// }
// export const decrypt = new Decryption();
// setGlobal("decrypt", decrypt);