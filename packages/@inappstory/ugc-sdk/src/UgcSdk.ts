import { UgcEditorViewModel } from "./UgcEditorViewModel";
import {UgcEditorConfigurable} from "./UgcSdk.h";

export class UgcSdk {

    public static showEditor(ugcEditorConfigurable: UgcEditorConfigurable, payload?: Record<string, unknown>): void {
        if (UgcSdk._viewModel) {
            UgcSdk._viewModel.showUgcEditorView = true;
            UgcSdk._viewModel.showUgcEditorLoaderView = true;
            ugcEditorConfigurable.getUgcEditorConfig().then(config => {
                if (UgcSdk._viewModel) {
                    config.storyPayload = payload;
                    UgcSdk._viewModel.ugcEditorConfig = config;
                }
            });
        } else {
            throw new Error("UgcEditor component does not connected to App");
        }
    }

    static _viewModel?: UgcEditorViewModel;
    public static set viewModel(viewModel: UgcEditorViewModel) {
        UgcSdk._viewModel = viewModel;
    }

    public static get sdkVersionName(): string {
        const sdkVersionName = process.env.SDK_VERSION;
        return sdkVersionName || "0.0.0";
    }

    public static get sdkVersionCode(): number {
        const sdkVersionCode = process.env.SDK_VERSION_CODE;
        return sdkVersionCode ? parseInt(String(sdkVersionCode)) : 0;
    }

}
