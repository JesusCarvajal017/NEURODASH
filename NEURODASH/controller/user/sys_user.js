class Sys_usuario{
    _idUser = "";
    _response; 


    constructor(){

    }
    

    cerrarSession(){
        // this._idUser = true;
        fetch('../model/public/cerrarSession.php')
        .then(respose => respose.json())
        .then(data =>{
            alert(data[0].session);
        })
    }


    infoUser(){

    }

    notifiaciones(){

    }











}