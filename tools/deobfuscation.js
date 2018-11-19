const path = require('path');
const fs = require('fs');
const {VM} = require('vm2');
const vm = new VM()
const filename = process.argv[2];
const fn = process.argv[3];
const regexp = /([\w]{3,4})\.([\w]{3,4})\((\d+)\)/g

const jsfile = path.join(process.cwd(), 'src/src', filename + '.js');
const deofile = path.join(process.cwd(), 'src/src', filename + '.deo.js');
const outputfile = path.join(process.cwd(), 'src/src', filename + '.deobfuscation.js');
const source = fs.readFileSync(jsfile).toString();
const deosource = fs.readFileSync(deofile).toString();
vm.run(deosource);


const match = source.match(regexp);
console.log(match.length)
const matchSet = new Set(match);
let output = source;
matchSet.forEach((pattern) => {
    const execpattern = pattern.replace(/[\w]{3,4}/, fn);
    const execRes = vm.run(execpattern);
    pattern = pattern.replace('(', '\\(').replace(')', '\\)')
    console.log(`replacing '${pattern}' with '${execRes}'`)
    output = output.replace(new RegExp(pattern, 'g'), `"${execRes}"`);
})
// console.log(output)

fs.writeFileSync(outputfile, output);