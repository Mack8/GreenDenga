<?php

class canjeMaterialModel
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
            $vSql = "SELECT
            cm.id AS canje_id,
            cm.fecha_canje,
            u.nombre_completo AS nombre_cliente,
            ca.nombre AS nombre_centro_acopio
        FROM canjes_material AS cm
        JOIN usuarios AS u ON cm.cliente = u.id
        JOIN centro_acopio AS ca ON cm.centro_acopio = ca.id;";

            //Ejecutar la consulta
            $vResultado = $this->enlace->ExecuteSQL($vSql);

            // Retornar el objeto
            return $vResultado;
        } catch (Exception $e) {
            die($e->getMessage());
        }
    }

    public function getById($id)
    {
        try {
            //Consulta sql
            $vSql = "SELECT
            cm.id AS canje_id,
            cm.fecha_canje,
            u.nombre_completo AS nombre_cliente,
            ca.nombre AS nombre_centro_acopio
        FROM canjes_material AS cm
        JOIN usuarios AS u ON cm.cliente = u.id
        JOIN centro_acopio AS ca ON cm.centro_acopio = ca.id
        where u.id=$id";

            //Ejecutar la consulta
            $vResultado = $this->enlace->ExecuteSQL($vSql);

            // Retornar el objeto
            return $vResultado;
        } catch (Exception $e) {
            die($e->getMessage());
        }
    }

    public function getByIdAdmin($idAdmin)
    {
        try {
            //Consulta sql
            $vSql = "SELECT
            cm.id AS canje_id,
            cm.fecha_canje,
            u.nombre_completo AS nombre_cliente,
            ca.nombre AS nombre_centro_acopio
        FROM canjes_material AS cm
        JOIN usuarios AS u ON cm.cliente = u.id
        JOIN centro_acopio AS ca ON cm.centro_acopio = ca.id
        WHERE ca.usuario_administrador = $idAdmin";

            //Ejecutar la consulta
            $vResultado = $this->enlace->ExecuteSQL($vSql);

            // Retornar el objeto
            return $vResultado;
        } catch (Exception $e) {
            die($e->getMessage());
        }
    }



    public function getByIDCanje($idCanje)
    {
        try {
            //Consulta sql
            $canje_Detalle = new canjeDetalleModel();
            $vSql = "SELECT
            cm.id AS id_canje_material,
            cm.fecha_canje,
            u.nombre_completo AS nombre_usuario,
            ca.nombre AS nombre_centro_acopio
        FROM
            canjes_material AS cm
        JOIN
            usuarios AS u
        ON
            cm.cliente = u.id
        JOIN
            centro_acopio AS ca
        ON
            cm.centro_acopio = ca.id
        WHERE cm.id = $idCanje";

            $vResultado = $this->enlace->executeSQL($vSql);
            if (!empty($vResultado)) {
                //Obtener objeto
                $vResultado = $vResultado[0];

                $listadoDetalles = $canje_Detalle->get($idCanje);
                //Asignar generos al objeto
                $vResultado->detalles = $listadoDetalles;

                //Ejecutar la consulta
            }

            // Retornar el objeto
            return $vResultado;
        } catch (Exception $e) {
            die($e->getMessage());
        }
    }



    public function getByTipoMaterial($id)
    {
        try {

            $vSql = "SELECT * FROM canjes_material
            WHERE tipo_material = $id;";
            $vResultado = $this->enlace->executeSQL($vSql);

            return $vResultado;
        } catch (Exception $e) {
            die($e->getMessage());
        }

    }

    public function getByUsuario($idUsuario)
    {
        try {

            $vSql = "SELECT * FROM canjes_material
            WHERE cliente = $idUsuario;";
            $vResultado = $this->enlace->executeSQL($vSql);

            return $vResultado;
        } catch (Exception $e) {
            die($e->getMessage());
        }

    }

    public function getByCentroAcopio($idCentroAcopio)
    {
        try {

            $vSql = "SELECT * FROM canjes_material
            WHERE centro_acopio  = $idCentroAcopio;";
            $vResultado = $this->enlace->executeSQL($vSql);

            return $vResultado;
        } catch (Exception $e) {
            die($e->getMessage());
        }

    }


    public function createCanje($objeto) {
        try {
            // Consulta SQL para insertar un nuevo encabezado de canje
            $sqlCanje = "INSERT INTO canjes_material (fecha_canje, cliente, centro_acopio, Total) " .
                         "VALUES ('$objeto->fecha_canje', $objeto->cliente, $objeto->centro_acopio, $objeto->Total)";
            
            // Ejecutar la consulta y obtener el último ID insertado
            $idCanje = $this->enlace->executeSQL_DML_last($sqlCanje);



            $nuevoSaldo = $objeto->Total;

            // Actualizar el saldo en la tabla wallet
            $sqlUpdateSaldo = "UPDATE wallet SET saldo = saldo + $nuevoSaldo WHERE usuario = $objeto->cliente";
            $sqlUpdateRecibidos = "UPDATE wallet SET totalRecibidos = totalRecibidos + $nuevoSaldo WHERE usuario = $objeto->cliente";

            $this->enlace->executeSQL_DML($sqlUpdateSaldo);
           $this->enlace->executeSQL_DML($sqlUpdateRecibidos);


    
            // Insertar los detalles del canje
            foreach ($objeto->detalles as $detalle) {
                // Consulta SQL para insertar un nuevo detalle de canje
                $sqlDetalle = "INSERT INTO canje_material_detalle (id_canje, tipo_material, cantidad, Subtotal) " .
                               "VALUES ($idCanje, $detalle->tipo_material, $detalle->cantidad, $detalle->subtotal)";
                $this->enlace->executeSQL_DML($sqlDetalle);
            }
    
            // Devolver los detalles del canje recién creado
            return $this->getById($idCanje);  
    
        } catch (Exception $e) {
            die($e->getMessage());
        }
}

}