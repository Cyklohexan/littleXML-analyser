class Rules{

    constructor(filename){
        $.getJSON(filename, (json) => {
            this.rules = json;
        });
    }

}