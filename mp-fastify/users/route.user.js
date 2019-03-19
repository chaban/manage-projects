'use strict'
const schemas = require('./schema.user')
module.exports = async function (fastify, opts) {
  fastify.get('/users', {
    schema: schemas.list,
    handler: async (request, reply) => {
      const limit = parseInt(request.query.limit) || 10
      const offset = parseInt(request.query.offset) || 0

      const data = await fastify.userRepo.list(limit, offset)
      return data
    }
  })

  fastify.get('/users/:id',
    { schema: schemas.byId },
    async (request, reply) => {
      const data = await fastify.userRepo.byId(request.params.id)
      return data
    })

  fastify.post('/users',
    { schema: schemas.create },
    async (req, reply) => {

      const data = await fastify.userRepo.create(req.body)
      return { message: `number of users created ${data}` }
    })

  fastify.patch('/users/:id',
    { schema: schemas.update },
    async (req, reply) => {

      const data = await fastify.userRepo.update(req.params.id, req.body)
      return { message: `number of users updated ${data}` }
    })

  fastify.delete('/users/:id',
    { schema: schemas.remove },
    async (req, reply) => {
      const data = await fastify.userRepo.del(req.params.id)
      return { message: `number of users deleted ${data}` }
    }
  )

}