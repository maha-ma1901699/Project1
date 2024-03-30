
document.querySelector("#resetBtn").addEventListener("click", handleReset)

function handleReset(){
    localStorage.clear()
    alert("Local Storage Has Been Cleared!")
}