<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestión de Productos</title>
</head>
<body>
    <h1>Gestión de Productos</h1>

    <?php
    // Datos de conexión a MySQL
    $servername = "localhost";  // Nombre del servidor MySQL
    $username = "root";      // Nombre de usuario de MySQL
    $password = "";   // Contraseña de MySQL
    $dbname = "productos";      // Nombre de la base de datos

    // Crear conexión
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Verificar conexión
    if ($conn->connect_error) {
        die("Conexión fallida: " . $conn->connect_error);
    }

    // Ejemplo de inserción de producto
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $nombre = $_POST['nombre'];
        $descripcion = $_POST['descripcion'];
        $precio = $_POST['precio'];
        $imagen = $_POST['imagen'];

        // Validación básica (puedes mejorar esto según tus necesidades)
        if (!empty($nombre) && !empty($precio)) {
            // Preparar consulta SQL para insertar producto
            $sql = "INSERT INTO productos (nombre, descripcion, precio, imagen)
                    VALUES ('$nombre', '$descripcion', $precio, '$imagen')";

            if ($conn->query($sql) === TRUE) {
                echo '<p>Producto insertado correctamente.</p>';
            } else {
                echo '<p>Error al insertar producto: ' . $conn->error . '</p>';
            }
        } else {
            echo '<p>Nombre y precio son campos obligatorios.</p>';
        }
    }

    // Cerrar conexión
    $conn->close();
    ?>

    <!-- Formulario para agregar productos -->
    <h2>Agregar Nuevo Producto</h2>
    <form method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>">
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre" required><br><br>

        <label for="descripcion">Descripción:</label><br>
        <textarea id="descripcion" name="descripcion" rows="4" cols="50"></textarea><br><br>

        <label for="precio">Precio:</label>
        <input type="text" id="precio" name="precio" required><br><br>

        <label for="imagen">Imagen (URL):</label>
        <input type="text" id="imagen" name="imagen"><br><br>

        <input type="submit" value="Agregar Producto">
    </form>

</body>
</html>
