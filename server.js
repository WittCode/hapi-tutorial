'use strict';

const Hapi = require('@hapi/hapi');

const init = async () => {

    const server = Hapi.Server({
        host: 'localhost',
        port: 1234
    });

    await server.register({
        plugin: require('hapi-geo-locate'),
        options: {
            enabledByDefault: false
        }
    });

    server.route([{
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return "<h1>Hello World!</h1>"
        }
    },
    {
        method: 'GET',
        path: '/location',
        handler: (request, h) => {
            if (request.location) {
                return request.location;
            } else {
                return "<h1>Your location is not enabled by default!</h1>";
            }
        }
    },
    {
        method: 'GET',
        path: '/users/{soccer?}',
        handler: (request, h) => {

            return h.redirect('/');

        }
    },
    {
        method: 'GET',
        path: '/{any*}',
        handler: (request, h) => {
            return "<h1>Oh no! You must be lost!</h1>"
        }
    }]);

    await server.start();
    console.log(`Server started on: ${server.info.uri}`);

}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();