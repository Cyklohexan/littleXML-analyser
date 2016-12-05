/**
 * Created by Thomas on 23.11.2016.
 */

$(document).ready( function() {
    const button = $('#magic');

    var rulesObj = new Rules('data/rules.json');
    var shiftsObj = new Shifts('data/tableShifts.json');


    button.click(function() {
        const area = $('#input-area')[0];

        rulesObj.convertToObject();
        shiftsObj.convertToObject();

        var analyzer = new LexicalAnalyser(area.value);
        var result = analyzer.analyze();

        //prompt all lexical errors to console after lexical analysis is done
        result.errors.forEach( (error) => {
            console.log(error.text + error.position + '.');
        });

        var syntaxParser = new SyntaxParser(rulesObj, shiftsObj);
        syntaxParser.initializeStacks(result.tokens);

        const parsingResult = syntaxParser.checkSyntax();

        console.log('Result of syntax and lexical analysis: ' + parsingResult);
    });

    console.log('Hello from Thomas and Jakub');
});

