#!/bin/env bash
OUTPUT=./dist/log-parser

touch $OUTPUT
echo '#!/bin/env node' >> $OUTPUT
echo 'require("./index")' >> $OUTPUT
chmod +x $OUTPUT

