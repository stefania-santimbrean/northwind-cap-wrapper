const {executeHttpRequest} = require ("@sap/cloud-sdk-core");
const {getTestDestinationByAlias} = require("@sap/cloud-sdk-test-util");

const destination = () => {
    let destination;

    if (process.env.CDS_ENV && process.env.CDS_ENV.includes("development")) {
        // Local environment
        destination = getTestDestinationByAlias("Northwind");
    } else {
        destination = {destinationName: "Northwind"};
    }

    return destination;
}

module.exports = (srv) => {
    srv.on("READ", "Order_Subtotals", async (req) => {
        try {
            const {data} = await executeHttpRequest(destination(),
            {
                method: "GET",
                url: "/v4/northwind/northwind.svc/Order_Subtotals",
                headers: {
                    "content-type": "application/json"
                }
            });
            req.reply(data.value);
        } catch (err) {
            req.reject(err);
        }
    })
}