import { useEffect, useRef, useState } from 'react'
import './App.css'
import { QRCodeCanvas } from "qrcode.react";

function App() {
  const [text, setText] = useState("")
  const qrRef = useRef();
  let valor

  useEffect(() => {
    console.log(text);
  }, [text])

  const textUpdate = (e) => {
    e.preventDefault()
    valor = e.target.value
    setText(valor)
  }

  const qrcode = (
    <QRCodeCanvas
      id="qrCode"
      value={text}
      size={260}
      bgColor={"#fff"}
      level={"H"}
    />
  );

  const downloadQRCode = (e) => {
    e.preventDefault();
    let canvas = qrRef.current.querySelector("canvas");
    let image = canvas.toDataURL("image/png");
    let anchor = document.createElement("a");
    anchor.href = image;
    anchor.download = `qr-code.png`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    setUrl("");
  };

  return (
    <>
      <div className='main-cont'>
        <h2>Generador QR</h2>
        <div id='cont-app'>
          <div id='formu'>
            <label id='textoInputLabel' htmlFor="textoInput">TEXTO</label>
            <input id='textoInput' type="text" onChange={(e) => textUpdate(e)} />
            <button onClick={(e) => downloadQRCode(e)} id='botonGenerar'>Descargar</button>
          </div>
          <div ref={qrRef} id='display'>
            {qrcode}
          </div>
        </div>

      </div>
      <div className='footer'>
        <p>Gonz2023</p>
      </div>
    </>
  )
}

export default App
