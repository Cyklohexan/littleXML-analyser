class Shifts{

    constructor(filename){
        $.getJSON(filename, (json) => {
            this.shifts = json;
        });
    }

}