// @ts-nocheck
function hasCpfLength(aString) {
    console.log(aString.length)
    return aString.length === 11 ^ aString.length === 14;
}

function isSameCharacter(aString) {
    return aString.split("").every(character => character === aString[0])
}

export function validate(aString) {
	if (!aString) return false;
    if (!hasCpfLength(aString)) return false;

    const unmaskedString = aString
        .replace('.','')
        .replace('.','')
        .replace('-','')
        .replace(" ","");  
    
    if (!isSameCharacter(unmaskedString)) {
        try{  
            let d1 = 0, d2 = 0;  
            let dg1 = 0, dg2 = 0, rest = 0;  
            let nDigResult;  
            
            let digito;  
            for (let i = 1; i < unmaskedString.length -1; i++) {  
                digito = parseInt(unmaskedString.substring(i -1, i));  							
                d1 = d1 + ( 11 - i ) * digito;  

                d2 = d2 + ( 12 - i ) * digito;  
            };  
                
            rest = (d1 % 11);  
    
            dg1 = (rest < 2) ? dg1 = 0 : 11 - rest;  
            d2 += 2 * dg1;  
            rest = (d2 % 11);  
            if (rest < 2)  
                dg2 = 0;  
            else  
                dg2 = 11 - rest;  
    
                let nDigVerific = unmaskedString.substring(unmaskedString.length-2, unmaskedString.length);  
            nDigResult = "" + dg1 + "" + dg2;  
            return nDigVerific == nDigResult;
        }catch (e){  
            console.error("Erro !"+e);

            return false;  
        }  
    } else return false;

}