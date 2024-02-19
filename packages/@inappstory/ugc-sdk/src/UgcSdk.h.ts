export interface UgcEditorConfigurable {
    getUgcEditorConfig(): Promise<UgcSdkConfig>;
    getNonce?: () => string | undefined;
}

type UgcEditorRemoteConfig = {
    url: string, // editor zip archive - /v0.0.6/build/story-editor_v0.0.6.zip

    urlTemplate: string,
    versionTemplate: string,
    versionsMap: Array<{minBuild: number, editor: string}>,
    config: Record<string, any>,
    messages: {
        "dialog_button_not_now": string,
        "dialog_button_settings": string,
        "button_no_gallery_access": string,
        "dialog_storage_permission_warning": string,
        "dialog_photo_permissions_warning": string,
        "dialog_video_permissions_warning": string,
        "warns_file_picker_files_limit": string,
        "title_storage_permission_warning": string,
        "title_file_limit_warning": string,
        "title_image_max_size_limit": string,
        "title_video_max_size_limit": string,
        "title_camera_button": string,
    },
    filePickerFilesLimit: number,
    filePickerImageMaxSizeInBytes: number,
    filePickerVideoMaxSizeInBytes: number,
    filePickerVideoMaxLengthInSeconds: number

};


export type UgcSdkConfig = {
    sessionId: string,
    apiKey: string,
    editor: UgcEditorRemoteConfig,
    sdkVersion: string,
    appPackageId: string,
    deviceId: string,
    userId?: string,
    lang: string,
    storyPayload?: Record<string, unknown>,
};


export type EditorApiFns = {
    init: (editorConfig: unknown) => void,
    handleBack: () => boolean, // нажатие кнопки back (Android)
    pauseUI: () => void, // focus окна
    resumeUI: () => void, // blur окна
    close: (checkChanges?: boolean) => boolean, // SDK просит закрыть редактор
    sdkCb: (payload: string) => void, // коллбэк для sdk, позволяет отвечать на вызовы, отправленные из редактора
    onSaveInstanceState: () => string, // return editor State to SDK
    onRestoreInstanceState: (state: string) => void, // return editor State from SDK to Editor
};


// lang stores a string representing the language version as defined in RFC 5646:
// Tags for Identifying Languages (also known as BCP 47).
// Examples of valid language codes include "en", "en-US", "fr", "fr-FR", "es-ES", etc.
// Note that in Safari on iOS prior to 10.2, the country code returned is lowercase: "en-us", "fr-fr" etc.

// if (config.lang != null) {
//     if (/^en\b/.test(config.lang)) {
//         lang = E_ACCEPTED_LANGUAGES.en;
//     } else if (/^ru\b/.test(config.lang)) {
//         lang = E_ACCEPTED_LANGUAGES.ru;
//     }
// }
//
// this._editorConfig = {
//     lang,
//     sessionId: String(config.sessionId),
//     apiKey: String(config.apiKey),
//     appPackageId: config.appPackageId ? String(config.appPackageId) : null,
//     deviceId: config.deviceId ? String(config.deviceId) : null,
//     userId: config.userId ? String(config.userId) : null,
//     sdkVersion: String(config.sdkVersion),
//     ugcSdkVersion: String(config.ugcSdkVersion),
//
//     storyId: config.storyId ? parseInt(config.storyId) : null,
//     title: String(config.title),// or from payload
//     cover: String(config.cover), // or from payload
//     config: dynConfig,
//     storyPayload: isObject(config.storyPayload) ? config.storyPayload : null,
// };
//
// const dynConfig: EditorDynConfig = {
//     contentBaseUrl: String(config.config?.contentBaseUrl),
//     apiBaseUrl: String(config.config?.apiBaseUrl),
//     storySlidesLimit: parseInt(config.config?.storySlidesLimit),
//     storyElementsPerSlideLimit: parseInt(config.config?.storyElementsPerSlideLimit),
//     storyDefaultSlideDuration: parseInt(config.config?.storyDefaultSlideDuration),
//     messages: config.config?.messages
// };
//
//
// window.editorApi.init config
// window.editorApi.handleBack
// window.editorApi.close

