const fs = require('fs');

class Lex {
    constructor(fileName) {
        this.fileName = fileName;
        this.tokens = [
            {
                token: "BEGIN",
                value: /BEGIN|begin/,
                index: null,
                lineNo: null
            },
            {
                token: "MAIN",
                value: /MAIN|main/,
                index: null,
                lineNo: null
            },
            {
                token: "IF",
                value: /IF|if/,
                index: null,
                lineNo: null
            },
            {
                token: "END",
                value: /END|end/,
                index: null,
                lineNo: null
            },
            {
                token: "PRINT",
                value: /PRINT|print/,
                index: null,
                lineNo: null
            },
            {
                token: "TYPE",
                value: /CHAR|char|INT|int|FLOAT|float/,
                index: null,
                lineNo: null
            },
            {
                token: "NUMBER",
                value: /[0-9]+/,
                index: null,
                lineNo: null
            },
            {
                token: "ID",
                value: /[a-zA-Z_][a-zA-Z0-9_]*/,
                index: null,
                lineNo: null
            },
            {
                token: "ASSIGNMENT",
                value: /\+=|-=|\*=|\/=/,
                index: null,
                lineNo: null
            },
            {
                token: "OPERATOR",
                value: /\+|-|\*|\//,
                index: null,
                lineNo: null
            },
            {
                token: "RELOP",
                value: />|>=|<|<=|!=|==/,
                index: null,
                lineNo: null
            },
            {
                token: "LOGICAL",
                value: /&&|\|\||!/,
                index: null,
                lineNo: null
            },
            {
                token: "WHITESPACE",
                value: /[ \t]+/,
                index: null,
                lineNo: null
            },
            {
                token: "NEWLINE",
                value: /\n/,
                index: null,
                lineNo: null
            },
            {
                token: "SEMICOLON",
                value: /;/,
                index: null,
                lineNo: null
            },
            {
                token: "COMMA",
                value: /,/,
                index: null,
                lineNo: null
            },
            {
                token: "OPENPARANTHESIS",
                value: /\(/,
                index: null,
                lineNo: null
            },
            {
                token: "CLOSEDPARANTHESIS",
                value: /\)/,
                index: null,
                lineNo: null
            },
            {
                token: "OTHER",
                value: /.\+/,
                index: null,
                lineNo: null
            }
        ];
    }
    getContent(){
        return(fs.readFileSync(this.fileName, "utf8"));
    }
    tokenise(){
        var data = this.getContent();
        var tokenisedData = [];
        let current = "";
        var i = 0;
        var line = 1;
        var index = 0;
        const getToken = (currentString, j) =>{
            if (currentString == "(" || currentString == ")") {
                let x = {
                    token: currentString == "(" ? "OPENPARANTHESIS" : "CLOSEDPARANTHESIS",
                    value: currentString,
                    index: index,
                    lineNo: line
                };
                tokenisedData.push(x);
                console.log(x);
            } else {
                let x = this.tokens.find(token => currentString.match(token.value));
                if (x) {
                    x.index = index;
                    x.value = currentString;
                    x.lineNo = line;
                    tokenisedData.push(x);
                    console.log(x);
                }
            }
        }
        while(i < data.length){
            let currentChar = data.charAt(i);
            if (currentChar == " " || currentChar == "\n") {
                getToken(current, i);
                index =  i + 1;
                if (currentChar == "\n") {
                    index = 0;
                    line ++;
                }
                current = "";
            }else if (currentChar == "," || currentChar == "(" || currentChar == ")" || currentChar == ";") {
                getToken(current, i);
                current = "";
                getToken(currentChar, i);
            }else {
                current += currentChar;
            }
            i++;
        }
        return tokenisedData;
    }
}
module.exports = Lex;
