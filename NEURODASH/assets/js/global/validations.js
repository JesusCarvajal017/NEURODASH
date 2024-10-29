class ValidationDash{  
    _formatEmial = "";
    _formatPassword = "";
    _validation;
    
    constructor(){
        this._formatEmial =  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        this._formatPassword = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    }

    validationEmail(emial){
        this._validation = this._formatEmial.test(emial);
        return this._validation;
    }

    correct(input){
        input.classList.add('yes-valid');
        input.classList.remove('no-valid');
    }

    incorrect(input){
        input.classList.add('no-valid');
        input.classList.remove('yes-valid');
    }
}

export default ValidationDash; 