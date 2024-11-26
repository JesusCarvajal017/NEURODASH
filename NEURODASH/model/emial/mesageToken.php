<?php

    class MensaggeToken{
        private $token;
        private $mensagge;


        public function mesaggeToken($token){

            $this->token =  str_split(strval($token));            

            $this->mensagge = '<h1>¡HOLA SOY NEURODASH!</h1>
                                <h4>Necesitas este codigo para validar tu correo electronico:</h4>
                                 <table>
                                    <tr>
                                        <td style="font-size: 20px; margin: 5px; width: 60px; height: 60px; border: 1px solid; border-radius: 8px; text-align: center;">'.$this->token[0].'</td>
                                        <td style="font-size: 20px; margin: 5px; width: 60px; height: 60px; border: 1px solid; border-radius: 8px; text-align: center;">'.$this->token[1].'</td>
                                        <td style="font-size: 20px; margin: 5px; width: 60px; height: 60px; border: 1px solid; border-radius: 8px; text-align: center;">'.$this->token[2].'</td>
                                        <td style="font-size: 20px; margin: 5px; width: 60px; height: 60px; border: 1px solid; border-radius: 8px; text-align: center;">'.$this->token[3].'</td>
                                    </tr>
                                </table>';

            return $this->mensagge;
        }
    }



?>