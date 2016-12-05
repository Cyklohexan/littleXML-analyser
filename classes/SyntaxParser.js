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

}