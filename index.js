// step 1
const express = require("express");
const app = new express();
const fs = require('fs');
app.use(express.json());
const logger = require('morgan');
app.use(logger('dev'));
const data = require('./dataset.json');

app.get('/hospital', (req, res) => {
    res.send(data);
});

app.post('/hospital', (req, res) => {
    data.push(req.body);
    fs.writeFile('dataset.json', JSON.stringify(data), (err, resp) => {
        if (err) {
            res.send("Data cannot be written");
        }
        else {
            res.send("Data written successfully");
        }
    })
});
app.put('/hospital/:name', (req, res) => {
    let name = req.params.name;
    data.forEach((item) => {
        if (item.HospitalName == name) {
            item.PatientCount = req.body.PatientCount;
            item.HospLocation = req.body.HospLocation;
        }
    })
    fs.writeFile('dataset.json', JSON.stringify(data), (err, resp) => {
        if (err) { res.send("Data could not be updated") }
        else { res.send("Data updated") }
    })

});

app.delete('/hospital/:name', (req, res) => {
    let name = req.params.name

    let value = data.filter(item => item.HospitalName !== name);
    fs.writeFile('dataset.json', JSON.stringify(value), (err, resp) => {
        if (err) {
            res.send("Data cannot be deleted")
        }
        else {
            res.send("Data deleted")
        }
    })
});

app.listen(4333);
console.log("Server listening to port 4333");

