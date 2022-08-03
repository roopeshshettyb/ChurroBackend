const Client = require("node-rest-client").Client;
const client = new Client();

module.exports = (subject, content, recepients, requester) => {

    const reqBody = {
        subject: subject,
        recepientEmails: recepients,
        content: content,
        requester: requester
    }

    const reqHeader = { "Content-Type": "application/json" }

    const args = { data: reqBody, headers: reqHeader }

    try {
        client.post("http://localhost:8080/notiserv/api/v1/notifications", args, (data, res) => {
            console.log("Request sent");
            console.log(args)
        })
    } catch (err) { console.log(err.message); }
}