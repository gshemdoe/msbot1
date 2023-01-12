const express = require('express')
const router = express.Router()
const request = require('request')

router.post('/webhook', async (req, res) => {
    let body = req.body;

    console.log(`\u{1F7EA} Received webhook:`);
    console.dir(body, { depth: null });

    // Send a 200 OK response if this is a page webhook

    if (body.object === "page") {
        //iterate each entry -- there may be multiple entries
        for (let entry of body.entry) {
            let webhook_event = entry.messaging[0]
            console.log(webhook_event)

            let sender_psid = webhook_event.sender.id
            console.log('Sender ID is: ' + sender_psid)

            //check if its message or postback
            if (webhook_event.message) {
                handleMessage(sender_psid, webhook_event.message)
            } else if (webhook_event.postback) {
                handlePostback(sender_psid,)
            }
        }
        // Returns a '200 OK' response to all requests
        res.status(200).send("EVENT_RECEIVED");
    } else {
        // Return a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
    }
})

router.post('/mama', async (req, res) => {
    let message = 'Nakutafuta hapa https://gsb.co.tz/register'

    sendMessage('9482901285060706', message)
})




// Handles messages events
function handleMessage(sender_psid, received_message) {
    let response;

    // Check if the message contains text
    if (received_message.text) {

        // Create the payload for a basic text message
        response = {
            "text": `You sent the message: "${received_message.text}". Now send me an image!`
        }
    }

    // Sends the response message
    callSendAPI(sender_psid, response);
}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {

}

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
    }

    // Send the HTTP request to the Messenger Platform

    request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
        "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('message sent')
        } else {
            console.error("Unable to send message:" + err);
        }
    });
}

function sendMessage(s_psid, message) {
    // Construct the message body
    let request_body = {
        "messaging_type": "MESSAGE_TAG",
        "tag": "ACCOUNT_UPDATE",
        "recipient": {
            "id": s_psid
        },
        "message": message
    }

    // Send the HTTP request to the Messenger Platform

    request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
        "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('message sent')
        } else {
            console.error("Unable to send message:" + err);
        }
    });
}

module.exports = router