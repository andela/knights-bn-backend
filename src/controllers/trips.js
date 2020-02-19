import models from '../db/models';
import { request } from 'express';
import passport from 'passport';
export default class Trips {

static async returnTrip (req,res) {
    try{
        const {
            userId, origin, destination, departureDate, returnDate, reason, accommodation, passportNumber
          } = req.body;
          /*
               * managerId and requesterID 
               * should be attached on the token.
               * assign a default manager
               */
              
          const managerId = 3;
          //add passport number if provided
          if(passportNumber){
            await models.User.update(
                {passport: passportNumber},
                {where : { id: userId}}
              )
        }
          
    // record the request with the corresponding requestor and manager.
    await models.Request.create({
        managerId,
        requesterId: userId,
        origin,
        destination,
        type: 'two way',
        departureDate,
        returnDate,
        accommodation,
        reason,
    }).then((request) => {                         
        res.status(200).json({
        message: 'request created on success!',
        origin,
        destination,
        departureDate,
        returnDate,
        reason,
        requestId: request.id,
        requestType: request.type,
        status: request.status,
            })
        });
    } 
    catch(error){
        res.status(500).json({
            error,
            })
        }
    }
}
