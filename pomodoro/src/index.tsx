import { reset } from "styled-reset";
import { RecoilRoot } from "recoil";
import { createGlobalStyle } from "styled-components";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

const GlobalStyle = createGlobalStyle`
  ${reset}
  
  body {    
    /* background-color: tomato; */
    color: whitesmoke;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

root.render(
    <>
        <RecoilRoot>
            <GlobalStyle />
            <ChakraProvider>
                <App />
            </ChakraProvider>
        </RecoilRoot>
    </>
);
