/**
 * Created by Thomas on 23.11.2016.
 */

class LexicalAnalyser {

    constructor(text) {
        this.text = text;
    }

    getTokenTemplate() {
        var token = {
          key: '',
          value: ''
        };

        return token;
    }

    removeWhiteSpaces(input) {
        var cleanInput = '';

        for(var i = 0; i < input.length; i++) {
            if ((input[i] !== '\n') && (input[i] !== '\t')) {
                cleanInput += input[i];
            }
        }

        return cleanInput;
    }

    analyze() {
        let tokenArray = [];
        let errorArray = [];

        this.text = this.removeWhiteSpaces(this.text);
        const textLength = this.text.length;

        for(var i = 0; i < textLength; i++) {

            let actualCharOrd = this.text[i].charCodeAt(0);
            let token = this.getTokenTemplate();

            if ( ((actualCharOrd >= 97) && (actualCharOrd <= 122)) || ((actualCharOrd >= 65) && (actualCharOrd <= 90)) ) {
                token.key = 'LETTER';
                token.value = this.text[i];

                tokenArray.push(token);
            }
            else if((actualCharOrd >= 48) && (actualCharOrd <= 57)) {
                token.key = 'DIGIT';
                token.value = this.text[i];

                tokenArray.push(token);
            }
            else if (this.text[i] === '(') {
                token.key = 'L_PARENTHES';
                token.value = this.text[i];

                tokenArray.push(token);
            }
            else if (this.text[i] === ')') {
                token.key = 'R_PARENTHES';
                token.value = this.text[i];

                tokenArray.push(token);
            }
            else if (this.text[i] === '<') {
                token.key = 'STARTTAG';
                token.value = this.text[i];

                tokenArray.push(token);
            }
            else if (this.text[i] === '>') {
                token.key = 'ENDTAG';
                token.value = this.text[i];

                tokenArray.push(token);
            }
            else if (this.text[i] === '/') {
                token.key = 'SLASH';
                token.value = this.text[i];

                tokenArray.push(token);
            }
            else if (this.text[i] === ':') {
                token.key = 'COLON';
                token.value = this.text[i];

                tokenArray.push(token);
            }
            else if (this.text[i] === '.') {
                token.key = 'DOT';
                token.value = this.text[i];

                tokenArray.push(token);
            }
            else if (this.text[i] === '-') {
                token.key = 'DASH';
                token.value = this.text[i];

                tokenArray.push(token);
            }
            else if (this.text[i] === '_') {
                token.key = 'UNDER';
                token.value = this.text[i];

                tokenArray.push(token);
            }
            else if (this.text[i] === '?'){

                //for xml version declaration we chose '#' character
                if ((this.text[i + 1] === 'x') && (textLength - i > 12)) {
                    let substring = this.text.substring(i, i + 12);
                    if (substring === '?xmlversion=') {

                        token.key = 'XML_START';
                        token.value = substring;

                        tokenArray.push(token);
                        i += 11;
                    }
                }
                //for declaration closing tag we chose '@' character
                else if ((this.text[i + 1] === '>')&& (textLength - i > 2)){
                    let substring = this.text.substring(i, i + 2);
                    if (substring === '?>') {

                        token.key = 'XML_END';
                        token.value = substring;

                        tokenArray.push(token);

                        i += 1;
                    }
                }
                else {
                    errorArray.push({
                        text: 'Error: Invalid XML document definition at ',
                        position: i
                    });
                }
            }
            else {
                errorArray.push({
                    text: 'Error: Invalid character "' + this.text[i] + '" at ',
                    position: i
                });
            }

        }

        return {
            tokens: tokenArray,
            errors: errorArray
        };
    }

}