<?php
//header('Content-Type: application/json');
Header('Access-Control-Allow-Origin: *');


$servername = "localhost";
$dbname = "id19982650_db_project";
$username = "id19982650_db_project117";
$password = "+eB+dVaX{POMo3E<";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
die("Connection failed: " . $conn->connect_error);
}

$nickname=$_GET["nickname"];
$contrasena=$_GET["contrasena"];

$sql = "SELECT * FROM myUsers WHERE  nombre_usuario='$nickname'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $registros=array();
    $i=0;
    while($row = sqli_fetch_assoc($result)) {
    $registros[$i]=$row;
    $i++;
    }
    echo '{"DatosUsuario":'.json_encode($registros).'}';
    } else {
    echo '{"DatosUsuario":[]}';;
    }  
$conn->close();
?>