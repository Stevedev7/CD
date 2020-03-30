const Lex = require('./Lex');
const fileName = process.argv[2];

var lex = new Lex(fileName);

var data = lex.getContent();

var tk = lex.tokenise();
console.log(tk);
