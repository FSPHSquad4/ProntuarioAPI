#!/bin/sh
bunx mikro-orm migration:create
bunx mikro-orm migration:up
exec "$@"
