class Shifts{

    constructor(filename){
        this.shiftsArr;
        this.shiftsObj;

        $.getJSON(filename, (json) => {
            this.shiftsArr = json.table;
        });
    }

    convertToObject() {
        this.shiftsObj = _.keyBy(this.shiftsArr, (shift) => {
            return shift.leftSide;
        });
    }

}