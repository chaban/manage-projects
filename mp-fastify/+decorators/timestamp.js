'use strict'

const fp = require('fastify-plugin')

module.exports = fp(async (fastify, opts) => {
  fastify.decorate('app-timestamp', function () {
    return Date.now()
  })
})
