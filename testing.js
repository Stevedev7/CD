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
//
// var c = "";
// var tk = [];
//
//
// var index = 0, line = 1;
// const getToken = (current) =>{
//     if (current == "(" || current == ")") {
//         let x = {
//             token: current == "(" ? "OPENPARANTHESIS" : "CLOSEDPARANTHESIS",
//             value: current,
//             index: index,
//             lineNo: line
//         };
//         console.log(x);
//     } else {
//         let x = tokens.find(token => current.match(token.value));
//         if (x) {
//             x.index = index;
//             x.value = current;
//             x.lineNo = line;
//             console.log(x);
//         }
//     }
// }
// for (var i = 0; i < data.length; i++) {
//     let currentChar = data.charAt(i);
//     if (currentChar == " " || currentChar == "\n") {
//         getToken(c);
//         index =  i + 1;
//         if (currentChar == "\n") {
//             index = 0;
//             line ++;
//         }
//         c = "";
//     }else if (currentChar == "," || currentChar == "(" || currentChar == ")" || currentChar == ";") {
//         if (c.length != 0) {
//             getToken(c);
//             index++;
//             c = "";
//         }
//         getToken(currentChar);
//         index++;
//     }else {
//         c += currentChar;
//     }
// }

var charString = "",
    ind = 0,
    lin = 1;

// const makeObj = (val) => {console.log(`Obj made, ${val}`);}

const makeObj = (current) =>{
    if (current == "(" || current == ")") {
        let x = {
            token: current == "(" ? "OPENPARANTHESIS" : "CLOSEDPARANTHESIS",
            value: current,
            index: ind,
            lineNo: lin
        };
        console.log(x);
        // tk.push(x);
    } else {
        let x = tokens.find(token => current.match(token.value));
        if (x) {
            x.index = ind;
            x.value = current;
            x.lineNo = lin;
            console.log(x);
            // tk.push(x);
        }
    }
    return true;
}

const whiteSpace = (j) => {
    while(data.charAt(j) != " " && j < data.length){
        j++;
    }
    return --j;
}

for (var i = 0; i < data.length; i++) {
    let cur = data.charAt(i);
    if (cur == " ") {
        if(charString.length != 0){
            makeObj(charString);
            charString = "";
            ind += charString.length;
        }
        makeObj(cur);
        ind += charString.length;
    }else if (cur == "\n") {
        if (charString.length != 0) {
            makeObj(charString);
            ind++;
            charString = "";
        }
        makeObj(cur);
        lin++;
        ind = 0;
    } else if (cur == ",") {
        if (charString.length != 0) {
            console.log("charsring " + charString);

            if (makeObj(charString)) {
                console.log("made");
            }
            console.log(cur);
            charString = "";
            ind++;
        }
        makeObj(cur);
        ind++;
    } else if (cur == "(" || cur == ")") {
        if (charString.length != 0) {
            makeObj(charString);
            ind++;
            charString = "";
        }
        makeObj(cur);
    }else if (cur == ";") {
        if (charString.length != 0) {
            makeObj(charString);
            ind++;
            charString = "";
        }
        makeObj(cur);
    } else {
        charString += cur;
    }
}

// console.log(tk);
