rem Assuming your app is running on local host 

cd C:\Program Files (x86)\Google\Chrome\Application

rem Chrome.exe --app="http://localhost:4200"

Chrome.exe --app="data:text/html,<html><body><script>window.moveTo(500,50);window.resizeTo(1100,40);window.location='http://localhost:4200';</script></body></html>"
