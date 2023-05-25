/**
 * Se detta som en grund att utgå ifrån.
 * Det är helt fritt att ändra och ta bort kod om ni
 * önskar lösa problemen med andra metoder.
 */

let lcd = null; // displayen

let memory = 0; // Lagrat/gamlat värdet från display
let arithmetic = null; // Vilken beräkning som skall göras +,-, x eller /
let current = 0;

function init() {
    lcd = document.getElementById('lcd');
    let keyBoard = document.getElementById('keyBoard')
    keyBoard.onclick = buttonClick;

}

/**
 * Händelsehanterare för kalkylatorns tangentbord
 */
function buttonClick(e) {
    let btn = e.target.id;  //id för den tangent som tryckte ner
    // kollar om siffertangent är nedtryckt
    
    if (btn.substring(0, 1) === 'b') {
        let digit = btn.substring(1, 2); // plockar ut siffran från id:et
        addDigit(digit);

    } else { // Inte en siffertangent, övriga tangenter.
        switch (btn) {
            case "clear":
                memClear();
                break;
            case"add":
                setOperator('+');
                break;
            
            case "sub":
                setOperator('-');
                break;
            
            case "mul":
                setOperator('x')
                break;
            
            case "div":
                setOperator('/');
                break;

            case "enter":
                calculate();
                break;
            
            case "comma":
                addComma();
            
            default:
                break
            
        }
        
    }
}
/**
 *  Lägger till siffra på display.
 */
function addDigit(digit) {
    lcd.value += digit;
    current += parseFloat(digit);
}

/**
 * Lägger till decimaltecken
 */
function addComma() {
    if (!lcd.value.includes('.')) {
        lcd.value += '.';
        current =+ '.';
      }    

}

/**
 * Sparar operator.
 * +, -, *, /
 */
function setOperator(operator){
    memory = lcd.value;
    lcd.value = '';
    lcd.value += operator;
    arithmetic = operator;
    current = '';
    console.log(arithmetic);
}

/**
 * Beräknar och visar resultatet på displayen.
 */
function calculate() {
let result;

    switch(arithmetic){
        case '+':
            result = parseFloat(memory) + parseFloat(current);
            break;

        case '-':
            result = parseFloat(memory) - current;
            break;

        case 'x':
            result = parseFloat(memory) * current;
            break;

        case '/':
            result = parseFloat(memory) / current;
            break;

        default:
            console.error('Ogiltlig opperator ' + arithmetic);
            return;
    }
    if (isNaN(result)) {
        console.error('Beräkning resulterade i NaN');
        return;
      }

      lcd.value = result;
}

/** Rensar display */
function clearLCD() {
    lcd.value = '';
    isComma = false;
}

/** Rensar allt, reset */
function memClear(){
    memory = 0;
    arithmetic = null;
    clearLCD();
}

window.onload = init;
