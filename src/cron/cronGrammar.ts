export let diminishedCronGrammar = `
start
  = cron
  
cron
  = ms:place s:place ws min:place ws h:place ws dm:place ws m:place ws dw:place
    {return { ms, s, min, h, dm, m, dw}}
  / s:place ws min:place ws h:place ws dm:place ws m:place ws dw:place
    {return {s, min, h, dm, m, dw}}
  / min:place ws h:place ws dm:place ws m:place ws dw:place
    {return { min, h, dm, m, dw};}
marked_place
  = unit:unit place:place {return [place[0], unit, ...place.slice(1)];}
  
unit
  ="ms"
  /"s"
  /"min"
  /"h"
  /"dm"
  /"m"
  /"dw"

place
  = newElem:placeElement "," place:place {place.push(newElem); return place;}
  / elem:placeElement {return [elem];}
  
placeElement
  = range
  / interval
  / integer
  / "*"
  
interval
  = int1:integer "~" int2:integer {return ["interval", int1, int2];}

range
  = left:integer "-" right:integer {return ["range", left, right];}

ws "string"
  = " "
  
integer "integer"
  = digits:[0-9]+ { return parseInt(digits.join(""), 10); }
`;