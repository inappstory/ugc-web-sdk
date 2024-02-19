import {UgcEditorViewModel} from "@inappstory/ugc-sdk";
import {CSSProperties, ReactEventHandler, SyntheticEvent} from "react";
import type {Option} from "@inappstory/ugc-sdk";


export class UgcEditorViewModelReact extends UgcEditorViewModel {

    public get containerOptions() {
        // let base = super.containerOptions;

        const containerOptions: {style: CSSProperties} = {
            style: {
                backgroundColor: "rgba(0, 0, 0, .7)",
                position: "fixed",
                left: "0px",
                top: "0px",
                padding: "0px",
                border: "0px",
                zIndex: 2147483643,
                width: "100%",
                height: "100%",
                overflow: "hidden",
                display: "block",
            }
        };

        return containerOptions;
    }

    public get viewOptions(): { style: CSSProperties, onLoad: ReactEventHandler<HTMLIFrameElement>, src: string, sandbox: string } {
        // let base = super.viewOptions;
        return {
            style: {
                backgroundColor: "transparent",
                overflow: "hidden",
                border: "0px",
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                height: "100%",
                width: "100%",
                zIndex: 2147483644,
                colorScheme: "auto"
            },
            onLoad: e => this.onViewFirstLoad(e),
            src: this.editorFile,
            sandbox: "allow-same-origin allow-top-navigation allow-forms allow-scripts allow-downloads allow-top-navigation-to-custom-protocols",
        };

    }

    get editorFileOrigin(): Option<string> {
        if (this.editorFile != null) {
            return new URL(this.editorFile).origin;
        }
        return null;
    }

    public onViewFirstLoad(e: SyntheticEvent<HTMLIFrameElement>) {
        this.iframeElement = e.target as HTMLIFrameElement;

        this.initUgcEditor();
    }

    messageListener(event: MessageEvent) {
        if (event.origin !== this.editorFileOrigin) {
            return;
        }

        const data = event.data;
        if (Array.isArray(data)) {
            switch (data[0]) {
                case "closeEditor": {
                    this.showUgcEditorView = false;
                    break;
                }
                case "editorLoaded": {
                    this.showUgcEditorLoaderView = false;
                    break;
                }

                default:
                    break;
            }
        }

    }

    iframeElement: Option<HTMLIFrameElement> = null;

    get ugcEditorReaderWindow(): Option<Window> {
        if (this.iframeElement) {
            if (this.iframeElement.contentWindow !== null) {
                return this.iframeElement.contentWindow;
            }
        }
        return null;
    }

    sendCommandToEditorApi(name: string, ...args: any[]): boolean {
        if (!this.ugcEditorReaderWindow) {
            return false;
        }
        if (!this.editorFileOrigin) {
            return false;
        }

        this.ugcEditorReaderWindow.postMessage([...arguments], this.editorFileOrigin);
        return true;
    }


    initUgcEditor() {
        this.sendCommandToEditorApi("init", JSON.stringify(this.ugcEditorInitConfig));
    }

    // MARK: Intent(s)
    closeUgcEditor() {
        if (this.$showUgcEditorLoaderView.getState() === true) {
            // loader screen
            this.showUgcEditorView = false;
        } else {
            // editor loaded
            this.sendCommandToEditorApi("close");
        }
    }

}
