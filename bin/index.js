#!/usr/bin/env node

const Servers = require('../commands/servers');

const Server = new Servers(process.cwd());
const mode = process.env.npm_lifecycle_event === 'dev' ? 'development' : 'production';
const argv = process.argv;

Server.init(mode, argv);
