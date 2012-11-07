@echo off
cls
echo jsLint Results:
echo ===============
java -jar !JSL_jslint4java-2.0.2.jar DivRotation.js scripts.js
pause > nul