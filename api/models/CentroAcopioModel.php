<?php

class centroAcopioModel 
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
			$vSql = "SELECT * FROM centro_acopio;";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ($vSql);
				
			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }
    /*Obtener los centro de acopio por ID */
    public function get($id)
    {
        try {
            //Consulta sql
			$vSql = "SELECT 
            c.*, 
            GROUP_CONCAT(cam.id_material_reciclable) AS materiales
        FROM 
            centro_acopio c
        LEFT JOIN 
            centro_acopio_materiales cam ON c.id = cam.id_centro_acopio
        WHERE 
            c.id = $id
        GROUP BY 
            c.id;";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }

    public function getByAdministrador($id)
    {
        try {
            //Consulta sql
			$vSql = "SELECT id, nombre from centro_acopio where usuario_administrador =$id ";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }



    /* Obtener centros de acopio por provincia */
    public function getCentrosByProvincia($provincia)
    {
        try {
            //Consulta sql
			$vSql = "SELECT * FROM centro_acopio where provincia=$provincia";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }

    /* Obtener centros de acopio por Canton */
    public function getCentrosByCanton($canton)
    {
        try {
            //Consulta sql
			$vSql = "SELECT * FROM centro_acopio where canton=$canton";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }

    /* Obtener centros de acopio por Estado */
    public function getCentrosByEstado($estado)
    {
        try {
            //Consulta sql
			$vSql = "SELECT * FROM centro_acopio where estado=$estado";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }

    /* Obtener centros de acopio que aceptan un material reciclable específico */
    public function getCentrosByMaterial($idMaterial)
    {
        try {
            //Consulta sql
			$vSql = "SELECT *
            FROM centro_acopio
            INNER JOIN centro_acopio_materiales
            ON centro_acopio.id = centro_acopio_materiales.id_centro_acopio
            WHERE centro_acopio_materiales.id_material_reciclable = $idMaterial";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }

    /* Obtener centros de acopio que están ubicados en un área específica */
    public function getCentrosByUbicacionEspecifica($provincia, $canton)
    {
        try {
            //Consulta sql
			$vSql = "SELECT *
            FROM centro_acopio
            WHERE provincia = $provincia
            AND canton = $canton;";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }

    /* Obtener centros de acopio que han recibido más materiales reciclables en un período de tiempo específico */
    public function getCentrosXCantMaterialesXTiempo($FechaInicio, $FechaFinal)
    {
        try {
            //Consulta sql
			$vSql = "SELECT *
            FROM centro_acopio
            INNER JOIN canjes_material
            ON centro_acopio.id = canjes_material.centro_acopio
            WHERE canjes_material.fecha_canje BETWEEN $FechaInicio AND $FechaFinal
            GROUP BY centro_acopio.id
            ORDER BY SUM(cantidad) DESC;";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }

    /* Obtener centros de acopio que han generado más ingresos en un período de tiempo específico */
    public function getCentrosMasIngresosXTiempo($FechaInicio, $FechaFinal)
    {
        try {
            //Consulta sql
			$vSql = "SELECT *
            FROM centro_acopio
            INNER JOIN canjes_material
            ON centro_acopio.id = canjes_material.centro_acopio
            WHERE canjes_material.fecha_canje BETWEEN $FechaInicio AND $FechaFinal
            GROUP BY centro_acopio.id
            ORDER BY SUM(valor_eco_monedas) DESC;";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }

    /* Obtener los materiales reciclables que se aceptan en un centro de acopio específico */
    public function getMaterialesByCentro($id)
    {
        try {
            //Consulta sql
			$vSql = "SELECT materiales_reciclable.nombre
            FROM centro_acopio_materiales
            INNER JOIN materiales_reciclable
            ON centro_acopio_materiales.id_material_reciclable = materiales_reciclable.id
            WHERE centro_acopio_materiales.id_centro_acopio = $id;";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }

    /* Obtener los centros de acopio que están ubicados en un área específica y aceptan un material reciclable específico */
    public function getCentroByAreaByMaterial($idMaterial, $provincia, $canton)
    {
        try {
            //Consulta sql
			$vSql = "SELECT *
            FROM centro_acopio
            INNER JOIN centro_acopio_materiales
            ON centro_acopio.id = centro_acopio_materiales.id_centro_acopio
            WHERE centro_acopio.provincia = $provincia
            AND centro_acopio.canton = $canton
            AND centro_acopio_materiales.id_material_reciclable = $idMaterial;";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }

    /* Obtener los centros de acopio que han recibido más materiales reciclables de un material reciclable específico en un período de tiempo específico */
    public function getCentroMasCantidadXTiempo($idMaterial, $FechaInicio, $FechaFinal)
    {
        try {
            //Consulta sql
			$vSql = "SELECT *
            FROM centro_acopio
            INNER JOIN centro_acopio_materiales
            ON centro_acopio.id = centro_acopio_materiales.id_centro_acopio
            INNER JOIN canjes_material
            ON centro_acopio.id = canjes_material.centro_acopio
            WHERE centro_acopio_materiales.id_material_reciclable = $idMaterial
            AND canjes_material.fecha_canje BETWEEN $FechaInicio AND $FechaFinal
            GROUP BY centro_acopio.id
            ORDER BY SUM(cantidad) DESC;";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }

    /* Obtener los centros de acopio que han generado más ingresos de un material reciclable específico en un período de tiempo específico */
    public function getCentroMasIngresosXTiempo($idMaterial, $FechaInicio, $FechaFinal)
    {
        try {
            //Consulta sql
			$vSql = "SELECT *
            FROM centro_acopio
            INNER JOIN centro_acopio_materiales
            ON centro_acopio.id = centro_acopio_materiales.id_centro_acopio
            INNER JOIN canjes_material
            ON centro_acopio.id = canjes_material.centro_acopio
            WHERE centro_acopio_materiales.id_material_reciclable = $idMaterial
            AND canjes_material.fecha_canje BETWEEN $FechaInicio AND $FechaFinal
            GROUP BY centro_acopio.id
            ORDER BY SUM(valor_eco_monedas) DESC;
            ";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }


    public function createCentroAcopio($objeto) {
        try {
            // Consulta SQL para insertar un nuevo centro de acopio
            $sql = "INSERT INTO centro_acopio (nombre, provincia, canton, direccion, telefono, horario_atencion, usuario_administrador, estado) " .
                   "VALUES ('$objeto->nombre', '$objeto->provincia', '$objeto->canton', '$objeto->direccion', '$objeto->telefono', " .
                   "'$objeto->horario_atencion', $objeto->usuario_administrador, $objeto->estado)";
        
            // Ejecutar la consulta y obtener el último ID insertado
            $idCentroAcopio = $this->enlace->executeSQL_DML_last($sql);
        
            // Insertar los materiales asociados al centro de acopio
            foreach ($objeto->materiales as $idMaterial) {
                $sqlMaterial = "INSERT INTO centro_acopio_materiales (id_centro_acopio, id_material_reciclable) " .
                               "VALUES ($idCentroAcopio, $idMaterial)";
                $this->enlace->executeSQL_DML($sqlMaterial);
            }
        
            return $this->get($idCentroAcopio);
            
        } catch (Exception $e) {
            die($e->getMessage());
        }
    }

    public function update($objeto) {
        try {
            // Consulta SQL para actualizar un centro de acopio
            $sql = "UPDATE centro_acopio SET 
                    nombre = '$objeto->nombre',
                    provincia = '$objeto->provincia',
                    canton = '$objeto->canton',
                    direccion = '$objeto->direccion',
                    telefono = '$objeto->telefono',
                    horario_atencion = '$objeto->horario_atencion',
                    usuario_administrador = $objeto->usuario_administrador,
                    estado = $objeto->estado
                    WHERE id = $objeto->id";  // Asumiendo que tienes un campo 'id' que identifica el centro de acopio a actualizar
    
            // Ejecutar la consulta de actualización
            $cResults = $this->enlace->executeSQL_DML($sql);
    
            // Eliminar los registros de materiales asociados al centro de acopio
            $sqlDeleteMaterials = "DELETE FROM centro_acopio_materiales WHERE id_centro_acopio = $objeto->id";
            $cResults = $this->enlace->executeSQL_DML($sqlDeleteMaterials);
    
            // Insertar los nuevos materiales asociados al centro de acopio
            foreach ($objeto->materiales as $idMaterial) {
                $sqlMaterial = "INSERT INTO centro_acopio_materiales (id_centro_acopio, id_material_reciclable) " .
                               "VALUES ($objeto->id, $idMaterial)";
                               $vResultado = $this->enlace->executeSQL_DML($sqlMaterial);
            }
    
            return $this->get($objeto->id);  // Obtener y devolver el objeto actualizado
    
        } catch (Exception $e) {
            die($e->getMessage());
        }
    }
    

    
}