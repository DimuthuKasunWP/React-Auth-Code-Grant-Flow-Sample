import axios from "axios";
import {CONFIG} from "../config";


export const sendAuthorizationRequest = () => {
    let authorizeRequest = `https://api.asgardeo.io/t/${CONFIG.ORG_NAME}/oauth2/authorize?response_type=${ CONFIG.RESPONSE_TYPE }&scope=${ CONFIG.SCOPE }&redirect_uri=${ CONFIG.REDIRECT_URI }&client_id=${ CONFIG.CLIENT_ID }`;
    window.location.href = authorizeRequest;
};

export const sendTokenRequest = (code) => {
    const body = [];
    body.push(`client_id=${ CONFIG.CLIENT_ID }`);
    body.push(`client_secret=${ CONFIG.CLIENT_SECRET }`);
    body.push(`code=${ code }`);
    body.push(`grant_type=${ CONFIG.GRANT_TYPE }`);
    body.push(`redirect_uri=${ CONFIG.REDIRECT_URI }`);

    return axios.post(`https://api.asgardeo.io/t/${ CONFIG.ORG_NAME }/oauth2/token`, body.join("&"), getTokenRequestHeaders())
        .then(response => {
            if (response.status !== 200) {
                return Promise.reject(new Error("Invalid status code received in the token response: "
                    + response.status));
            }

            // initAuthenticatedSession(response.data);

            return [response.data, decodeIdToken(response.data.id_token)];

        }).catch((error) => {
            return Promise.reject(error);
        });
};

const getTokenRequestHeaders = () => {
    return {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
        }
    };
};

const decodeIdToken = (token) => {
    return JSON.parse(atob(token.split(".")[1]));
};