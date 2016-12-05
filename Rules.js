class Rules{

    constructor(filename) {
        this.rulesArr;
        this.rulesObj;

        $.getJSON(filename, (json) => {
            this.rulesArr = json.rules;
        });
    }

    convertToObject() {
        this.rulesObj = _.keyBy(this.rulesArr, (rule) => {
            return rule.rank;
        });
    }

}