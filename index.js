import { ethers } from "./ethers-5.6.esm.min.js";
import { abi, contractAddress } from "./constants.js";
console.log("assalamualikum");
const connectButton = document.getElementById("connectButton");
const submit = document.getElementById("submit");
const getNum = document.getElementById("getting");

getNum.onclick = GetNum;
submit.onclick = addperson;
connectButton.onclick = connect;

async function connect() {
  if (typeof window.ethereum !== "undefined") {
    try {
      await ethereum.request({ method: "eth_requestAccounts" });
      connectButton.innerHTML = "Connected";
      const accounts = await ethereum.request({ method: "eth_accounts" });
      console.log(accounts);
      //   document.getElementById("number section").innerHTML = accounts;
    } catch (error) {
      console.log(error);
    }
  } else {
    connectButton.innerHTML = "Please install MetaMask";
  }
}

async function addperson() {
  const name = document.getElementById("name").value;
  console.log(`Entered name is ${name}`);
  const favNum = document.getElementById("favNum").value;
  console.log(`Entered name is ${favNum}`);

  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
      await contract.addPerson(name, favNum);
    //   console.log(number);
      //   await listenForTransactionMine(add, provider);
    } catch (error) {
        console.log(error);
    }
} else {
    submit.innerHTML = "please install MetaMask";
}
}



async function GetNum(event){
    event.preventDefault();
    const name1 = document.getElementById("requestingName").value;
    // const number = await contract.retrive(name.toString());
    
    
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        // const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, provider);
        console.log(`Entered name is ${name1}`);
      
        try {
            console.log("Retrieving favorite number for name:", name1);
            const favNum = await contract.retrieve(name1);
            // console.log("Favorite number retrieved:", favNum);
            if(favNum == 0){

                 document.getElementById("number section").innerHTML = "Data of this person is not found!";
            }
            else{
                document.getElementById("number section").innerHTML = favNum;
            }
        } catch (error) {
        console.log(error);
      }
    } else {
      getNum.innerHTML = "please install MetaMask";
    }
}
