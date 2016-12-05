/**
 * Created by Thomas on 5.12.2016.
 */

class SyntaxParser {

    constructor( rules, shifts ) {

        this.rules = rules;
        this.shifts = shifts;

        this.inputStack = [];
        this.parsingStack = [];

    }

    initializeStacks( tokens ) {

        //initialize parsing Stack with ending character - # and first rule
        this.parsingStack.push('#');
        this.parsingStack.push('XMLDOCUMENT');

        //initialize input stack with token array returned from lexical analyzer
        for( var i = tokens.length - 1; i >= 0; i--) {
            this.inputStack.push(tokens[i]);
        }

    }

    checkSyntax() {
        var outputArea = document.getElementById("output-area");

        while ((this.inputStack.length !== 0) && (this.parsingStack.length !== 0)) {

            outputArea.value += 'Input: ';
            for(var y = this.inputStack.length - 1; y>= 0; y--){
                outputArea.value += this.inputStack[y].key + ' ';
            }
            outputArea.value += '\n';

            outputArea.value += 'Stack: '
            for(var z = this.parsingStack.length - 1; z>= 0; z--){
                console.log(this.parsingStack[z]);
                outputArea.value += this.parsingStack[z] + ' ';
            }
            outputArea.value += '\n';



            let actualNonTerminal = this.parsingStack.pop();
            let actualToken = this.inputStack[this.inputStack.length - 1].key;

            if (actualNonTerminal === 'EPSILON') {
                continue;
            }

            const ruleRank = this.shifts.shiftsObj[actualNonTerminal].shifts[actualToken];
            if (!ruleRank) {
                return false;
            }

            if (ruleRank === 'A') {
                outputArea.value += 'Accepting input \n';
                this.inputStack.pop();
                break;
            }
            else if (ruleRank === 'z') {
                outputArea.value += 'Consume token from input \n';
                this.inputStack.pop();
            }
            else {
                const selectedRule = this.rules.rulesObj[ruleRank];
                outputArea.value += 'Using rule number: ' + ruleRank + ', ' + selectedRule.leftSide + ' -> ';
                for (var i = selectedRule.rightSide.length - 1; i >= 0; i--) {
                    outputArea.value += selectedRule.rightSide[i] + ' ';
                    this.parsingStack.push(selectedRule.rightSide[i]);
                }
                outputArea.value += '\n';
            }

            for(var t = 0; t < 175; t++){
                outputArea.value += '-';
            }
            outputArea.value += '\n';

        }

        const inputStackIsEmpty = this.inputStack.length;
        const parsingStackIsEmpty = this.parsingStack.length;

        return (!inputStackIsEmpty && !parsingStackIsEmpty) ? true : false;

    }

}