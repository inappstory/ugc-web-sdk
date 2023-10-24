import React, {useCallback, useEffect} from "react";
// @ts-ignore
import logo from "./logo.svg";
import "./App.scss";

import {UgcEditor, UgcSdk, ReactUgcSdk} from "@inappstory/react-ugc-sdk";
import {IasConnector} from "./components/IasConnector";
import {useIas} from "./useIas";
import {createAppearanceManager, createStoryManager, UGCPayloadAndFilter} from "./StoriesConfig";
import {UGCStoryList} from "./components/UGCStoryList";

function App() {
    return (
        <div className="App">
            <IasConnector>
                <AppBody />
            </IasConnector>
            <UgcEditor safeAreaInsets={{top: 0, bottom: 0}} />

        </div>
    );
}

const AppBody = () => {
    useEffect(() => {
        console.log({
            ReactUgcSdkName: ReactUgcSdk.sdkVersionName,
            ReactUgcSdkCode: ReactUgcSdk.sdkVersionCode,
        });

        console.log({
            UgcSdkName: UgcSdk.sdkVersionName,
            UgcSdkCode: UgcSdk.sdkVersionCode,
        });
    }, []);

    const {storyManager} = useIas(createStoryManager, createAppearanceManager);

    const openEditorHandler = useCallback(() => {
        UgcSdk.showEditor(storyManager, UGCPayloadAndFilter);
    }, [storyManager]);

    return (
        <>
            <header className="App-header">
                <img width={100} src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>

            </header>
            <main>
                <p />
                <UGCStoryList filter={UGCPayloadAndFilter} ugcCardClickHandler={openEditorHandler} />
                <a className="App-link" onClick={openEditorHandler}>Open UGC Editor</a>
            </main>
        </>
    );
};

export default App;
