const BASE_URL = "https://v6.exchangerate-api.com/v6/f36f1360feed392c761f1ad9/latest";
const btn = document.querySelector('.btn');

const dropdowns = document.querySelectorAll('.dropdown select');
const fromCurr = document.querySelector('.from select');
const toCurr = document.querySelector('.to select');
const message = document.querySelector('.msg p');

dropdowns.forEach(select =>{
    for(let currCode in countryList){
        let newOption = document.createElement('option');
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === 'from' && currCode === 'USD'){
            newOption.selected = true;
        }
        else if(select.name === 'to' && currCode === 'INR'){
            newOption.selected = true;
        }
        select.append(newOption);
    }
    select.addEventListener('change',(evt)=>{
        updateFlag(evt.target);
    })
});

const updateFlag = (element)=>{ 
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector('img');
    img.src = newSrc;
}


const updateExchangeRate = async ()=>{
    let input = document.querySelector('form input');
    let amountvalue = input.value;
    if(amountvalue === "" || amountvalue < 1){
        amountvalue = 1;
        input.value = 1;
    }

    const URL = `${BASE_URL}/${fromCurr.value}`;
    console.log(URL);
    let response = await fetch(URL);
    let data = await response.json();
    console.log(data.conversion_rates);
    let rate = data.conversion_rates[toCurr.value];
    let result = (amountvalue * rate).toFixed(2);
    message.innerText = `${amountvalue} ${fromCurr.value} = ${result} ${toCurr.value}`;
}



btn.addEventListener('click',(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener('load',()=>{
    updateExchangeRate();
})




