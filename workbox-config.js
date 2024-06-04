module.exports = {
    globDirectory: './',
    globPatterns: [
        '**/*.{html,css,ico,jpg,svg,png,js}'
    ],
    swDest: 'sw.js',
    ignoreURLParametersMatching: [
        /^utm_/,
        /^fbclid$/
    ],
    runtimeCaching: [
        {
            urlPattern: ({request}) => request.destination === 'script',
            handler: 'StaleWhileRevalidate',
            options: {
                cacheName: 'javascript-cache',
            },
        },
    ],
    clientsClaim: true,
    skipWaiting: true,
};
