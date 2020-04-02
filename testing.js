const fs = require('fs');

const tokens = [
    {
        token: "BEGIN",
        value: /BEGIN|begin/,
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
    let x = tokens.find(token => current.match(token.value));
    if(x){
        x.index = index;
        x.value = c;
        x.lineNo = line;
        if (data.charAt(j) == "\n") {
            index = 0;
            line ++;
        } else {
            index =  j + 1;
        }
        console.log(x);
        c = "";
    }
}
while(i < data.length){
    let currentChar = data.charAt(i);
    if (currentChar == " " || currentChar == "\n") {
        getToken(c, i);
    }else if (currentChar == "," || currentChar == "(" || currentChar == ")" || currentChar == ";") {
        getToken(c, i);
        getToken(currentChar, i);
    }else {
        c += currentChar;
    }
    i++;
}
