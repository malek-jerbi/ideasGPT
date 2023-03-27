import jwt from 'express-jwt'
import jwks from  'jwks-rsa'

    const verifyJwt = jwt({

        secret: jwks.expressJwtSecret({
            cache: true,
            rateLimit: true,
            jwksRequestsPerMinute: 5,
            //add uri
            jwksUri: 'URi',
        }),
        //add audience provider
        audience: 'this is a unique identifier',
        //tenant on Quick start -> Node.js
        issuer: '',
        algorithms: 'RS256',


    }).unless({path:['/']})


module.exports = verifyJwt