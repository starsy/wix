@echo off

title Install Script

set KEY1=%1
set KEY2=%2

echo %KEY1%
echo %KEY2%

slmgr /dlv

exit /B 0
