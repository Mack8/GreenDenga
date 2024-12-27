<?php
class RolModel
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
            $vSql = "SELECT * FROM tipo_usuario;";

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
            $vSql = "SELECT * FROM tipo_usuario where id=$id";

            //Ejecutar la consulta
            $vResultado = $this->enlace->ExecuteSQL($vSql);
            // Retornar el objeto
            return $vResultado;
        } catch (Exception $e) {
            die($e->getMessage());
        }
    }

    public function getRolUser($idUser)
    {
        try {
            //Consulta sql
            $vSql = "SELECT t.id, t.Descripcion
            FROM tipo_usuario t, usuarios u
            where t.id=u.tipo_usuario and u.id=$idUser";

            //Ejecutar la consulta
            $vResultado = $this->enlace->ExecuteSQL($vSql);
            // Retornar el objeto
            return $vResultado[0];
        } catch (Exception $e) {
            die($e->getMessage());
        }
    }

}