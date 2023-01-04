
export default {
    name: 'App',
    data(){
      return{
         isLogon:  'no', //localStorage.getItem('isLogon'), //no - logged
         showPassword: false,
         showPRegister: false,
         tipoContra: 'password',
         tipoPass: 'password',
         labelShow: 'Show',
         labelRegister: 'Show',
         
         //------------------------------form data
        userData: {
           'imgURL': './images/user.webp',
           'imgName': 'imagen de perfil.jpg',
           'userName': '',
           'password': ''
        },
        pass1:'',
        pass2:'',
        showProgress: false,
        }
    },
    methods: {
      entrar(){    
        localStorage.setItem('isLogon', 'logged');
        this.isLogon = localStorage.getItem('isLogon')
      },
      mostarContrasena(){
        this.tipoContra = (this.showPassword)? 'text': 'password';
        this.labelShow = (this.showPassword)? 'Hide': 'Show';
        
      },
      setImg(e){
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0])
        reader.onload = () =>{
          let imageP = document.getElementById('imgUser-preview')
          imageP.src = reader.result;
          this.userData.imgURL = reader.result;
          let inputImage = document.querySelector("input[type=file]").files[0];
          this.userData.imgName = inputImage.name
        }
      },
      hideShowRegister(){
        this.tipoPass = (this.showPRegister)? 'text': 'password';
        this.labelRegister = (this.showPRegister)? 'Hide': 'Show';
      },
      regUser(){
        let message= "this is a message for chek"        
        if((this.pass1 == this.pass2) && (this.pass1.trim())){
          let unalowedCharacters="'*+[]()/?=|°!#$&¿`~:;,"
          let findedChar = false;
          let iChar = 0
          
          while(findedChar==false && iChar < this.pass1.length){
            for(let i=0; i<unalowedCharacters.length; i++){
              if(this.pass1[iChar]==unalowedCharacters[i])
              {
                findedChar=true
                console.log('se encontró', this.pass1[iChar].toString()) //----scan password until find an strange character or until finish it's lenthg
              }
            }
            iChar++
          }
          if(findedChar==false){
            this.userData.password = this.pass1
            // console.log(JSON.stringify(this.userData))
            this.myHttpRequest()                            //----this is when is already checked and passed the security filters, finally create the http request

          }
        }else{
          message="Las contraseñas no son validas, pruebe que coincidan y que no estén vacías"
          alert(message)
        }
      },async myHttpRequest(){
        this.showProgress = true
        let myurl = "https://myfavnime.000webhostapp.com/api_vue/register.php?"
        await this.axios({
          method: "post",
          url: myurl, 
          data: JSON.stringify(this.userData)
          // onUploadProgress (progressEvent) {--- doesn't wort so a 
          //   console.log({ progressEvent });}--- progressUpload bar is not possible
        })
       .then(response => response)
        .then(resp =>{
         // console.log(resp.data);
         this.showProgress = false;
         let closeModal = document.getElementById('closeModal')
         closeModal.click();
          this.writeToeast('myFavmage', 'Advice', resp.data);
          this.userData.imgURL='./images/user.webp'//-------- clear the form
          this.userData.imgName = 'imagen de perfil.jpg'
          this.userData.userName=''
          this.userData.password=''
          this.pass1=''
          this.pass2=''
              // console.log(JSON.stringify(this.userData))
        }).catch (error => {
          console.log(error);
          //await axios(error.config);
        })
      }, writeToeast(title, typeToast, message){
        let toast = document.getElementById('liveToast');
        
        document.getElementById('titleToast').innerText = title;
        document.getElementById('typeToast').innerText = typeToast ;
        document.getElementById('messageToast').innerHTML = message;
        document.getElementById('toastIMG').src = this.userData.imgURL;
        document.getElementById('toastIMG').alt = this.userData.imgName;


        toast.style.display='block'
      },closeMyToast(){
        let toast = document.getElementById('liveToast');
        toast.style.display='none'
      }
    }
  }