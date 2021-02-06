'use strict';

const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const path = require('path');

const init = async () => {

    const server = Hapi.Server({
        host: 'localhost',
        port: 1234,
        routes: {
            files: {
                relativeTo: path.join(__dirname, 'static')
            }
        }
    });

    await server.register([{
        plugin: require('hapi-geo-locate'),
        options: {
            enabledByDefault: true
        }
    },
    {
        plugin: Inert
    },
    {
        plugin: require('@hapi/vision')
    }]);

    server.views({
        engines: {
            hbs: require('handlebars')
        },
        path: path.join(__dirname, 'views'),
        layout: 'default'
    })

    server.route([{
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return h.file('welcome.html');
        }
    },
    {
        method: 'GET',
        path: '/dynamic',
        handler: (request, h) => {
            const data = {
                name: 'WittCode'
            }
            return h.view('index', data);
        }
    },
    {
        method: 'POST',
        path: '/login',
        handler: (request, h) => {
            return h.view('index', { username: request.payload.username });
        }
    },
    {
        method: 'GET',
        path: '/download',
        handler: (request, h) => {
            return h.file('welcome.html', {
                mode: 'inline',
                filename: 'welcome-download.html'
            });
        }
    },
    {
        method: 'GET',
        path: '/location',
        handler: (request, h) => {
            if (request.location) {
                return h.view('location', { location: request.location.ip });
            } else {
                return h.view('location', { location: 'Your location is not enabled.' });
            }
        }
    },
    {
        method: 'GET',
        path: '/users/{soccer?}',
        handler: (request, h) => {
            return "<h1>USERS PAGE</h1>";
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