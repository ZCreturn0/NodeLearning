require('shelljs/global');

exec('node test.js aaa bbb', (status, output) => {
    console.log(status);
    console.log(output);
});