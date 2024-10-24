<?php

    $sys_email = 'olpierjesusfernud@gmail.com';
    $password_app = 'zpuh xvrr iphy vrbq';
    // $password_app = 'feb3c355162c22';
    
    $email_user = $_POST['user_email'];
    $name_user = $_POST['defaul_sys'];
    $contenido_email = $_POST['user_contenido'];

    //Import PHPMailer classes into the global namespace
    //These must be at the top of your script, not inside a function
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;


    require '../PHPMailer/Exception.php';
    require '../PHPMailer/PHPMailer.php';
    require '../PHPMailer/SMTP.php';


    //Create an instance; passing `true` enables exceptions
    $mail = new PHPMailer(true);

    try {
        //Server settings
        $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
        $mail->isSMTP();                                            //Send using SMTP                    //Set the SMTP server to send through
        $mail->Host       = 'smtp.gmail.com';                       //Set the SMTP server to send through
        $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
        $mail->Username   = $sys_email;                             //SMTP username
        $mail->Password   = $password_app;                              //SMTP password
        
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;            //Enable implicit TLS encryption
        $mail->Port       = 587;                                        //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

        //Recipients
        $mail->setFrom($sys_email, 'NEURODASH');
        $mail->addAddress($email_user, $name_user);     //Add a recipient


        //Content
        $mail->isHTML(true);                                  //Set email format to HTML
        $mail->Subject = 'Validacion de Emai';
        $mail->Body    = '
                        <h1>¡HOLA SOY NEURODASH!</h1>
                        <h4>Necesitas este codigo para validar tu correo electronico:</h4>
                         <table>
                            <tr>
                                <td style="font-size: 20px; margin: 5px; width: 60px; height: 60px; border: 1px solid; border-radius: 8px; text-align: center;">3</td>
                                <td style="font-size: 20px; margin: 5px; width: 60px; height: 60px; border: 1px solid; border-radius: 8px; text-align: center;">3</td>
                                <td style="font-size: 20px; margin: 5px; width: 60px; height: 60px; border: 1px solid; border-radius: 8px; text-align: center;">3</td>
                                <td style="font-size: 20px; margin: 5px; width: 60px; height: 60px; border: 1px solid; border-radius: 8px; text-align: center;">3</td>
                            </tr>
                        </table>';
        $mail->AltBody = '311901010';

        $mail->send();
        echo 'Correo eviado exitosamente';
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }

?>