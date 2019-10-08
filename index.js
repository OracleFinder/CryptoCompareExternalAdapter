let request = require('request');

let handle = (data, callback) => {
    let url = "https://min-api.cryptocompare.com/data/";
    url = url + data.endpoint;
    let requestObj;

    switch (data.endpoint) {
        case "price":
            requestObj = {
                fsym: data.fsym,
                tsyms: data.tsyms
            };
            break;
        case "pricemulti":
        case "pricemultifull":
            requestObj = {
                fsyms: data.fsyms,
                tsyms: data.tsyms
            };
            break;
        case "generateAvg":
            requestObj = {
                fsym: data.fsym,
                tsym: data.tsym,
                e: data.exchange
            };
            break;
        default:
            requestObj = {
                fsym: data.fsym,
                tsyms: data.tsyms
            };
            break;
    }

    let options = {
        url: url,
        qs: requestObj,
        json: true
    };

    request(options, (error, response, body) => {
        if (error || response.statusCode >= 400 || ("Response" in body && body["Response"] === "Error")) {
            callback(response.statusCode, {
                jobRunID: data.id,
                status: "errored",
                error: error
            });
        } else {
            let resp = body;
            if (data.endpoint === "price")
                resp.result = resp[data.tsyms];

            callback(response.statusCode, {
                jobRunID: data.id,
                data: body
            });
        }
    });
};

exports.handler = (event, context, callback) => {
    let data = {
        id: event.id,
        endpoint: event.data.endpoint || "",
        fsyms: event.data.fsyms || "",
        fsym: event.data.coin || event.data.fsym || "",
        tsyms: event.data.market || event.data.tsyms || "",
        tsym: event.data.tsym || "",
        exchange: event.data.exchange || ""
    };

    handle(data, (statusCode, responseData) => {
        callback(null, responseData);
    });
};

exports.gcpservice = (req, res) => {
    let data = {
        id: req.body.id,
        endpoint: req.body.data.endpoint || "price",
        fsyms: req.body.data.fsyms || "",
        fsym: req.body.data.coin || req.body.data.fsym || "",
        tsyms: req.body.data.market || req.body.data.tsyms || "",
        tsym: req.body.data.tsym || "",
        exchange: req.body.data.exchange || ""
    };

    handle(data, (statusCode, responseData) => {
        res.status(statusCode).send(responseData);
    });
};

module.exports.createRequest = handle;
