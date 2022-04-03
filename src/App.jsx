import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import 'animate.css';
import copy from 'copy-to-clipboard';

function CheckBox({
  value,
  setValue
}) {
  return <div>
    <label class="relative flex justify-between items-center overflow-hidden">
      <input type="checkbox" class="sr-only peer" onClick={() => setValue(!value)} checked={value} />
      <span class="w-10 h-6 flex items-center flex-shrink-0 p-0.5 border-2 border-white duration-300 ease-in-out after:w-4 after:h-4 after:bg-white after:shadow-md after:duration-300 peer-checked:after:translate-x-4"></span>
    </label>
  </div>
}
function App() {
  const [passwordLength, setPasswordLength] = useState(16);
  const [password, setPassword] = useState("");
  const [containUppercase, setContainUppercase] = useState(true);
  const [containLowercase, setContainLowercase] = useState(true);
  const [containNumber, setContainNumber] = useState(true);
  const [containSymbol, setContainSymbol] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    const lowerCaseCharacters = "abcdefghijklmnopqrstuvwxyz";
    const upperCaseCharacters = lowerCaseCharacters.toUpperCase();
    const numberCharacters = "1234567890"
    const symbolCharacters = "!@#$%^&*()_<>?,./[]{}";

    let newPassword = "";

    for (let i = 0; i < passwordLength; i++) {
      let charactersCandidates = "";
      if (containUppercase) charactersCandidates += upperCaseCharacters;
      if (containLowercase) charactersCandidates += lowerCaseCharacters;
      if (containNumber) charactersCandidates += numberCharacters;
      if (containSymbol) charactersCandidates += symbolCharacters;
      const char = charactersCandidates.charAt(Math.floor(Math.random() * charactersCandidates.length));
      newPassword += char;
    }
    setPassword(newPassword);
  }
  useEffect(() => {
    generatePassword()
  }, [passwordLength, containUppercase, containLowercase, containNumber, containSymbol]);



  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen w-full bg-black text-white">
        <h1 className="text-5xl animate__animated animate__fadeInDown [animation-delay:0.5s] text-center">Password Generator</h1>
        <p className="text-center animate__animated animate__fadeInUp [animation-delay:0.5s] text-xl max-w-3xl mt-2">
          Generate a Strong Password for You
        </p>
        <div className="animate__animated animate__fadeInLeft  [animation-delay:1s] flex flex-row border-2 justify-between whitespace-nowrap bg-black max-w-[90%] min-w-[50%]  p-4 mt-8 text-2xl">
          <div className="overflow-x-auto overflow-y-hidden">
            {password}
          </div>
          <div className="flex items-center gap-3">
            <button onClick={generatePassword}>
              <Icon icon="ic:round-refresh" />
            </button>
            <button onClick={() => {
              copy(password);
              setCopied(true);
              setTimeout(() => {
                setCopied(false)
              }, 2000)
            }}>
              <Icon icon={copied ? "uil:check" : "ic:round-content-copy"} />
            </button>
          </div>
        </div>
        <div className="mt-8 w-4/5 sm:w-1/2 ">
          <div class="slidecontainer lg:flex-row justify-between">
            <label className="text-lg animate__animated animate__fadeInUp [animation-delay:2s]">Password Length</label>
            <div className="animate__animated animate__fadeInUp [animation-delay:2s] flex items-center gap-2">
              <input type="range" min="1" max="100" value={passwordLength} onChange={e => setPasswordLength(e.target.value)} class="slider w-full mt-2" id="myRange" />
              <span className="text-xl mt-0.5">{passwordLength}</span>
            </div>
          </div>
        </div>
        <div className="w-4/5 sm:w-1/2 flex flex-col gap-4 mt-8">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
            <div className="w-full sm:w-1/2 flex items-center gap-8">
              <div className="w-full flex items-center justify-between animate__animated animate__fadeInLeft [animation-delay:1.5s]">
                <label className="text-lg">Upper Case</label>
                <CheckBox value={containUppercase} setValue={setContainUppercase} />
              </div>
            </div>
            <div className="w-full sm:w-1/2 flex items-center gap-8">
              <div className="w-full flex items-center justify-between animate__animated animate__fadeInRight [animation-delay:1.5s]">
                <label className="text-lg">Lower Case</label>
                <CheckBox value={containLowercase} setValue={setContainLowercase} />
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
            <div className="w-full sm:w-1/2 flex items-center gap-8">
              <div className="w-full flex items-center justify-between animate__animated animate__fadeInLeft [animation-delay:1.5s]">
                <label className="text-lg">Number</label>
                <CheckBox value={containNumber} setValue={setContainNumber} />
              </div>
            </div >
            <div className="w-full sm:w-1/2 flex items-center gap-8">
              <div className="w-full flex items-center justify-between animate__animated animate__fadeInRight [animation-delay:1.5s]">
                <label className="text-lg">Symbol</label>
                <CheckBox value={containSymbol} setValue={setContainSymbol} />
              </div>
            </div >
          </div>
        </div>
      </div >
    </div >

  );

}

export default App