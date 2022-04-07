#!/bin/env bash
INPUT=./dist/log-parser.js
OUTPUT=./dist/log-parser

cp $INPUT $OUTPUT
sed -i '1s/^/#!\/bin\/env node\n/' $OUTPUT
chmod +x $OUTPUT

