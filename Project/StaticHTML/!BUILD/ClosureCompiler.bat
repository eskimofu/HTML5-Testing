@echo Building...
@echo off
java -jar !CC_compiler.jar --js DivRotation.js jquery.feedfetcher.v0.95b.MODIFIED.js scripts.js --js_output_file ../compiled.min.js.

echo Done.