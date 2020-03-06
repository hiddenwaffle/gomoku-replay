#!/usr/bin/env bash

# Ensure correct directory, for the most part:
# https://stackoverflow.com/a/246128
cd $(dirname "${BASH_SOURCE[0]}")

rm -rf dist docs
yarn run build
mv dist docs
