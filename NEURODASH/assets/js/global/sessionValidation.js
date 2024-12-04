import DataExtraction from './peticiones.js';

class SessionValidation{
    _id_user;
    _nevelFile = ""; 
    _comunicador;

    constructor(fileNevel, path){
        this._comunicador = new DataExtraction();
        this._nevelFile = fileNevel;
        this._ruta = path;
    }

    async sessionActive(){
        let data = await this._comunicador.receptorData(`${this._nevelFile}model/public/data.php`);
        
        if(!data.session){
            window.location = this._ruta;
        }else{
            return;
        }
    }
    
    async infoSession(){
        let data = await this._comunicador.receptorData(`${this._nevelFile}model/public/sessionUses.php`);

        if(data.id_usuario){
            return data;
        }else{
            this.sessionActive();
        }
    }

}

export default SessionValidation;