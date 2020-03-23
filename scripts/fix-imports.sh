#/bin/sh

echo $@

# Replace all `from "xxx";` to `from "xxx.js";`
sed -i '' -E "s/from '(.*)';/from '\1.js';/g" $@

# Replace all `from "xxx.js.js.js";` to `from "xxx.js";`
sed -i '' -E "s/((\.js)+)';/.js';/g" $@