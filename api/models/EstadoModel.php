<?php

class estadoModel
{

    public $enlace;

    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }

public function all()
    {
        try {

            $vSql = "SELECT * FROM estado_centro_acopio;";
            $vResultado = $this->enlace->executeSQL($vSql);
            
            return $vResultado;
        } catch (Exception $e) {
            die($e->getMessage());
        }

    }

}