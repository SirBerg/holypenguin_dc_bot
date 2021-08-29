#Dokumentation für die States und Errors
##FALLS IHR EIGENE PREFIXES HINZUFÜGEN WOLLT TUT DAS ABER:   
##DOKUMENTIERT DAS HIER!!!!
##Error.js
###Was ist enthalten?
In diesem File sind verschiedene Präfixe für Fehler und Warnings enthalten
###Was sollte in welcher Situation benutzt werden?
Warnings sollten bei Fehlern benutzt werden, die nicht so gravierend sind, dass sie das Programm zum Absturz bringen,  
Errors wiederum sollten aufjedenfall mit einem log verbunden sein, und in fehlern die zum Absturz führen/führen können  
benutzt werden
####1. General Error und Warning
Im Error.js sind die Error und Warnings so definiert:
````javascript
//deklarierungen:
general_error = '[Error] '.red
general_warning = '[GENERAL Warning]'.yellow

//exports:
exports.general_warning = general_warning
exports.general_error = general_error

````
Wie man es Importiert in einem File:
````javascript
const file = require('./src/states/error.js')
let general_warning = file.general_warning
let general_error = file.general_error

console.log(general_error+'APFELTASCHEAPFELTASCHEAPFELTASCHE')
console.log(general_warning+'APFELTASCHEAPFELTASCHEAPFELTASCHE')
````
Der Output dieses Files sieht so aus:  
![Errors und Warnings output](./bilder_dokumentation/errors_und_warnings.png)
####2.Andere Errors und Warnings
Die Anderen Errors und warnings sind gleich wie die General Error und Warnings zu benutzen, hier findest du eine Liste  
wie sie Exportiert sind:
```javascript
//warnings
exports.general_warning = general_warning //des nach dem 'exports' ist immer das wie man es im file requiren kann
exports.sql_warning = sql_warning
exports.api_warning=api_warning
exports.get_warning=api_warning
exports.post_warning=post_warning
exports.nextjs_warning = next_js_warning

//errors
exports.general_error = general_error
exports.sql_error = sql_error
exports.api_error = api_error
exports.get_error = get_error
exports.post_error = post_error
exports.nextjs_error = next_js_error
```
So sehen diese Prefixes aus:  
![Error prefixes output](./bilder_dokumentation/error_warning_output.png)
####3. Ausnahmen in Error.js
Es gibt eine Ausnahmen, die in keine der anderen Kategorien gepasst hat: API Authentication Error  
Sollte Auftreten wenn jemand sich falsch gegenüber der API Authentifiziert. Kann allerdings  
genauso benutzt werden wie auch die anderen, die oben erwähnt sind.  
Beispiel:  
```javascript
//so steht es im file drin und kann wie oben benutzt werden
exports.api_authentication_warning = '[API AUTHENTICATION Warning] '.red.underline

//Der Output sollte Rot und Unterstrichen sein
```

##States.js
###Was ist Enthalten?
In diesem File sind verschiedene Präfixe für harmlosere Dinge als in Error.js vorhanden.  
Zum Beispiel: notices für verschiedene Teile des Programms, und der Debug Präfix
###Was sollte in welcher Situation benutzt werden?
Notices sollten bei normalen Events (wie z.B. einer SQL abfrage benutzt werden).  
States_good sollten bei z.B. einem Abgeschickten Request in der Api benutzt werden, damit signalisiert wird das alles  
funktioniert hat
###General Notice und General_State_good
In states.js sind die Notices und States so definiert:
```javascript
//deklarierungen 
let general_notice = '[GENERAL Notice] '.blue
let general_state_good = '[GENERAL STATE GOOD] '.cyan

//exports:
exports.general_notice /*<- general_notice ist hier der name wie er in einem anderen file benutzt werden kann*/= general_notice
exports.general_state_good = general_state_good

```
Wie man es in ein File importiert und Benutzt:
```javascript
const file = require('./src/states/states.js')
let general_notice = file.general_notice
let general_state_good = file.general_state_good

console.log(general_notice+'APFELTASCHEAPFELTASCHEAPFELTASCHE')
console.log(general_state_good+'APFELTASCHEAPFELTASCHEAPFELTASCHE')
```
Output aus diesem File:  
![Notices und States outpu](./bilder_dokumentation/notice_und_state.png)

###Andere Notices und States
Andere Notices und States werden wie folgt exportiert:
```javascript
//states
exports.api_state_good = api_state_good
exports.general_state_good = general_state_good
exports.post_state_good = post_state_good
exports.get_state_good = get_state_good
exports.sql_state_good = sql_state_good
exports.nextjs_state_good = nextjs_state_good

//notices
exports.api_notice = api_notice
exports.general_notice = general_notice
exports.post_notice = post_notice
exports.get_notice = get_notice
exports.sql_notice = sql_notice
exports.nextjs_notice = nextjs_notice
```
####Ausnahmen
Die einzige Ausnahme die oben nicht in eine der Kategorien gepasst hat ist Debug:
```javascript
exports.debug = debug
```
###Wie sie alle aussehen:
Der Output von allen states und notices sieht so aus(gleiche reihenfolge wie oben angegeben)  
![Output von allen states und notices](./bilder_dokumentation/states_output.png)