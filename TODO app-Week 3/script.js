let ctr=1;
function callback(){
    console.log(ctr);
    ctr=ctr+1;
}
setInterval(callback,1000);