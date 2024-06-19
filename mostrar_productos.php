<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "productos";  // Nombre de tu base de datos

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Consulta SQL para obtener todos los productos
$sql = "SELECT id, nombre, descripcion, precio, imagen FROM productos";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Salida de datos por cada fila
    while($row = $result->fetch_assoc()) {
        echo '<div class="item">';
        echo '<span class="titulo-item">' . $row["nombre"] . '</span>';
        echo '<img src="' . $row["imagen"] . '" alt="" class="img-item">';
        echo '<span class="precio-item">$' . $row["precio"] . '</span>';
        echo '<button class="boton-item">Agregar al Carrito</button>';
        echo '</div>';
    }
} else {
    echo "No hay productos disponibles.";
}

// Cerrar conexión
$conn->close();
?>
