import React, {CSSProperties, PropsWithChildren, useEffect, useRef} from "react";
import type { UgcEditorViewProps } from "./UgcEditorView.h";
import { useStore } from "effector-react";
import {UgcEditorViewModelReact} from "~/UgcEditorViewModelReact";
import {UgcEditorViewContainerProps} from "./UgcEditorView.h";
import {keyCodes} from "~/helpers/keyCodes";

declare global {
    interface Navigator {
        userAgentData?: {
            mobile: boolean;
        }
    }
}

let isDesktop = true;
if (navigator != null && navigator.userAgentData != null && typeof navigator.userAgentData.mobile === "boolean") {
    isDesktop = !navigator.userAgentData.mobile;
} else {
    isDesktop = !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}


const UgcEditorView: React.FC<UgcEditorViewProps> = ({ viewModel }) => {

    const showUgcEditorView = useStore(viewModel.$showUgcEditorView);
    const showUgcEditorLoaderView = useStore(viewModel.$showUgcEditorLoaderView);

    if (showUgcEditorView) {

        let positionOptions: CSSProperties = {};
        if (isDesktop) {
            positionOptions = {
                top: "30px",
                bottom: "30px",
                height: "calc(100vh - (30px * 2))",
                width: "calc((100vh - (50px * 2)) * 9 / 16)", // aspect ratio 16:9
                left: "50%",
                transform: "translateX(-50%)",
            };
        }

        const viewOptions = viewModel.viewOptions;
        viewOptions.style = {...viewOptions.style, ...positionOptions};

        if (showUgcEditorLoaderView) {

            return (
                <UgcEditorViewContainer viewModel={viewModel} key="UgcEditorViewContainer">
                    <UgcEditorViewIFrame viewOptions={viewOptions} viewModel={viewModel} key="UgcEditorViewIFrame"/>
                    <UgcEditorViewLoader viewOptions={viewOptions} viewModel={viewModel}/>
                </UgcEditorViewContainer>
            );
        }

        return (
            <UgcEditorViewContainer viewModel={viewModel} key="UgcEditorViewContainer">
                <UgcEditorViewIFrame viewOptions={viewOptions} viewModel={viewModel} key="UgcEditorViewIFrame"/>
            </UgcEditorViewContainer>
        );


    }

    return <></>;
};

const UgcEditorViewContainer: React.FC<PropsWithChildren<UgcEditorViewContainerProps>> = ({ viewModel, children }) => {
    useEffect(() => {
        const onKeydown = (e) => {
            if (e.keyCode === keyCodes.esc) {
                viewModel.closeUgcEditor();
            }
        }

        window.addEventListener('keydown', onKeydown);
        window.focus(); // for keydown handler

        return () => {
            window.removeEventListener('keydown', onKeydown)
        };
    }, []);

    return (
        <div {...viewModel.containerOptions} onClick={() => viewModel.closeUgcEditor()}>
            {children}
        </div>
    );
}

const UgcEditorViewIFrame = ({ viewOptions, viewModel }: { viewOptions: UgcEditorViewModelReact["viewOptions"], viewModel: UgcEditorViewModelReact}) => {
    const viewRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        const messageListener = e => viewModel.messageListener(e);
        window.addEventListener("message", messageListener, false);
        return () => {
            window.removeEventListener("message", messageListener);
        };
    }, []);

    return <iframe {...viewOptions} ref={viewRef} />;
};

const UgcEditorViewLoader = ({ viewOptions, viewModel }: { viewOptions: UgcEditorViewModelReact["viewOptions"], viewModel: UgcEditorViewModelReact}) => {

    useEffect(() => {
        const keyframes = `
            @keyframes UgcEditorViewLoaderSpin {
                from {
                    -webkit-transform: rotate(0deg);
                    transform: rotate(0deg);
                }
                to {
                    -webkit-transform: rotate(359deg);
                    transform: rotate(359deg);
                }
            }        
        `;

        const styleElement = document.createElement('style');
        document.head.appendChild(styleElement);
        const styleSheet = styleElement.sheet;
        styleSheet.insertRule(keyframes, 0);

        return () => {
            if (styleElement && styleElement.parentElement && styleElement.parentElement.removeChild) {
                styleElement.parentElement.removeChild(styleElement);
            }
        };
    }, []);

    const loaderStyle = {...viewOptions.style};
    loaderStyle.backgroundColor = "black";
    loaderStyle.zIndex = parseInt(String(viewOptions.style.zIndex)) + 1;

    const animationStyle: CSSProperties = {
        position: "absolute",
        top: "calc(50% - 32px / 2)",
        left: "calc(50% - 32px / 2)",
        width: "32px",
        height: "32px",
        border: "solid 1px white",
        borderColor: "black white white white",
        borderRadius: "50%",
        animation: "UgcEditorViewLoaderSpin .6s infinite linear",
    };


    const closeButtonStyle: CSSProperties = {
        border: "0",
        padding: "0",
        background: "transparent",
        position: "absolute",
        top: `calc(25px + ${viewModel.safeAreaInsets.top}px)`,
        right: "15px",
        zIndex: parseInt(String(viewOptions.style.zIndex)) + 1,
        cursor: "pointer",
        outline: "none!important",
        width: "25px",
        height: "25px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    };

    const closeButtonHandler = () => viewModel.showUgcEditorView = false;

    return (
        <div style={loaderStyle}>
            <div onClick={closeButtonHandler} style={closeButtonStyle}><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.96425 7.4645L0.142822 0.650209L0.649965 0.143066L7.46425 6.9645L14.2857 0.143066L14.7928 0.650209L7.97139 7.4645L14.7928 14.2859L14.2857 14.7931L7.46425 7.97164L0.649965 14.7931L0.142822 14.2859L6.96425 7.4645Z" fill="white"/>
            </svg></div>
            <div style={animationStyle}/>
        </div>
    );
};




export { UgcEditorView };
