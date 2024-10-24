class Loader{
    _lodaer;

    constructor(loader){
        this._lodaer = loader;
    }

    hidde(){
        this._lodaer.style = 'display:none';
    }
    
    show(){
        this._lodaer.style = 'display:block';
    
    }

}


export default Loader;