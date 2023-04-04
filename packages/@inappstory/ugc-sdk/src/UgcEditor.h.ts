import { Option } from "./commonTypes";


export type EditorDynConfig = Record<string, any>;

export type StoryPayload = Option<Record<string, string | number | boolean>>;

export type UgcEditorConfig = {
    sessionId: string,
    lang: string,
    apiKey: string, // Authorization: Bearer ${apiKey}
    appPackageId: Option<string>,
    deviceId: Option<string>,
    userId: Option<string>,
    config: EditorDynConfig,
    sdkVersion: string, // 2.1.3 for example
    ugcSdkVersion: string,
    storyId: Option<number>, // null or int
    title: Option<string>, // username
    cover: Option<string>, // base64 encoded image (user avatar)
    storyPayload: StoryPayload
};


export type EditorApiFns = {
    init: (editorConfig: unknown) => void,
    handleBack: () => boolean,
    pauseUI: () => void, // focus
    resumeUI: () => void, // blur
    close: (checkChanges?: boolean) => boolean,
    sdkCb: (payload: string) => void,
    onSaveInstanceState: () => string, // return editor State to SDK
    onRestoreInstanceState: (state: string) => void, // return editor State from SDK to Editor
};


