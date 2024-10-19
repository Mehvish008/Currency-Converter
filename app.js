
const BASE_URL =

  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

 const dropdowns = document.querySelectorAll(".dropdown select");
 const btn = document.querySelector("form button")
 const msg =document.querySelector(".msg");
 const fromCur = document.querySelector(".from select")
 const toCur = document.querySelector(".to select")
 

   for (let select of dropdowns) {
    for (currCode in countryList){
    let newOption= document.createElement("option");
    newOption.innerText=currCode;
    newOption.value=currCode;
    if(select.name==="from" && currCode==="USD"){
        newOption.selected="selected";
            }else if(select.name==="to" && currCode==="PKR"){
                newOption.selected="selected";}

    select.append(newOption);
    }
    select.addEventListener("change", (evt)=>{
            updateFlag(evt.target);
        });

}


const updateFlag = (element)=>{
   let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc= `https://flagsapi.com/${countryCode}/flat/64.png`;
   let img=element.parentElement.querySelector("img")
   img.src=newSrc;
};



btn.addEventListener("click", async(evt)=>{
evt.preventDefault();
let amount=document.querySelector(".amount input");
let amtValue=amount.value;
if (amtValue ==="" || amtValue< 1){
    amtValue=1;
    amount.value="1"
}

const URL = `${BASE_URL}/${fromCur.value.toLowerCase()}.json`;
let response = await fetch(URL);
let data = await response.json();
let currObj =data[fromCur.value.toLowerCase()];
let rate = currObj[toCur.value.toLowerCase()];
let finalAmt = rate * amtValue;
msg.innerText = `${amtValue} ${fromCur.value} = ${finalAmt} ${toCur.value}`


})