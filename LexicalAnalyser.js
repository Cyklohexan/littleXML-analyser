/**
 * Created by Thomas on 23.11.2016.
 */

class LexicalAnalyser {

    constructor(text) {
        this.text = text;
    }

    analyze() {
        const textLength = this.text.length;
        let parsedText = '';

        for(var i = 0; i < textLength; i++) {

            if (this.text[i] !== '?') {
                parsedText += this.text[i];
            }
            else {

                //for xml version declaration we chose '#' character
                if ((this.text[i + 1] === 'x') && (textLength - i > 12)) {
                    let substring = this.text.substring(i, i + 12);
                    if (substring === '?xmlversion=') {
                        parsedText += '#';
                        i += 11;
                    }
                }
                //for declaration closing tag we chose '@' character
                else if ((this.text[i + 1] === '>')&& (textLength - i > 2)){
                    let substring = this.text.substring(i, i + 2);
                    if (substring === '?>') {
                        parsedText += '@';
                        i += 1;
                    }
                }
                else {
                    parsedText += this.text[i];
                }
            }

        }

        return parsedText;
    }

}