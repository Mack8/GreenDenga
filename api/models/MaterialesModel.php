<?php

class MaterialesModel 
{
    public $enlace;
    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }
    /*Listar */
    public function all(){
        try {
            //Consulta sql
			$vSql = "SELECT * FROM materiales_reciclable;";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ($vSql);
				
			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }
    /*Obtener los materiales por ID */
    public function get($id)
    {
        try {
            //Consulta sql
			$vSql = "SELECT * FROM materiales_reciclable where id=$id";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }

    /* Obtener materiales reciclables por nombre */
    public function getMaterialesByName($name)
    {
        try {
            //Consulta sql
			$vSql = "SELECT * FROM materiales_reciclable where nombre=$name";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }

    /* Obtener materiales reciclables más populares */
    /* Creo que no tiene funcionalidad*/
    public function getMaterialesXPopularidad()
    {
        try {
            //Consulta sql
			$vSql = "SELECT nombre, COUNT(*) AS cantidad
            FROM materiales_reciclable
            GROUP BY nombre
            ORDER BY cantidad DESC
            LIMIT 5;";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }

    /* Obtener materiales reciclables con el precio más alto */
    public function getMaterialesXPrecio()
    {
        try {
            //Consulta sql
			$vSql = "SELECT nombre, precio_unitario
            FROM materiales_reciclable
            ORDER BY precio_unitario DESC;";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }

    /* Obtener materiales reciclables que se pueden canjear en un centro de acopio específico */
    public function getMaterialesByCentroAcopio($idCentroAcopio)
    {
        try {
            //Consulta sql
			$vSql = "SELECT *
            FROM materiales_reciclable
            INNER JOIN centro_acopio_materiales
            ON materiales_reciclable.id = centro_acopio_materiales.id_material_reciclable
            WHERE centro_acopio_materiales.id_centro_acopio = $idCentroAcopio;";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL($vSql);
			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }

    /* Obtener materiales reciclables que se pueden canjear por un producto o servicio específico */
    public function getMaterialesByCanje($nombreCanje)
    {
        try {
            //Consulta sql
			$vSql = "SELECT materiales_reciclable.nombre
            FROM materiales_reciclable
            INNER JOIN canjes_material
            ON materiales_reciclable.id = canjes_material.tipo_material
            INNER JOIN cupones_canje
            ON canjes_material.cupon_canje = cupones_canje.id
            WHERE cupones_canje.nombre = $nombreCanje;";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }

    /* Obtener materiales reciclables que se han canjeado en un período de tiempo específico */
    public function getMaterialesCanjeadosXtiempo($FechaInicio, $FechaFinal)
    {
        try {
            //Consulta sql
			$vSql = "SELECT materiales_reciclable.nombre, COUNT(*) AS cantidad
            FROM materiales_reciclable
            INNER JOIN canjes_material
            ON materiales_reciclable.id = canjes_material.tipo_material
            WHERE canjes_material.fecha_canje BETWEEN $FechaInicio AND $FechaFinal
            GROUP BY materiales_reciclable.id
            ORDER BY cantidad DESC;";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }

    /* Obtener materiales reciclables que se han generado más ingresos en un período de tiempo específico */
    public function getMaterialesMasIngresosXtiempo($FechaInicio, $FechaFinal)
    {
        try {
            //Consulta sql
			$vSql = "SELECT materiales_reciclable.nombre, SUM(valor_eco_monedas) AS ingresos
            FROM materiales_reciclable
            INNER JOIN canjes_material
            ON materiales_reciclable.id = canjes_material.tipo_material
            WHERE canjes_material.fecha_canje BETWEEN $FechaInicio AND $FechaFinal
            GROUP BY materiales_reciclable.id
            ORDER BY ingresos DESC;";            
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }

    /* Obtener materiales reciclables que se han canjeado por un usuario específico */
    public function getMaterialesByUser($id)
    {
        try {
            //Consulta sql
			$vSql = "SELECT materiales_reciclable.nombre
            FROM materiales_reciclable
            INNER JOIN canjes_material
            ON materiales_reciclable.id = canjes_material.tipo_material
            WHERE canjes_material.cliente = $id;";            
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }

    /* Obtener materiales reciclables que se han canjeado en un centro de acopio específico en un período de tiempo específico */
    public function getMaterialesByCentroAcopioXTiempo($idCentroAcopio, $FechaInicio, $FechaFinal)
    {
        try {
            //Consulta sql
			$vSql = "SELECT materiales_reciclable.nombre, COUNT(*) AS cantidad
            FROM materiales_reciclable
            INNER JOIN canjes_material
            ON materiales_reciclable.id = canjes_material.tipo_material
            WHERE canjes_material.centro_acopio = $idCentroAcopio
            AND canjes_material.fecha_canje BETWEEN $FechaInicio AND $FechaFinal
            GROUP BY materiales_reciclable.id
            ORDER BY cantidad DESC;";            
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }

    /* Obtener materiales reciclables que se han canjeado por un producto o servicio específico en un período de tiempo específico */
    public function getMaterialesByCanjeXTiempo($nombreCanje, $FechaInicio, $FechaFinal)
    {
        try {
            //Consulta sql
			$vSql = "SELECT materiales_reciclable.nombre, COUNT(*) AS cantidad
            FROM materiales_reciclable
            INNER JOIN canjes_material
            ON materiales_reciclable.id = canjes_material.tipo_material
            INNER JOIN cupones_canje
            ON canjes_material.cupon_canje = cupones_canje.id
            WHERE cupones_canje.nombre = $nombreCanje
            AND canjes_material.fecha_canje BETWEEN $FechaInicio AND $FechaFinal
            GROUP BY materiales_reciclable.id
            ORDER BY cantidad DESC;";            
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }

    /* Obtener los colores que ya estan en la base de datos*/
    public function getExistingColors() {
        // Consulta SQL para obtener todos los colores existentes
        $vSql = "SELECT color_hexadecimal FROM materiales_reciclable";
    
        // Ejecutar la consulta y obtener los resultados
        $existingColors = $this->enlace->executeSQL_DML($vSql);
    
        return $existingColors;
    }
    /* Crear un nuevo material */
    public function createMaterial($object){
        try {
                // Guardar la ruta de la imagen en la base de datos
                $vSql = "INSERT INTO materiales_reciclable (nombre, descripcion, imagen, unidad_medida, precio_ecomoneda, color_hexadecimal) " .
                "VALUES ('$object->nombre', '$object->descripcion', '$object->imagen', '$object->unidad_medida', '$object->precio', '$object->color')";
    
                // Ejecutar la consulta y obtener el último ID insertado
                $idMaterial = $this->enlace->executeSQL_DML_last($vSql);
    
                $json = array(
                    'status' => 200,
                    'results' => 'Material creado',
                );
    
            return $json;
        } catch (Exception $e) {
            die ($e->getMessage());
}
}

    /*Actualizar un material existente */
    public function updateMaterial($objeto) {
        try {
            // Consulta SQL para actualizar un material
            $sql = "UPDATE materiales_reciclable SET " .
                   "nombre = '$objeto->nombre', " .
                   "descripcion = '$objeto->descripcion', " .
                   "imagen = '$objeto->imagen', " .
                   "unidad_medida = '$objeto->unidad_medida', " .
                   "precio_ecomoneda = '$objeto->precio', " .
                   "color_hexadecimal = '$objeto->color' WHERE id = $objeto->id";
    
            // Ejecutar la consulta
            $cResults = $this->enlace->executeSQL_DML($sql);
    
            // Retornar el material actualizado
            return $this->get($objeto->id);
        } catch (Exception $e) {
            die($e->getMessage());
        }
    }

}