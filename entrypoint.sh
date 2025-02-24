#!/bin/sh
bunx mikro-orm migration:up
exec "$@"
