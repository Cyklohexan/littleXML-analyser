/**
 * Created by Thomas on 23.11.2016.
 */

$(document).ready( function() {
    const button = $('#magic');

    var rulesObj = new Rules('rules.json');
    var shiftsObj = new Shifts('tableShifts.json');


    button.click(function() {
        const area = $('#input-area')[0];

        rulesObj.convertToObject();
        shiftsObj.convertToObject();
        console.log(rulesObj);
        console.log(shiftsObj);

        console.log(area.value);
        var analyzer = new LexicalAnalyser(area.value);
        var result = analyzer.analyze();

        result.tokens.forEach( (token) => {
            console.log(token.key + '  ..  ' + token.value);
        });

        result.errors.forEach( (error) => {
            console.log(error.text + error.position + '.');
        });


    });

    console.log('Hello from Thomas and Jakub');
});

