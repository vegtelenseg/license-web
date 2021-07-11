import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/react-hooks";

import "./index.css";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import "antd-mobile/dist/antd-mobile.css";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { client } from "./apolloClient";
import { RecoilRoot } from "recoil";
import { AuthController } from "./contexts/auth/AuthController";

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider
      // @ts-ignore
      client={client}
    >
      <AuthController>
        <RecoilRoot>
          <App />
        </RecoilRoot>
      </AuthController>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
