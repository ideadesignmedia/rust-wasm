const CONF = require('@ideadesignmedia/config.js')
const createServer = require('@ideadesignmedia/webserver.js')
const app = require('express').Router()
var server
const fs = require('fs')
const path = require('path')

global.makeServer = () => { if (server) { server.close() } server = createServer({ static: process.env.STATIC, port: process.env.PORT || 3333 }, app) }
global.makeServer()