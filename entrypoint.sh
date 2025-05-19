#!/bin/sh
npx mikro-orm-esm migration:create
npx mikro-orm-esm migration:up

exec "$@"
