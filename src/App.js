import React, { useEffect, useState } from 'react';
import { sendAuthorizationRequest, sendTokenRequest } from './services/tokenService';
import ReactJson from "react-json-view";
import './App.css';

function App() {

  const [code, setCode] = useState("");
  const [tokenResponse, setTokenResponse] = useState({});

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    if (code) {
      setCode(code);
      console.log("intiate token request")
      sendTokenRequest(code)
        .then(response => {
          setTokenResponse(response);
        })
        .catch((error => {
          console.log("TOKEN REQUEST ERROR", error);
        }));
    }

  }, []);

  return (
    <div >
      <div >

        <div >
          <h3 className="title">Retrieve Access Token - Authorization Code Grant</h3>
          {
            !code ?

              <button style={{ marginLeft: "44%" }} onClick={sendAuthorizationRequest}>
                Retrieve Access Token
              </button>
              :
              <div id="token-response" className="col-xs-6 col-md-6">
                <h4 className="title">Token Response</h4>
                <ReactJson
                  src={tokenResponse[0]}
                  name={null}
                  enableClipboard={false}
                  displayObjectSize={false}
                  displayDataTypes={false}
                  iconStyle="square"
                  theme="monokai"
                />
                <h4 className="title">Decoded ID Token</h4>
                <ReactJson
                  src={tokenResponse[1]}
                  name={null}
                  enableClipboard={false}
                  displayObjectSize={false}
                  displayDataTypes={false}
                  iconStyle="square"
                  theme="monokai"
                />
              </div>
          }

        </div>
      </div>
    </div>
  )
}
export default App;