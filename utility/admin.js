const request = require("request");
require("dotenv").config();

const adminGetEP = "http://localhost/CS312-final-project-admin-php/api/get";
const adminPostEP = "http://localhost/CS312-final-project-admin-php/api/post";
const headers = {
    'x-api-key': process.env.API_KEY,
    // 'Accept': 'application/json',
    // 'Content-Type': 'application/json',
};

function initAdminEvents(id, res){
    const url = adminGetEP + "?user_id= " + id + "&action=GET_EVENTS";
    const options = {
        uri: url,
        method: "GET",
        headers: headers
    };
    request(options, (error, response, body) => {
        toReturn = body;
        res.json(JSON.parse(body))
        return;
    })
};

function sendSimplePostReq(data, res) {
    const options = {
        uri: adminPostEP,
        method: "POST",
        headers: headers,
        body: data
    };
    request(options, (error, response, body) => {
        toReturn = body;
        res.json(body)
        return;
    })
}

module.exports = { initAdminEvents, sendSimplePostReq }
