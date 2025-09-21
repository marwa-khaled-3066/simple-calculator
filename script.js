const calculator = document.querySelector(".calculator-body");
const buttons = calculator.querySelector(".calculator-btns");
const display = document.querySelector('.calculator-display');
const history = document.querySelector('.calculator-history');

var a = 0;
var operator = null;
var b = null;
var res = null;

//listen for key clicks
buttons.addEventListener("click", myFunction);
function myFunction() {
    // determine pressed key's type
    const key = event.target;
    value= key.getAttribute("id");
    if (res!=null){
        a=0;
        b=null;
        operator=null;
        res=null;
        display.textContent="0";
        history.textContent="0";
    }
    if(key.getAttribute("class")){ // check if the button pressed is an operator + / - *
        // assign type of operator action
        if (value=="equals"){ // calculation requested
            if (a != null){
                b = Number(display.textContent);
                
                switch (operator){
                    case "divide":
                        operator = "÷";
                        divide();
                        break;
                    case "multiply":
                        operator = "×";
                        multiply();
                        break;
                    case "add":
                        operator = "+";
                        add();
                        break;
                    case "subtract":
                        operator = "-";
                        subtract();
                        break;
                    case "C":
                        clear(value);
                        break;
                    case "CE":
                        clear(value);
                        break;
                    default:
                        break;
                }
            }
        }
        else{ // operation added, need 2nd operand
            if(value != "CE" && value != "C"){ // do not replace operator if the operation selected is clearing
                operator = value; // save the operation if it is not a clear
                a= Number(display.textContent); // save first operand
            }
            display.textContent= "0";
        }   
    }
    else{ //numbers and decmial
        if(value == "decimal"){
            if (display.textContent != "" && !display.textContent.includes(".")){
                value= ".";
                display.textContent+=value;
            }
        }
        // remove leading zero when inserting a number
        else if(display.textContent=="0"){
            display.textContent= value;
        }
        else{ // append number
            display.textContent+=value;
        }
    }
};

var nums = ["0","1","2","3","4","5","6","7","8","9", "."];
var ops = ["*","-","+","/", "Enter"];

// listen for keyboard presses
document.addEventListener("keypress", mykeyboardFunc);
function mykeyboardFunc(){
    let value = event.key;
    console.log(value);
    if(ops.includes(value)){ // check if the button pressed is an operator + / - *
        // assign type of operator action
        if (value ==="Enter"){ // calculation requested
            if (a != null){
                b = Number(display.textContent);
                switch (operator){
                    case "/":
                        divide();
                        break;
                    case "*":
                        multiply();
                        break;
                    case "+":
                        add();
                        break;
                    case "-":
                        subtract();
                        break;
                    default:
                        break;
                }
            }
        }
        else{ // operation added, need 2nd operand
            operator = value; // save the operation
            a= Number(display.textContent); // save first operand
            display.textContent= "0";
        }   
    }
    else{ //numbers and decmial
        if(nums.includes(value)){
            if(value == "."){
                if (display.textContent != "" && !display.textContent.includes(".")){
                    value= ".";
                    display.textContent+=value;
                }
            }
            // remove leading zero when inserting a number
            else if(display.textContent=="0"){
                display.textContent= value;
            }
            else{ // append number
                display.textContent+=value;
            }
        }
    }
}


function clear(op){
    if (op=="C"){
        display.textContent= "0";
        history.textContent= "0";
        a= 0;
        operator = null;
        b= null;
    }
    else{ // CE
        display.textContent= "0";
        b= null;
    }
}

function divide(){
    if(b==0){
        alert("Divide by zero error!");
    }
    else{
        res=a/b;
        display.textContent= res;
        history.textContent= a + " " + operator + " " + b;
    }
}

function add(){
    res =a+b;
    display.textContent= res;
    history.textContent= a + " " + operator + " " + b;
}

function multiply(){
    res = a*b;
    display.textContent= res;
    history.textContent= a + " " + operator + " " + b;
}

function subtract(){
    res = a-b;
    display.textContent= res;
    history.textContent= a + " " + operator + " " + b;
}