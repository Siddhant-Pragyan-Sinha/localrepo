let ctr=1;
function callback(){
    console.log(ctr);
    const el=document.querySelectorAll("h4")[2];
    el.innerHTML=ctr;
    ctr=ctr+1;
}
setInterval(callback,1000);