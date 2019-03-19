'use strict'

const fp = require('fastify-plugin')
const messages = require('../+pb/user_pb')
const services = require('../+pb/user_grpc_pb')
const grpc = require('grpc')

module.exports = fp(async (fastify, opts) => {
  fastify.decorate('userRepo', new UserRepo())
})

class UserRepo {
  constructor() {
    this.client = new services.UserServiceClient('localhost:50051', grpc.credentials.createInsecure())
  }

  list(limit = 10, offset = 0) {
    const arg = new messages.UserList()
    arg.setLimit(limit)
    arg.setOffset(offset)
    return new Promise((resolve, reject) => {
      this.client.list(arg, (err, res) => {
        if (err !== null) reject(err);
        else resolve(JSON.parse(res.getResult()));
      });
    });
  }

  byId(id) {
    const arg = new messages.UserId()
    arg.setId(id)
    return new Promise((resolve, reject) => {
      this.client.byId(arg, (err, res) => {
        if (err !== null) reject(err);
        else resolve(JSON.parse(res.getResult()));
      });
    });
  }

  create(data) {
    const arg = new messages.UserCreate()
    arg.setData(JSON.stringify(data))
    return new Promise((resolve, reject) => {
      this.client.create(arg, (err, res) => {
        if (err !== null) reject(err);
        else resolve(res.getResult());
      });
    });
  }

  update(id, data) {
    const arg = new messages.UserUpdate()
    arg.setData(JSON.stringify(data))
    arg.setId(id)
    return new Promise((resolve, reject) => {
      this.client.update(arg, (err, res) => {
        if (err !== null) reject(err);
        else resolve(res.getResult());
      });
    });
  }

  del(id) {
    const arg = new messages.UserDelete()
    arg.setId(id)
    return new Promise((resolve, reject) => {
      this.client.del(arg, (err, res) => {
        if (err !== null) reject(err);
        else resolve(JSON.parse(res.getResult()));
      });
    });
  }


}
