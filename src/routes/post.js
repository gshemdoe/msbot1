const express = require('express')
const router = express.Router()

router.post('/webhook', async (req, res) => {
    let body = req.body;

    console.log(`\u{1F7EA} Received webhook:`);
    console.dir(body, { depth: null });

    // Send a 200 OK response if this is a page webhook

    if (body.object === "page") {
        //iterate each entry -- there may be multiple entries
        for(let entry of body.entry) {
            let webhook_event = entry.messaging[0]
            console.log(webhook_event)

            let sender_psid = webhook_event.sender.id
            console.log('Sender ID is: '+ sender_psid)
        }
        // Returns a '200 OK' response to all requests
        res.status(200).send("EVENT_RECEIVED");
    } else {
        // Return a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
    }
})

module.exports = router