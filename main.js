/**
 * Created by Thomas on 23.11.2016.
 */

$(document).ready( function() {
    const button = $('#magic');

    var rulesObj = new Rules('data/rules.json');
    var shiftsObj = new Shifts('data/tableShifts.json');
    var outputArea = document.getElementById("output-area")


    button.click(function() {
        const area = $('#input-area')[0];

        outputArea.value = '';

        rulesObj.convertToObject();
        shiftsObj.convertToObject();

        var analyzer = new LexicalAnalyser(area.value);
        var result = analyzer.analyze();

        //prompt all lexical errors to console after lexical analysis is done
        result.errors.forEach( (error) => {
            outputArea.value+= error.text + error.position + '.\n';
        });

        var syntaxParser = new SyntaxParser(rulesObj, shiftsObj);
        syntaxParser.initializeStacks(result.tokens);

        const parsingResult = syntaxParser.checkSyntax();

        outputArea.value += 'Result of syntax and lexical analysis: ' + parsingResult + '\n';
    });

    console.log('Hello from Thomas and Jakub');
});

