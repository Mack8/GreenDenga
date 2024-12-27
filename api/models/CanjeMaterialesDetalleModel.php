<?php

class canjeDetalleModel
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
            $vSql = "SELECT * FROM canje_material_Detalle;";

            //Ejecutar la consulta
            $vResultado = $this->enlace->ExecuteSQL($vSql);

            // Retornar el objeto
            return $vResultado;
        } catch (Exception $e) {
            die($e->getMessage());
        }
    }


    public function get($id){
        try {
            //Consulta sql
			$vSql = "SELECT
            cmd.id AS id_canje_material_detalle,
            cmd.id_Canje,
            mr.nombre AS nombre_tipo_material,
            cmd.cantidad, cmd.subtotal,
            mr.precio_ecomoneda as precio,
            mr.unidad_medida as medida
        FROM
            canje_material_detalle AS cmd
        JOIN
            materiales_reciclable AS mr
        ON
            cmd.tipo_material = mr.id
        WHERE
            cmd.id_Canje = $id;";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }
}