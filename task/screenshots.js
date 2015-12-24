/* global module: false, require: false, process: false */

var SauceTunnel = require('sauce-tunnel');
var wd = require('wd');
var Q = require('q');
var _ = require('lodash');

module.exports = function ( grunt, options ) {
    "use strict";

    var name = options.name || "unnamed";
    var buildId = options.build || Date.now();
    var urls = options.urls || [];
    var browsers = options.browsers || [];

    /** Formats a browser config for readability */
    function readableBrowser( config ) {
        return Object.keys(config)
            .map(function (key) { return config[key]; })
            .join(" / ");
    }

    /**
     * Creates a tunnel, and calls a function with that tunnel. That function
     * should return a future. When that future resolves, the tunnel will be
     * automatically closed. This function itself returns a future.
     */
    function startTunnel( withTunnel ) {
        grunt.log.writeln('=> Starting Tunnel to Sauce Labs'.inverse.bold);

        var tunnel = new SauceTunnel(
            process.env.SAUCE_USERNAME,
            process.env.SAUCE_ACCESS_KEY,
            Math.floor((new Date()).getTime() / 1000 - 1230768000).toString(),
            true,
            ['-P', '0']
        );

        var defer = Q.defer();

        tunnel.start(function(status){
            if (status === false){
                defer.reject(new Error('Unable to open tunnel'));
            }
            else {
                grunt.log.ok('Connected to Tunnel');
                defer.resolve();
            }
        });

        // Will store a future that is fulfilled when the tunnel is stopped
        var stopped;

        /** Stops the tunnel */
        function stopTunnel() {
            if ( !stopped ) {
                var stopping = Q.defer();

                grunt.log.writeln('=> Closing Tunnel'.inverse.bold);
                tunnel.stop(function () {
                    grunt.log.ok('Tunnel Closed');
                    stopping.resolve();
                });

                stopped = stopping.promise
                    .timeout(60000, "Timed out trying to close tunnel");
            }

            return stopped;
        }

        // Ensure this tunnel is cleaned up if a process is killed
        require('cleankill').onInterrupt(function (done) {
            stopTunnel().finally(done);
        });

        return defer.promise
            .timeout(60000, "Timed out trying to create tunnel")
            .then(function () {
                return withTunnel(tunnel).finally(stopTunnel);
            });
    }

    /** Sequentially executes a callback that returns promises */
    function sequential(list, callback) {
        return list.reduce(function(after, value) {
            return after.then(function () {
                return callback(value);
            });
        }, new Q());
    }

    /** Executes a callback with a browser */
    function withBrowser ( tunnel, browserConf, callback ) {

        grunt.log.writeln("* Starting: " + readableBrowser(browserConf));

        var browser = wd.promiseChainRemote(
            'ondemand.saucelabs.com', 80,
            process.env.SAUCE_USERNAME, process.env.SAUCE_ACCESS_KEY
        );

        var conf = _.extend({
            "name": name,
            "build": buildId,
            "public": "public",
            "tunnel-identifier": tunnel.identifier
        }, browserConf);

        var sess = Q.defer();
        browser.init(conf, function (err, session) {
            if ( err ) {
                sess.reject(err);
            }
            else {
                sess.resolve(session);
            }
        });

        return sess.promise
            .timeout(90000, "Timed out initializing browser")
            .then(function (session) {
                grunt.log.writeln(
                    "* https://saucelabs.com/tests/" + session[0]);

                return callback(browser)
                    .timeout(30000, "Timed out running tests");
            }).finally(function () {
                return browser.quit();
            }).then(
                function () {
                    grunt.log.ok("Completed: " + readableBrowser(browserConf));
                },
                function (err) {
                    grunt.log.error("Failed: " + readableBrowser(browserConf));
                    throw err;
                }
            );
    }

    return function () {
        grunt.task.requires('connect');

        if ( process.env.SAUCE_USERNAME === undefined ) {
            throw new Error("SAUCE_USERNAME as not defined");
        }
        else if ( process.env.SAUCE_ACCESS_KEY === undefined ) {
            throw new Error("SAUCE_ACCESS_KEY as not defined");
        }

        var done = this.async();

        grunt.log.writeln("Build ID: " + buildId);

        startTunnel(function (tunnel) {
            return sequential(browsers, function (config) {
                return withBrowser(tunnel, config, function(browser) {
                    return sequential(urls, function (url) {
                        return browser.get(url);
                    });
                });
            });
        })
        .then(done, function (err) {
            grunt.log.error(err);
            done(false);
        })
        .done();
    };
};

