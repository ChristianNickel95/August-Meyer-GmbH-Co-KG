@echo off
cd /d %~dp0
start "" "http://localhost:8080"
miniweb.exe -p 8080 -d out 