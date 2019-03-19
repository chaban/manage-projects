'use strict'

const idParam = {
  type: 'object',
  required: ['id'],
  properties: {
    id: { type: 'string', pattern: '^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$' }
  }
}

const response_props = {
  id: { type: 'integer' },
  name: { type: 'string' },
  email: { type: 'string' }
}

const profileFields = {
  type: 'object',
  properties: {
    address: { type: 'string', 'minLength': 3, 'maxLength': 254 },
    phone: { type: 'string', pattern: "^[0-9()\\-\\.\\s]+$", 'minLength': 5, 'maxLength': 40 }
  },
  required: ['address', 'phone']
}

const response_result = {
  200: {
    type: 'object',
    properties: {
      result: { type: 'string' }
    },
    additionalProperties: false
  }
}

const list = {
  response: {
    200: {
      type: 'array',
      items: {
        properties: response_props
      }
    }
  },
  querystring: {
    limit: { type: 'integer', 'exclusiveMinimum': 0 },
    offset: { type: 'integer' }
  }
}

const byId = {
  response: {
    200: {
      type: 'object',
      properties: response_props
    },
    404: {
      type: 'object',
      properties: {
        message: { type: 'string' }
      }
    }
  },
  params: idParam
}

const create = {
  body: {
    type: 'object',
    properties: {
      name: { type: 'string', 'minLength': 3, 'maxLength': 254 },
      email: { type: 'string', format: 'email' },
      password: { type: 'string' }
    },
    required: ['name', 'email', 'password'],
    additionalProperties: false
  },
  response: response_result
}

const update = {
  body: {
    type: 'object',
    properties: {
      name: { type: 'string', 'minLength': 3, 'maxLength': 254 },
      email: { type: 'string', format: 'email' },
      password: { type: 'string' }
    },
    required: ['name', 'email'],
    additionalProperties: false
  },
  response: response_result,
  params: idParam
}

const del = {
  response: response_result,
  params: idParam
}

module.exports = { list, byId, create, update, del }
