import AlertModel  from "../models/alert.js";
import StockListModel from "../models/stocksAvil.js"
import FCM from "fcm-node";
import dotenv from "dotenv";
dotenv.config();
var fcm = new FCM(process.env.serverKey);

 
//Read User details
// Send the alert, and return the update of the status 
// we will not update here, we will update in the python, all user at the single time 
export const sendAlert = async (req, res)=>{
    // try {
        const {name,stock,price,pushToken, userId, alertId} = req.body;
        if(!name || !stock|| !price ||!userId ||!pushToken || !alertId){
            return res.status(400).json({
                stat:"OK",
                error: "Missing data",
                Verified:true,
                message:"Access Denied, Please send all data"
            })
        }
        let errorpm = null;
        let responseData;
        try {
            var message = {
                to:pushToken,
                    notification: {
                        title: `👀 ${stock} Level Alert  `,
                        body: `Price reach on your Level ${price}`,
                    },
            
                    data: { //you can send only notification or only data(or include both)
                        title:  `Dear ${name} you alert hit`,
                        body: `{"stock" : "${stock}","alertId" : "${alertId}","price" : "${price}, "userId":"${userId}", "Message":"Alert may be delay maximum 5 minute"}`
                    }
            
                };
            
                fcm.send(message, function(err, response) {
                    if (err) {
                        console.log("Something has gone wrong!"+err);
                        console.log("Respponse:! "+response);
                        errorpm = response;
                        responseData = err;
    
                    } else {
                        console.log("Successfully sent with response: ", response);
                        responseData = response;
                    }
            
                });
        } catch (error) {
            errorpm = error.message
            responseData = {"multicast_id":0,"success":0,"failure":1,"canonical_ids":0,"results":[{"error":error.message}]}
        }
        const options = {
            new: true // This option ensures that the updated document is returned
          };
        try {
            const update = await StockListModel.findOneAndUpdate(
                { stock: stock },
                { $inc: { subscriber: -1 } }, // Decrement by 1
                options
              );
              console.log(update)
        } catch (error) {
            console.log(error.message)
            console.log("Not able to decrement the subscriber of the stock")
        }

        


        const updatedAlert = await AlertModel.findByIdAndUpdate(
                alertId,
            {notifyStatus:"Success" ,status: 'completed', pushEnable: true },
            { new: true } 
            
        );
        return res.status(201).json({
            stat:"OK",
            error: "",
            Verified:true,
            message:"Push send success",
            alert:updatedAlert
        })
    // } catch (error) {
    //     console.log(error.message)
    //     return res.status(500).json({
    //         stat:"OK",
    //         Error:error.message,
    //         Verified:false,
    //         message:"Internal Server Problem"})
    // }
}