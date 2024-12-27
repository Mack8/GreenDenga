<?php
class WalletModel
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
			$vSql = "SELECT * FROM wallet;";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ($vSql);
				
			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }
    /*Obtener todos los Wallet */
    public function get($id)
    {
        try {
            //Consulta sql
			$vSql = "SELECT usuarios.nombre_completo AS usuario, wallet.saldo, wallet.totalCanjeado, wallet.totalRecibidos
            FROM wallet
            JOIN usuarios ON wallet.usuario = usuarios.id
            WHERE usuarios.id = $id;";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }

    /*Obtener el saldo de un usuario especifico */
    public function getSaldobyId($id){
        try {
            //Consulta sql
            $vSql = "SELECT saldo FROM wallet where id=$id";

            //Ejecutar la consulta
            $vResultado = $this->enlace->ExecuteSQL ( $vSql );
            //Retornar el objeto
            return $vResultado;
        } catch ( Exception $e ) {
            die ( $e->getMessage () );
        }
    }

    /*Obtener el total canjeado de un usuario especifico */
    public function getTotalCanjebyId($id){
        try {
            //Consulta sql
            $vSql = "SELECT totalCanjeado FROM wallet where id=$id";

            //Ejecutar la consulta
            $vResultado = $this->enlace->ExecuteSQL ( $vSql );
            //Retornar el objeto
            return $vResultado;
        } catch ( Exception $e ) {
            die ( $e->getMessage () );
        }
    }

    /*Obtener el total Recibido de un usuario especifico */
    public function getTotalRecibidobyId($id){
        try {
            //Consulta sql
            $vSql = "SELECT totalRecibidos FROM wallet where id=$id";

            //Ejecutar la consulta
            $vResultado = $this->enlace->ExecuteSQL ( $vSql );
            //Retornar el objeto
            return $vResultado;
        } catch ( Exception $e ) {
            die ( $e->getMessage () );
        }
    }

    /*Obtener los usuarios con mayor saldo */
    public function getUserMoreSaldo(){
        try {
            //Consulta sql
            $vSql = "SELECT usuarios.nombre_completo, wallet.saldo
            FROM wallet
            INNER JOIN usuarios
            ON wallet.usuario = usuarios.id
            ORDER BY wallet.saldo DESC;
            ";

            //Ejecutar la consulta
            $vResultado = $this->enlace->ExecuteSQL ( $vSql );
            //Retornar el objeto
            return $vResultado;
        } catch ( Exception $e ) {
            die ( $e->getMessage () );
        }
    }

    /*	Obtener los usuarios que han canjeado más eco-monedas */
    public function getUserMoreCanje(){
        try {
            //Consulta sql
            $vSql = "SELECT usuarios.nombre_completo, wallet.totalCanjeado
            FROM wallet
            INNER JOIN usuarios
            ON wallet.usuario = usuarios.id
            ORDER BY wallet.totalCanjeado DESC;            
            ";

            //Ejecutar la consulta
            $vResultado = $this->enlace->ExecuteSQL ( $vSql );
            //Retornar el objeto
            return $vResultado;
        } catch ( Exception $e ) {
            die ( $e->getMessage () );
        }
    }

    /*	Obtener los usuarios que han recibido más eco-monedas */
    public function getUserMoreEcoMonedas(){
        try {
            //Consulta sql
            $vSql = "SELECT usuarios.nombre_completo, wallet.totalRecibidos
            FROM wallet
            INNER JOIN usuarios
            ON wallet.usuario = usuarios.id
            ORDER BY wallet.totalRecibidos DESC;                       
            ";

            //Ejecutar la consulta
            $vResultado = $this->enlace->ExecuteSQL ( $vSql );
            //Retornar el objeto
            return $vResultado;
        } catch ( Exception $e ) {
            die ( $e->getMessage () );
        }
    }

    /*	Obtener el total de eco-monedas en el sistema */
    public function getTotalEcoMonedas(){
        try {
            //Consulta sql
            $vSql = "SELECT SUM(saldo) AS total_eco_monedas FROM wallet;";

            //Ejecutar la consulta
            $vResultado = $this->enlace->ExecuteSQL ( $vSql );
            //Retornar el objeto
            return $vResultado;
        } catch ( Exception $e ) {
            die ( $e->getMessage () );
        }
    }

    /*	Obtener el total de eco-monedas canjeadas */
    public function getTotalEcoMonedasCanjeadas(){
        try {
            //Consulta sql
            $vSql = "SELECT SUM(totalCanjeado) AS total_eco_monedas_canjeadas FROM wallet;";

            //Ejecutar la consulta
            $vResultado = $this->enlace->ExecuteSQL ( $vSql );
            //Retornar el objeto
            return $vResultado;
        } catch ( Exception $e ) {
            die ( $e->getMessage () );
        }
    }

    /*	Obtener el total de eco-monedas recibidas */
    public function getTotalEcoMonedasRecibidas(){
        try {
            //Consulta sql
            $vSql = "SELECT SUM(totalCanjeado) AS total_eco_monedas_recibidas FROM wallet;";

            //Ejecutar la consulta
            $vResultado = $this->enlace->ExecuteSQL ( $vSql );
            //Retornar el objeto
            return $vResultado;
        } catch ( Exception $e ) {
            die ( $e->getMessage () );
        }
    }

    /*	Obtener el total de eco-monedas canjeadas por material reciclable */
    public function getTotalEcoMonedasXMaterial(){
        try {
            //Consulta sql
            $vSql = "SELECT materiales_reciclable.nombre, SUM(totalCanjeado) AS total_eco_monedas
            FROM wallet
            INNER JOIN canjes_material
            ON wallet.usuario = canjes_material.cliente
            INNER JOIN materiales_reciclable
            ON canjes_material.tipo_material = materiales_reciclable.id
            GROUP BY materiales_reciclable.id
            ORDER BY total_eco_monedas DESC;
            ";

            //Ejecutar la consulta
            $vResultado = $this->enlace->ExecuteSQL ( $vSql );
            //Retornar el objeto
            return $vResultado;
        } catch ( Exception $e ) {
            die ( $e->getMessage () );
        }
    }

    /*	Obtener el total de eco-monedas recibidas por centro de acopio */
    public function getTotalEcoMonedasXCentroAcopio(){
        try {
            //Consulta sql
            $vSql = "SELECT centro_acopio.nombre, SUM(totalRecibidos) AS total_eco_monedas
            FROM wallet
            INNER JOIN canjes_material
            ON wallet.usuario = canjes_material.cliente
            INNER JOIN centro_acopio
            ON canjes_material.centro_acopio = centro_acopio.id
            GROUP BY centro_acopio.id
            ORDER BY total_eco_monedas DESC;            
            ";

            //Ejecutar la consulta
            $vResultado = $this->enlace->ExecuteSQL ( $vSql );
            //Retornar el objeto
            return $vResultado;
        } catch ( Exception $e ) {
            die ( $e->getMessage () );
        }
    }

    /*	Obtener el saldo de los usuarios en un período de tiempo específico*/
    public function getSaldoXTiempoEspecifico($FechaInicio, $FechaFinal){
        try {
            //Consulta sql
            $vSql = "SELECT usuarios.nombre_completo, wallet.saldo
            FROM wallet
            INNER JOIN usuarios
            ON wallet.usuario = usuarios.id
            WHERE fecha_canje BETWEEN $FechaInicio AND $FechaFinal;                       
            ";

            //Ejecutar la consulta
            $vResultado = $this->enlace->ExecuteSQL ( $vSql );
            //Retornar el objeto
            return $vResultado;
        } catch ( Exception $e ) {
            die ( $e->getMessage () );
        }
    }

    /*	Obtener el total canjeado por los usuarios en un período de tiempo específico*/
    public function getCanjeXTiempoEspecifico($FechaInicio, $FechaFinal){
        try {
            //Consulta sql
            $vSql = "SELECT usuarios.nombre_completo, wallet.totalCanjeado
            FROM wallet
            INNER JOIN usuarios
            ON wallet.usuario = usuarios.id
            WHERE fecha_canje BETWEEN $FechaInicio AND $FechaFinal;                                  
            ";

            //Ejecutar la consulta
            $vResultado = $this->enlace->ExecuteSQL ( $vSql );
            //Retornar el objeto
            return $vResultado;
        } catch ( Exception $e ) {
            die ( $e->getMessage () );
        }
    }

    /*	Obtener el total recibido por los usuarios en un período de tiempo específico */
    public function getEcoRecibidosXTiempoEspecifico($FechaInicio, $FechaFinal){
        try {
            //Consulta sql
            $vSql = "SELECT usuarios.nombre_completo, wallet.totalRecibidos
            FROM wallet
            INNER JOIN usuarios
            ON wallet.usuario = usuarios.id            
            WHERE fecha_canje BETWEEN $FechaInicio AND $FechaFinal;                                  
            ";

            //Ejecutar la consulta
            $vResultado = $this->enlace->ExecuteSQL ( $vSql );
            //Retornar el objeto
            return $vResultado;
        } catch ( Exception $e ) {
            die ( $e->getMessage () );
        }
    }
}
