import {EventEmitter} from "events";
import {createEvent, createStore} from "effector";
import {UgcSdk} from "./UgcSdk";
import {UgcSdkConfig} from "./UgcSdk.h";

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

    public _safeAreaInsets: {top: number, bottom: number} = {top: 0, bottom: 0};

    public set ugcEditorConfig(value: UgcSdkConfig) {
        this._eventSetUgcEditorConfig(value);
    }

    private _eventSetUgcEditorConfig = createEvent<UgcSdkConfig>();
    public $ugcEditorConfig = createStore<UgcSdkConfig>(null!).on(this._eventSetUgcEditorConfig, (_, config) => config);
    public $ugcEditorConfigIsReady = this.$ugcEditorConfig.map(config => config != null);


    public get ugcEditorInitConfig() {
        const config = this.$ugcEditorConfig.getState();
        if (config == null) {
            return null!;
        }

        const sdkVersion = process.env.SDK_VERSION;

        return {
            sessionId: config.sessionId,
            apiKey: config.apiKey,
            config: config.editor.config,
            sdkVersion: config.sdkVersion,
            ugcSdkVersion: sdkVersion,
            storyId: undefined,
            title: undefined,
            cover: undefined,
            appPackageId: config.appPackageId,
            deviceId: config.deviceId,
            userId: config.userId,
            lang: config.lang,
            storyPayload: config.storyPayload,

            safeAreaInsets: this.safeAreaInsets,
        };

    };

    public get safeAreaInsets() {
        const safeAreaInsets = {
            top: 0,
            bottom: 0,
        };
        if (this._safeAreaInsets) {
            if (typeof this._safeAreaInsets.top === "number") {
                safeAreaInsets.top = this._safeAreaInsets.top;
            }
            if (typeof this._safeAreaInsets.bottom === "number") {
                safeAreaInsets.bottom = this._safeAreaInsets.bottom;
            }
        }
        return safeAreaInsets;
    }

    get editorFile(): string | undefined {
        const config = this.$ugcEditorConfig.getState();
        if (config == null) {
            return undefined;
        }

        let editorFile = config.editor.url;

        const urlTemplate = config.editor.urlTemplate;
        const versionTemplate = config.editor.versionTemplate;
        const versionsMap = config.editor.versionsMap;

        if (Array.isArray(versionsMap) && typeof versionTemplate === "string" && typeof urlTemplate === "string") {

            // max buildVersion - at first array position
            versionsMap.sort((a, b) => b.minBuild - a.minBuild);

            const ugcSdkBuild: number = parseInt(String(process.env.SDK_VERSION_CODE));

            let version: string|null = null;
            for (const item of versionsMap) {
                if (ugcSdkBuild >= item.minBuild) {
                    version = item.editor;
                    break;
                }
            }

            if (version != null) {
                editorFile = urlTemplate.replace(new RegExp(versionTemplate, 'g'), version);
            }

        }

        if (editorFile) {
            return editorFile.replace(/(build\/).+\.zip$/, "build/index.html");
        }
        return undefined;
    }


    public get containerOptions(): Record<string, any> {
        return {};
    }

    public get viewOptions(): Record<string, any> {
        return {};
    }

    private _nonce: string | undefined;
    public set nonce(value: string | undefined) {
        this._nonce = value;
    }

    public get nonce(): string | undefined {
        return this._nonce;
    }

}
