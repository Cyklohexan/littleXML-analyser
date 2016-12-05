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

        while ((this.inputStack.length !== 0) && (this.parsingStack.length !== 0)) {

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
                this.inputStack.pop();
                break;
            }
            else if (ruleRank === 'z') {
                this.inputStack.pop();
            }
            else {
                const selectedRule = this.rules.rulesObj[ruleRank];

                for (var i = selectedRule.rightSide.length - 1; i >= 0; i--) {
                    this.parsingStack.push(selectedRule.rightSide[i]);
                }
            }

        }

        const inputStackIsEmpty = this.inputStack.length;
        const parsingStackIsEmpty = this.parsingStack.length;

        return (!inputStackIsEmpty && !parsingStackIsEmpty) ? true : false;

    }

}