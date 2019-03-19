'use strict'

const path = require('path')
const AutoLoad = require('fastify-autoload')

module.exports = function (fastify, opts, next) {
  // Place here your custom code!

  fastify
    .register(require('fastify-cors'))
    .register(require('fastify-helmet'))
  /* .register(require('fastify-jwt'), {
    secret: process.env.SECRET
  }) */

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, '+plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all global decorators
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, '+decorators'),
    options: Object.assign({}, opts)
  })

  //this section for decorators
  //fastify.register(require('./users/repo.users'))

  // This section for application routes
  fastify.register(require('./home/route.root'))
  fastify.register(require('./users/route.user'))

  // Make sure to call next when done
  next()
}
