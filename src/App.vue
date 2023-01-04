<template>

  <!-- CSS only -->
  <div v-show="(isLogon == 'logged')" class="mainContainer">
    <div class="menuContainer">
      <div  id="div-myNav">
          <router-link to="/home"><i class="bi bi-house-door"></i></router-link>
          <router-link to="/everything"><i class="bi bi-compass"></i></router-link>
          <router-link to="/post"><i class="bi bi-plus-circle-dotted"></i></router-link>
          <router-link to="/chat"><i class="bi bi-chat-dots"></i></router-link>
          <router-link to="/profile"><i class="bi bi-person-circle"></i></router-link>
     </div>
    </div>
      <router-view/>
  </div>
<!----------Login-->
  <div class="secondContainer" v-show="(isLogon=='no')">

    <div class="containerLogin">
      <div class="leftImage"></div>
      <div class="contaierForm">
        <h3 style="text-align: center;">k-Obory</h3>
        <form  @submit.prevent="entrar" class="formLogin">
            <label for="input-user">Username:</label>
            <input class="textBox" id="input-user" type="text" placeholder="myUsername123" required>
              <br><br>
            <label for="input-pasword">Password:</label>
            <input class="textBox" id="input-pasword" v-bind:type="tipoContra" placeholder="******" required>
            <br><br>
            <label for="seepass" class="pass-shower" >{{labelShow}} 
              <i class="bi bi-eye-fill" v-show="(!showPassword)"></i>
              <i class="bi bi-eye-slash-fill"  v-show="(showPassword)"></i>
            </label>
            <input id="seepass" v-model="showPassword" type="checkbox" v-on:change="mostarContrasena" style="display:none">

            <br>
            <br>
            <button class="btn btn-primary" type="submit" >Log in</button>
            <hr>
            <button class="btn btn-secondary btn-sm" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">create account</button>
        </form>
      </div>
  </div>    
  </div>


<!--------------------------Modal for Login-->
<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">register to k-Obory</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" style="background-color:darkslategrey;" aria-label="Close"></button>
      </div>
      <form @submit.prevent="regUser">
      <div class="modal-body">
        <div class="modal-body-container">
          <img id="imgUser-preview" class="img-preview" src="./images/user.webp" alt="user image">

          <label class="cameraBTN" for="selectImage"><i class="bi bi-camera"></i></label>
          <input  id="selectImage" style="display:none;" v-on:change="setImg" type="file" accept=".jpg,.png,.jpeg,.gif,.svg,webp">
          <br> 
          <small id="image-name">{{ userData.imgName }}</small>
                <br><br>
                  <label class="form-label">Nickname</label>
                  <input id="NombreUsuario" type="text" class="form-control register" v-model="userData.userName" placeholder="Nombre de usuario" required>
            
                  <label  class="form-label">Contraseña</label>
                   <input v-bind:type="tipoPass" class="form-control register" id="Contrasena1" v-model="pass1" placeholder="*****" required>

                  <label  class="form-label">Confirmar Contraseña</label>
                  <input id="Contrasena2" v-bind:type="tipoPass" class="form-control register" v-model="pass2" placeholder="*****" required>
                  <br>

                <input style="display:none" id="contraseñaRegistro" v-on:change="hideShowRegister()" class="form-check-input" v-model="showPRegister" type="checkbox">
                <label class="form-check-label pass-shower" for="contraseñaRegistro">
                  {{labelRegister}}
                  <i class="bi bi-eye-fill" v-show="(!showPRegister)"></i>
                  <i class="bi bi-eye-slash-fill"  v-show="(showPRegister)"></i> 
                </label>
                <br><br>
                <div class="progress" v-show="(showProgress)" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                  <div class="progress-bar progress-bar-striped progress-bar-animated" style="width: 100%"></div>
                </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" id="closeModal" data-bs-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">Register</button>
      </div>
      </form>
    </div>
  </div>
</div>

<!--Toast-->

<div class="toast_container">
  <div id="liveToast" class="toast myToast" style="display: none;" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-header toast_head">
      <img src="./images/toast.webp" id="toastIMG" class="rounded me-2 toast_img" alt="user_img">
      <strong class="me-auto" id="titleToast">myFavimage</strong>
      <small id="typeToast">Notification</small>
      <button type="button" class="btn-close x-close" data-bs-dismiss="toast" v-on:click="closeMyToast" aria-label="Close"></button>
    </div>
    <div class="toast-body" id="messageToast">
      Hello, world! This is a toast message.
    </div>
  </div>
</div>


</template>

<script src="./scripts/app.js"></script>

