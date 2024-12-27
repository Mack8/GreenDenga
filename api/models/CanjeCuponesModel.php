<?php

class canjeCuponModel
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
            $vSql = "SELECT * FROM canjes_cupones;";

            //Ejecutar la consulta
            $vResultado = $this->enlace->ExecuteSQL($vSql);

            // Retornar el objeto
            return $vResultado;
        } catch (Exception $e) {
            die($e->getMessage());
        }
    }


    public function getByIDCanje($id)
    {
        try {

            $vSql = "SELECT * FROM canjes_cupones
            WHERE id = id;";
            $vResultado = $this->enlace->executeSQL($vSql);

            if (!empty($vResultado)) {
                $vResultado = $vResultado[0];

            }
            return $vResultado;
        } catch (Exception $e) {
            die($e->getMessage());
        }

    }


    public function getCanjeByUser($id)
    {
        try {

            $vSql = "SELECT * FROM canjes_cupones
            WHERE cliente  = $id;";
            $vResultado = $this->enlace->executeSQL($vSql);

            if (!empty($vResultado)) {
                $vResultado = $vResultado[0];

            }
            return $vResultado;
        } catch (Exception $e) {
            die($e->getMessage());
        }

    }

    public function create($objeto) {
        try {
            // Verificar que el saldo es suficiente para el costo del cupón
            $sqlSaldoUsuario = "SELECT saldo FROM wallet WHERE usuario = " . (int)$objeto->cliente;

            $resultSaldoUsuario = $this->enlace->executeSQL($sqlSaldoUsuario);
    
            // Asegurarnos de que haya resultados
            if (!empty($resultSaldoUsuario)) {
                // Obtener el saldo real desde los resultados
                $saldoUsuario = $resultSaldoUsuario[0]->saldo;
    
                if ($saldoUsuario >= $objeto->cantidad_eco_monedas_utilizadas) {
                    $sqlCanje = "INSERT INTO canjes_cupones (fecha_canje, cliente, cupon_canje, cantidad_eco_monedas_utilizadas) " .
                                 "VALUES ('$objeto->fecha_canje', $objeto->cliente, $objeto->cupon_canje, $objeto->cantidad_eco_monedas_utilizadas)";
    
                    // Ejecutar la consulta y obtener el último ID insertado
                    $idCanje = $this->enlace->executeSQL_DML_last($sqlCanje);
    
                    // Actualizar el saldo en la tabla wallet
                    $sqlUpdateSaldo = "UPDATE wallet SET saldo = saldo - $objeto->cantidad_eco_monedas_utilizadas WHERE usuario = $objeto->cliente";
                    $sqlUpdateCanjeados = "UPDATE wallet SET totalCanjeado = totalCanjeado + $objeto->cantidad_eco_monedas_utilizadas WHERE usuario = $objeto->cliente";
    
                    $this->enlace->executeSQL_DML($sqlUpdateSaldo);
                    $this->enlace->executeSQL_DML($sqlUpdateCanjeados);
    
                    // Devolver los detalles del canje recién creado
                } else {
                    // Saldo insuficiente para realizar el canje
                    return "Saldo insuficiente para realizar el canje.";
                }
            } else {
                // No se encontró el saldo del usuario
                return "Usuario no encontrado o sin saldo.";
            }
        } catch (Exception $e) {
            die($e->getMessage());
        }
    }
    


}