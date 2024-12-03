<?php
    // require '';

    class Salas{
        private $sala;
        private $cxion;
        // private $

        public function __construct(){
            $this->cxion = Conexion::getInstance();
        }

        public function jugadoresSla($id_sala){
            $sql = "SELECT 
                        sla_creater,
                        sla_privadaid, 
                        sla_jug_id,
                        user_name,
                        usuario.user_exp,
                        avatars.img_avatar,
                        salajugadores.user_id
                    FROM public.salajugadores	
                    INNER JOIN public.usuario
                        ON salajugadores.user_id = usuario.user_id
                    INNER JOIN public.avatars
                        ON usuario.avatarid = avatars.id_avatar
                    WHERE sla_privadaid = :id_sala_list
                    ORDER BY sla_creater DESC";

            $values = [
                ":id_sala_list" => $id_sala
            ];

            $informacion_sala = $this->cxion->consultaIndividual($sql, $values);

            return $informacion_sala;
            
        }

        public function allSala(){
            $sql = "SELECT 
                        cfg_salaid, 
                        cfg_cantidadjugadores, 
                        mdo_nombre, 
                        nvel_nombre, 
                        sla_token,
                        usuario.user_name, 
                        sla_estado,
                        configsala.sla_privadaid AS id_sala,
                        (SELECT COUNT(*) 
                        FROM salajugadores 
                        WHERE salajugadores.sla_privadaid = configsala.sla_privadaid) AS jugadores
                    FROM public.configsala
                    INNER JOIN public.niveles
                        ON configsala.nvl_id = niveles.nvel_id
                    INNER JOIN public.modojuego
                        ON configsala.mdo_id = modojuego.mdo_juegoid
                    INNER JOIN public.salasprivadas
                        ON configsala.sla_privadaid = salasprivadas.sla_privadaid
                    INNER JOIN public.usuario
                        ON salasprivadas.user_id = usuario.user_id;";

            $informacion_sala = $this->cxion->consultar($sql);

            return $informacion_sala;
        }

        public function salavigen($id_sala){
            $sql = "SELECT 
                        cfg_salaid, 
                        cfg_cantidadjugadores, 
                        mdo_nombre, 
                        nvel_nombre, 
                        sla_token,
                        usuario.user_name, 
                        sla_estado,
                        configsala.sla_privadaid AS id_sala,
                        (SELECT COUNT(*) 
                        FROM salajugadores 
                        WHERE salajugadores.sla_privadaid = configsala.sla_privadaid) AS jugadores
                    FROM public.configsala
                    INNER JOIN public.niveles
                        ON configsala.nvl_id = niveles.nvel_id
                    INNER JOIN public.modojuego
                        ON configsala.mdo_id = modojuego.mdo_juegoid
                    INNER JOIN public.salasprivadas
                        ON configsala.sla_privadaid = salasprivadas.sla_privadaid
                    INNER JOIN public.usuario
                        ON salasprivadas.user_id = usuario.user_id
                    WHERE salasprivadas = :id_sala;";

            $values = [
                ":id_sala" => $id_sala
            ];

            $informacion_sala = $this->cxion->consultaIndividual($sql, $values);

            return $informacion_sala;
        }

        public function allAvatar(){
            $sql = "SELECT 
                        id_avatar, 
                        img_avatar          
                    FROM avatars";
              $informacion_avatar = $this->cxion->consultar($sql);

            return $informacion_avatar;
        }

        public function statusSala($id_sala){
            $sql = "SELECT sla_privadaid, user_id, sla_token, sla_estado
                        FROM public.salasprivadas
                    WHERE sla_privadaid = :id_sala";
            $values = [
                ":id_sala" => $id_sala
            ]; 

            $informacion_avatar = $this->cxion->consultaIndividual($sql, $values);

            return $informacion_avatar;
        }
    }

?>
