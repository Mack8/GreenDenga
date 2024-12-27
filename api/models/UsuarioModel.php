<?php

class UsuarioModel
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
            $vSql = "SELECT * FROM usuarios where tipo_usuario=2;";

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
            $rolM=new RolModel();

            $vSql = "SELECT * FROM usuarios WHERE id = $id";
            $vResultado = $this->enlace->executeSQL($vSql);

            if ($vResultado) {
                $vResultado = $vResultado[0];
                $rol=$rolM->getRolUser($id);
                $vResultado->tipo_usuario=$rol;
                return $vResultado;
            }
            
        } catch (Exception $e) {
            die($e->getMessage());
        }

    }

    public function getByTipoUsuario($idTipo)
    {
        try {

            $vSql = "SELECT u.id, u.nombre_completo
            FROM usuarios u
            LEFT JOIN centro_acopio ca ON u.id = ca.usuario_administrador
            WHERE ca.id IS NULL
            AND u.tipo_usuario = $idTipo;";

            $vResultado = $this->enlace->executeSQL($vSql);

            return $vResultado;
        } catch (Exception $e) {
            die($e->getMessage());
        }

    }



   public function getOtrosAdministradores($centroAcopioId) {
        try {
            $vSql = "SELECT u.id, u.nombre_completo
            FROM usuarios u
            WHERE u.tipo_usuario = 1
            AND (u.id = (SELECT usuario_administrador FROM centro_acopio WHERE id = $centroAcopioId) OR u.id NOT IN (SELECT usuario_administrador FROM centro_acopio));";
    
            $vResultado = $this->enlace->executeSQL($vSql);
    
            return $vResultado;
        } catch (Exception $e) {
            die($e->getMessage());
        }
    }


    public function getByTipoUsuarioWithCurrent($idTipo, $idCentroAcopio)
{
    try {
        $vSql = "SELECT u.id, u.nombre_completo
        FROM usuarios u
        LEFT JOIN centro_acopio ca ON u.id = ca.usuario_administrador
        WHERE (ca.id IS NULL OR ca.id = $idCentroAcopio)
        AND u.tipo_usuario = $idTipo;";
        $vResultado = $this->enlace->executeSQL($vSql);
        return $vResultado;
    } catch (Exception $e) {
        die($e->getMessage());
    }
}


    public function getByProvincia($param)
    {
        try {
            $vSql = "SELECT *
            FROM usuarios WHERE direccion_Provincia = '$param';";
            $vResultado = $this->enlace->executeSQL($vSql);
            return $vResultado;
        } catch (Exception $e) {
            die($e->getMessage());
        }

    }

    public function login($objeto) {
        try {
            
			$vSql = "SELECT * from usuarios where correo_electronico='$objeto->correo_electronico'";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
			if($vResultado && is_object($vResultado[0])){
				$user=$vResultado[0];
				if(password_verify($objeto->contraseña, $user->contraseña))  
                    {
						return $this->getById($user->id);
					}

			}else{
				return false;
			}
           
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }

    public function create($objeto)
    {
        try {
            // Verificar si ya existe un usuario con esa identificación
            $resultadoIdentificacion = $this->enlace->query("SELECT COUNT(*) AS count FROM usuarios WHERE identificacion = '$objeto->identificacion'");
    
            if ($resultadoIdentificacion !== false) {
                $identificacionExistente = $resultadoIdentificacion->fetch_assoc();
    
                if ($identificacionExistente['count'] > 0) {
                    throw new Exception('Error: El correo electronico o la identificacion ya se encuentran registrados');
                }
            }
    
            // Verificar si ya existe un usuario con ese correo electrónico
            $resultadoCorreo = $this->enlace->query("SELECT COUNT(*) AS count FROM usuarios WHERE correo_electronico = '$objeto->correo_electronico'");
    
            if ($resultadoCorreo !== false) {
                $correoExistente = $resultadoCorreo->fetch_assoc();
    
                if ($correoExistente['count'] > 0) {
                    throw new Exception('Error: El correo electronico o la identificacion ya se encuentran registrados');
                }
            }

            if (isset($objeto->contraseña) && $objeto->contraseña != null) {
                $crypt = password_hash($objeto->contraseña, PASSWORD_BCRYPT);
                $objeto->contraseña = $crypt;
            }

            // Consulta SQL para usuarios
            $vSql = "INSERT INTO usuarios (correo_electronico, nombre_completo, identificacion, direccion_Provincia, direccion_Canton, direccion_Distrito, telefono, contraseña, tipo_usuario) " .
                "VALUES ('$objeto->correo_electronico', '$objeto->nombre_completo', '$objeto->identificacion', '$objeto->direccion_Provincia', '$objeto->direccion_Canton', '$objeto->direccion_Distrito', '$objeto->telefono', '$objeto->contraseña', '$objeto->tipo_usuario')";

            // Ejecutar la consulta
            $vResultado = $this->enlace->execute($vSql);

            // Si la consulta se ejecutó correctamente
            if ($vResultado) {
                // Consulta SQL para wallet
                $vSqlWallet = "INSERT INTO wallet(usuario, saldo, totalCanjeado, totalRecibidos) " .
                    "VALUES ('$vResultado', '$objeto->saldo', '$objeto->totalCanjeado', '$objeto->totalRecibidos')";

                // Ejecutar la consulta
                $this->enlace->execute($vSqlWallet);

                // Confirmar la transacción

            } 
        } catch (Exception $e) {


            throw $e;
        }
    }

    

}