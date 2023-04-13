import {EventEmitter} from "events";
import {createEvent, createStore} from "effector";
import {UgcSdk} from "~/UgcSdk";
import {Option} from "./commonTypes";

export class UgcEditorViewModel extends EventEmitter {


    constructor() {
        super();

        UgcSdk.viewModel = this;
    }


    public set showUgcEditorView(value: boolean) {
        this._eventShowUgcEditorView(value);
    }

    private _eventShowUgcEditorView = createEvent<boolean>();
    public $showUgcEditorView = createStore(false).on(this._eventShowUgcEditorView, (_, show) => show);


    public set showUgcEditorLoaderView(value: boolean) {
        this._eventShowUgcEditorLoaderView(value);
    }

    private _eventShowUgcEditorLoaderView = createEvent<boolean>();
    public $showUgcEditorLoaderView = createStore(false).on(this._eventShowUgcEditorLoaderView, (_, show) => show);

    public ugcEditorConfig: Record<any, any> = {};

    public _safeAreaInsets: {top: number, bottom: number} = {top: 0, bottom: 0};

    public get ugcEditorInitConfig(): Record<any, any> {

        const sdkVersion = process.env.SDK_VERSION;

        return {
            sessionId: this.ugcEditorConfig.sessionId,
            apiKey: this.ugcEditorConfig.apiKey,
            config: this.ugcEditorConfig.editor.config,
            sdkVersion: this.ugcEditorConfig.sdkVersion,
            ugcSdkVersion: sdkVersion,
            storyId: this.ugcEditorConfig.storyId,
            title: this.ugcEditorConfig.title,
            cover: this.ugcEditorConfig.cover,
            appPackageId: this.ugcEditorConfig.appPackageId,
            deviceId: this.ugcEditorConfig.deviceId,
            userId: this.ugcEditorConfig.userId,
            lang: this.ugcEditorConfig.lang,
            storyPayload: this.ugcEditorConfig.storyPayload,

            safeAreaInsets: this.safeAreaInsets,
        };

    };

    public get safeAreaInsets() {
        const safeAreaInsets = {
            top: 0,
            bottom: 0,
        };
        if (this.ugcEditorConfig && this._safeAreaInsets) {
            if (typeof this._safeAreaInsets.top === "number") {
                safeAreaInsets.top = this._safeAreaInsets.top;
            }
            if (typeof this._safeAreaInsets.bottom === "number") {
                safeAreaInsets.bottom = this._safeAreaInsets.bottom;
            }
        }
        return safeAreaInsets;
    }

    get editorFile(): Option<string> {
        const editorFile = this.ugcEditorConfig.editor.url;

        if (editorFile) {
            return editorFile.replace(/(build\/).+\.zip$/, "build/index.html");
        }
        return null;
    }


    public get containerOptions(): Record<string, any> {
        return {};
    }

    public get viewOptions(): Record<string, any> {
        return {};
    }


}
