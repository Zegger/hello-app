

// window.api.receive("compute-response", (data) => {
//    const element = document.getElementById('click-counter')
//    if (element) element.innerText = data
// });

document.getElementById('compute-btn').onclick = async () => {
    // window.api.send("increment-count");

   // const element = document.getElementById('result')
   // if (element) element.innerText = 'hello'

   // console.log('hello there')

   const num1 = document.getElementById('number-one').value
   const num2 = document.getElementById('number-two').value
   const operator = document.getElementById('operator').value

   const result = await window.api.compute(num1, num2, operator);

   const element = document.getElementById('result')
   if (element) element.innerText = result
}

// callback-style
// document.getElementById('countbtn').onclick = async () => {
//     const count = await window.api.count();
//     const element = await document.getElementById('click-counter');
//     element.innerText = count;
// }
