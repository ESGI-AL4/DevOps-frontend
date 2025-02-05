#!/bin/bash

# Wait for api to be up
while ! curl -s http://localhost:8000/articles > /dev/null; do
  echo "Waiting for api to be up..."
  sleep 1
done

# Wait for frontend to be up
while ! curl -s http://localhost > /dev/null; do
  echo "Waiting for frontend to be up..."
  sleep 1
done