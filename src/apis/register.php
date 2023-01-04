<?php
Header('Access-Control-Allow-Origin: *');

$servername = "localhost";
$username = "db_project117";
$password = "+eB+dVaX{POMo3E<";
$dbname = "db_project";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
die("Connection failed: " . $conn->connect_error);
}

$datos=json_decode(file_get_contents('php://input'),true);
$nombre= $datos['userName'];
$contrasena=$datos['password'];
$imagenUsuario=$datos['imgURL'];
$nombreImagen=$datos['imgName'];


if($nombre!='' && $contrasena!='' && $imagenUsuario!=''){
  $sqlVerification = "SELECT * FROM myUsers WHERE nombre_usuario='$nombre'";//---consulta
  $result = $conn->query($sqlVerification);

 if ($result->num_rows > 0){echo "El nombre $nombre ya existe.";}
 else{
     $sql = "INSERT INTO my (nombre_usuario, nombre_imagen, imagen_usuario,contrasena_usuario)
       VALUES ('$nombre', '$nombreImagen', '$imagenUsuario','contrasena')";
        if ($conn->query($sql) === TRUE) {echo "$nombre, se ha registrado con éxito :D";}
        else {echo '{"error: "' . $sql . ' ' . $conn->error.'"}';}
  }
}
else{echo "Campos vacíos";}

$conn->close();
?>