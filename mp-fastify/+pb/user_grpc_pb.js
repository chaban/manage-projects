// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var user_pb = require('./user_pb.js');

function serialize_ormpb_UserCreate(arg) {
  if (!(arg instanceof user_pb.UserCreate)) {
    throw new Error('Expected argument of type ormpb.UserCreate');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ormpb_UserCreate(buffer_arg) {
  return user_pb.UserCreate.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_ormpb_UserDelete(arg) {
  if (!(arg instanceof user_pb.UserDelete)) {
    throw new Error('Expected argument of type ormpb.UserDelete');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ormpb_UserDelete(buffer_arg) {
  return user_pb.UserDelete.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_ormpb_UserId(arg) {
  if (!(arg instanceof user_pb.UserId)) {
    throw new Error('Expected argument of type ormpb.UserId');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ormpb_UserId(buffer_arg) {
  return user_pb.UserId.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_ormpb_UserList(arg) {
  if (!(arg instanceof user_pb.UserList)) {
    throw new Error('Expected argument of type ormpb.UserList');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ormpb_UserList(buffer_arg) {
  return user_pb.UserList.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_ormpb_UserResponse(arg) {
  if (!(arg instanceof user_pb.UserResponse)) {
    throw new Error('Expected argument of type ormpb.UserResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ormpb_UserResponse(buffer_arg) {
  return user_pb.UserResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_ormpb_UserUpdate(arg) {
  if (!(arg instanceof user_pb.UserUpdate)) {
    throw new Error('Expected argument of type ormpb.UserUpdate');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ormpb_UserUpdate(buffer_arg) {
  return user_pb.UserUpdate.deserializeBinary(new Uint8Array(buffer_arg));
}


var UserServiceService = exports.UserServiceService = {
  //
  byId: {
    path: '/ormpb.UserService/ById',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.UserId,
    responseType: user_pb.UserResponse,
    requestSerialize: serialize_ormpb_UserId,
    requestDeserialize: deserialize_ormpb_UserId,
    responseSerialize: serialize_ormpb_UserResponse,
    responseDeserialize: deserialize_ormpb_UserResponse,
  },
  list: {
    path: '/ormpb.UserService/List',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.UserList,
    responseType: user_pb.UserResponse,
    requestSerialize: serialize_ormpb_UserList,
    requestDeserialize: deserialize_ormpb_UserList,
    responseSerialize: serialize_ormpb_UserResponse,
    responseDeserialize: deserialize_ormpb_UserResponse,
  },
  create: {
    path: '/ormpb.UserService/Create',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.UserCreate,
    responseType: user_pb.UserResponse,
    requestSerialize: serialize_ormpb_UserCreate,
    requestDeserialize: deserialize_ormpb_UserCreate,
    responseSerialize: serialize_ormpb_UserResponse,
    responseDeserialize: deserialize_ormpb_UserResponse,
  },
  update: {
    path: '/ormpb.UserService/Update',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.UserUpdate,
    responseType: user_pb.UserResponse,
    requestSerialize: serialize_ormpb_UserUpdate,
    requestDeserialize: deserialize_ormpb_UserUpdate,
    responseSerialize: serialize_ormpb_UserResponse,
    responseDeserialize: deserialize_ormpb_UserResponse,
  },
  del: {
    path: '/ormpb.UserService/Del',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.UserDelete,
    responseType: user_pb.UserResponse,
    requestSerialize: serialize_ormpb_UserDelete,
    requestDeserialize: deserialize_ormpb_UserDelete,
    responseSerialize: serialize_ormpb_UserResponse,
    responseDeserialize: deserialize_ormpb_UserResponse,
  },
};

exports.UserServiceClient = grpc.makeGenericClientConstructor(UserServiceService);
