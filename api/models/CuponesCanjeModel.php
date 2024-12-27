<?php

class cuponesModel
{

    public $enlace;

    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }

    public function all()
    {
        try {
            //Consulta sql
            $vSql = "SELECT * FROM cupones_canje;";

            //Ejecutar la consulta
            $vResultado = $this->enlace->ExecuteSQL($vSql);

            // Retornar el objeto
            return $vResultado;
        } catch (Exception $e) {
            die($e->getMessage());
        }
    }

    public function get($id)
    {
        try {
            //Consulta sql
			$vSql = "SELECT * FROM cupones_canje where id=$id";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage());
		}
}


    public function getByCategory($param)
    {
        try {
            //Consulta sql
            $vSql = "SELECT COUNT(*) AS total
            FROM cupones_canje
            WHERE categoria = '$param';
            ";

            //Ejecutar la consulta
            $vResultado = $this->enlace->ExecuteSQL($vSql);

            // Retornar el objeto
            return $vResultado;
        } catch (Exception $e) {
            die($e->getMessage());
        }
    }

    public function getCuponesVigentes()
    {
        try {
            //Consulta sql
            $vSql = "SELECT *
            FROM cupones_canje
            WHERE fecha_fin >= NOW();
            ";

            //Ejecutar la consulta
            $vResultado = $this->enlace->ExecuteSQL($vSql);

            // Retornar el objeto
            return $vResultado;
        } catch (Exception $e) {
            die($e->getMessage());
        }
    }

    public function getByValor()
    {
        try {
            //Consulta sql
            $vSql = "SELECT *
            FROM cupones_canje
            ORDER BY cantidad_eco_monedas ASC;
            ";

            //Ejecutar la consulta
            $vResultado = $this->enlace->ExecuteSQL($vSql);

            // Retornar el objeto
            return $vResultado;
        } catch (Exception $e) {
            die($e->getMessage());
        }
    }

    public function create($object){
        try {
                // Guardar la ruta de la imagen en la base de datos
                $vSql = "INSERT INTO cupones_canje (nombre, descripcion, imagen, categoria, fecha_inicio, fecha_fin, cantidad_eco_monedas) " .
                "VALUES ('$object->nombre', '$object->descripcion', '$object->imagen', '$object->categoria', '$object->fecha_inicio', '$object->fecha_fin', '$object->cantidad_eco_monedas')";
    
                // Ejecutar la consulta y obtener el último ID insertado
                $idCupon = $this->enlace->executeSQL_DML_last($vSql);
    
                $json = array(
                    'status' => 200,
                    'results' => 'Cupon creado',
                );
    
            return $json;
        } catch (Exception $e) {
            die ($e->getMessage());
        }
    }

    /*Actualizar un material existente */
    public function update($objeto) {
        try {
            // Consulta SQL para actualizar un material
            $sql = "UPDATE cupones_canje SET " .
                   "nombre = '$objeto->nombre', " .
                   "descripcion = '$objeto->descripcion', " .
                   "categoria = '$objeto->categoria', " .
                   "fecha_inicio = '$objeto->fecha_inicio', " .
                   "fecha_fin = '$objeto->fecha_fin', " .
                   "cantidad_eco_monedas = '$objeto->cantidad_eco_monedas' WHERE id = $objeto->id";
    
            // Ejecutar la consulta
            $cResults = $this->enlace->executeSQL_DML($sql);
    
            // Retornar el material actualizado
            return $this->get($objeto->id);
        } catch (Exception $e) {
            die($e->getMessage());
        }
    }


}