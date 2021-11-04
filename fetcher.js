const request = require('request');
const readline = require('readline');
const fs = require('fs');

const args = process.argv;
const url = args[2];
const filePath = args[3];

request(url, (error, response, body) => { if(error) {
    console.log('invalid url'); // Print the error if one occurred
    //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
}
else {
    //console.log('body:', body); // Print the HTML for the Google homepage.
    console.log("File Size:", body.length);

    //writing to a file after checking if file already exists
    fs.exists(filePath, function (isExist) {
        if (isExist) {
            console.log(`File ${filePath} already exists`);
            var rl = readline.createInterface(
                process.stdin, process.stdout);
            rl.question('Do you want to overwrite? (y/n)', (ans) => {
                if(ans === 'y') {
                //if (ans.match(/^y(es)?$/i)) {
                    //rl.pause(); }
                    console.log("writing");
                    fs.writeFile(filePath, body, (err) => {
                        if (err)
                            console.log(err);
                        else {
                            console.log("File written successfully\n");
                        }});
                        rl.close();
                }
                else {
                    console.log("Try again");
                    rl.close();
                    return;

                }
            });
        } else {
            console.log("Creating a new File:", filePath);
            fs.writeFile(filePath, body, err => {
                if (err) {
                    console.error(err)
                    return
                }
            });
        }
    });
}
});





