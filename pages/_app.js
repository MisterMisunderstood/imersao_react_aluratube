import React from "react";
import { ThemeProvider } from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import ColorModeProvider, { ColorModeContext } from "../src/components/Menu/components/ColorMode";
import RegisterVideo from "../src/components/RegisterVideo";

const theme = {
    light: {
        backgroundBase: "#f9f9f9",
        backgroundLevel1: "#ffffff",
        backgroundLevel2: "#f0f0f0",
        borderBase: "#e5e5e5",
        textColorBase: "#222222",
        textColorFooter: "#686868",
        iconsColorBase: "#202020",
        menuBackground: "rgba(255, 255, 255, 0.1)",
    },
    dark: {
        backgroundBase: "#181818",
        backgroundLevel1: "#202020",
        backgroundLevel2: "#313131",
        borderBase: "#383838",
        textColorBase: "#FFFFFF",
        textColorFooter: "#404040",
        iconsColorBase: "#929292",
        menuBackground: "rgba(0, 0, 0, 0.5)",
    }
};

// _app.js -> Definições globais do NextJS
// ThemeProvider -> Provê o tema para geral
// ColorModeProvider -> Provê o state de light ou _dark mode_ para todo mundo 

function ProviderWrapper(props) {
    return (
        <ColorModeProvider initialMode={"dark"}>
            {props.children}
        </ColorModeProvider>
    )
}

function MyApp({ Component, pageProps }) {
    const contexto = React.useContext(ColorModeContext); 

    //console.log(contexto.mode);
    
    return (
        
        <ThemeProvider theme={theme[contexto.mode]}>
            <CSSReset />
            <Component {...pageProps} />
            <RegisterVideo />
        </ThemeProvider>
        
    )
}

export default function _App(props) {
    return (
        <ProviderWrapper>
            <MyApp {...props} />
        </ProviderWrapper>
    )
};