/**
 * Created by Thomas on 23.11.2016.
 */

$(document).ready( function() {
    const button = $('#magic');

    button.click(function() {
        const area = $('#input-area')[0];

        console.log(area.value);
        var analyzer = new LexicalAnalyser(area.value);

        console.log(analyzer.analyze());
    });

    console.log('Hello from Thomas and Jakub');
});

