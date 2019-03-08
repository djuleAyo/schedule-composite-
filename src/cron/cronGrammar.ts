export let diminishedCronGrammar = `
start
  = cron
  
cron
  = sec:place ws min:place ws hour:place ws dom:place ws month:place ws dow:place
  / min:place ws place ws place ws place ws place
  / sec:place ws min:place ws hour:place ws dow:place
  / sec:place ws min:place ws hour:place
  / sec:place ws min:place
  / sec:place

place "string"
	= string: [*] {return "*";}
    /num:list {return num;}

integer "integer"
  = digits:[0-9]+ { return +digits; }

list
  = and:and			{return and;}
  / any:any			{return any;}
  / num:integer {return num;}
  
and
  = newNum:integer "," num:and {
  		if(typeof(num) === 'number') { num = ["and", newNum, num]; return num;} 
        if(num[0] ==='any') return ["and", newNum, num];
        if(num[0] ==='and') return [...num, newNum];
  }
  / any:any "," num:and {
  		return ["and", any, num]
  }
  / any:any	{return any; }
  / num:integer {return num;}

any
  = left:integer "-" right:integer {return ["any", left, right];}

ws "string"
  = ws: [ ]
`;