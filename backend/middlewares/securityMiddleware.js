const helmet = require('helmet');
const cors = require('cors');

const corsOptions = {

    // TODO: Remove the allow all and limit to our origin. This is just for dev
    origin: '*',

    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
};


const securityMiddlewares = (app) => {
    app.use(helmet({
        contentSecurityPolicy: {
            useDefaults: true,
            directives: {
                'default-src': ["'self'"],
                'frame-ancestors': ["'none'"],
            }
        },
        featurePolicy: {
            features: {
                geolocation: ["'none'"],
                microphone: ["'none'"],
            }
        },
        hidePoweredBy: true,
        frameguard: {
            action: 'deny'
        },
        ieNoOpen: true,
    }));

    app.use(cors(corsOptions));
};

module.exports = { securityMiddlewares }