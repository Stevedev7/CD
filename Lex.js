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
                token: "END",
                value: /END|end/,
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
                value: /\+=|-=|\*=|\/=|=/,
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
                value: /==|>|>=|<|<=|!=/,
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
                token: "OTHER",
                value: /.+/,
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
        var line = 0;
        var index = -1;
        for(var i = 0; i < data.length; i++){
            for (var j = i; j < data.length; j++) {
                if(data.charAt(i) != " "){
                    current += data.charAt(j);
                } else if (data.charAt(j) == "\n") {
                    index = 0;
                    line++;
                    break;
                }else {
                    while(data.charAt(j) == " ") {
                        j++;
                    }
                    let newObj = this.tokens.find(token => current.match(token.value));
                    newObj.index = index;
                    newObj.lineNo = line;
                    tokenisedData.push(newObj);
                    i = j;
                }

            }
        }
        return tokenisedData;
    }
}
module.exports = Lex;
