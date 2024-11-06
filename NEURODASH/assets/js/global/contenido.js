class DOMNeurodash{    
    _styles = {};
    _scripts = {};

    constructor(){

    }

    fileScript(src){
        const script = document.createElement('script');

        // Configurar los atributos del elemento <script>
        script.src = src;
        script.type = "module";
    
        document.body.appendChild(script);
    }

    fileStyle(href){
        const link = document.createElement('link');

        // Configurar los atributos del elemento <link>
        link.rel = 'stylesheet';
        link.href = href;
        link.type = 'text/css';
    
        document.head.appendChild(link);
    }

    chargerScripts(url){
        let scripts = this._styles[url].script;

        
    }
    
    chargerStyle(url){
        let scripts = this._styles[url].script;
        
    }

}

export default DOMNeurodash;