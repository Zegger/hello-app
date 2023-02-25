

window.api.receive("increment-response", (data) => {
   const element = document.getElementById('click-counter')
   if (element) element.innerText = data
});

document.getElementById('countbtn').onclick = async () => {
    window.api.send("increment-count");
}

// callback-style
// document.getElementById('countbtn').onclick = async () => {
//     const count = await window.api.count();
//     const element = await document.getElementById('click-counter');
//     element.innerText = count;
// }
