const fs = require('fs');

const tokens = [
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

var data = fs.readFileSync("test.md", "utf8");

var i = 0;
var c = "";
var tk = [];

var obj = {
    token: null,
    value: null,
    index: null
}
var index = 0, line = 1;
const getToken = (current, j) =>{
    if (current == "(" || current == ")") {
        let x = {
            token: current == "(" ? "OPENPARANTHESIS" : "CLOSEDPARANTHESIS",
            value: current,
            index: index,
            lineNo: line
        };
        console.log(x);
    } else {
        let x = tokens.find(token => current.match(token.value));
        if (x) {
            x.index = index;
            x.value = current;
            x.lineNo = line;
            console.log(x);
        }
    }
}
while(i < data.length){
    let currentChar = data.charAt(i);
    if (currentChar == " " || currentChar == "\n") {
        getToken(c, i);
        index =  i + 1;
        if (currentChar == "\n") {
            index = 0;
            line ++;
        }
        c = "";
    }else if (currentChar == "," || currentChar == "(" || currentChar == ")" || currentChar == ";") {
        getToken(c, i);
        c = "";
        getToken(currentChar, i);
    }else {
        c += currentChar;
    }
    i++;
}
