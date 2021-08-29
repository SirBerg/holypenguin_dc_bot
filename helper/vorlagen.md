#Vorlagen für Verschiedenen Hilfreichen Code

##Aktuellen Filename Bekommen
Sinnvoll für Debug und Fehlerlogging
````javascript
const path = require('path');

//Hier ist dann der Aktuelle Filename als scriptName verfügbar
let scriptName = path.basename(__filename);
````

##Aktuelle Linenummer Bekommen
Sinnvoll für Debug und Fehlerlogging
````javascript
let line = new Error().lineNumber

//oder
let line = new Error().stack

//die Linenummer ist dann als line verfügbar
````
