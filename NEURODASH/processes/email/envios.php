<?php

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;

    require 'mesageToken.php';

    class Envio extends MensaggeToken{
        // configuraciones de envio
        private $host;
        private $port;
        private $sujeto;
        private $sys_email;
        private $password;

        // destinatario de envio
        private $mensaje;
        private $objetivo;
        private $user_email;
        private $user_name;


        public function __construct($email_user, $name_user){
            require 'config_email.php';
            
            // configuraciones de envio
            $this->host = $HOST;
            $this->port = $PORT;
            $this->sys_email = $SYS_EMAIL;
            $this->password = $PASSWORD_APP;
            $this->sujeto = $SUJETO;

             // destinatario de envio
            $this->user_email = $email_user;
            $this->user_name = $name_user;
            $this->objetivo = $OBJETIC;
        }


        public function sendToken($token){
            require '../../PHPMailer/Exception.php';
            require '../../PHPMailer/PHPMailer.php';
            require '../../PHPMailer/SMTP.php';
        
            $mail = new PHPMailer(true);
        
            try {
                //Server settings
                $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      
                $mail->isSMTP();                                                      
                $mail->Host       = $this->host;                      
                $mail->SMTPAuth   = true;                                  
                $mail->Username   = $this->sys_email;                             
                $mail->Password   = $this->password;                            
                
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;           
                $mail->Port       = $this->port;                                       
        
                //Recipients
                $mail->setFrom($this->sys_email, $this->sujeto);
                $mail->addAddress($this->user_email, $this->user_name);     
        
        
                //Content
                $mail->isHTML(true);                                  
                $mail->Subject = $this->objetivo;
                $mail->Body    = $this->mesaggeToken($token);
                $mail->AltBody = '00';
        
                $mail->send();
                // echo 'Correo eviado exitosamente';
            } catch (Exception $e) {
                echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
            }
        }


    }






?>