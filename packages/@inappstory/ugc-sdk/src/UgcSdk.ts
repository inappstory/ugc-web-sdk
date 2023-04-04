import type {UgcSdkConfig} from "./UgcSdk.h";
import {UgcEditorViewModel} from "~/UgcEditorViewModel";

export class UgcSdk {

    constructor(private ugcEditorConfig: UgcSdkConfig) {}

    public openUgcCardClickHandler() {

        if (UgcSdk._viewModel) {

            UgcSdk._viewModel.ugcEditorConfig = this.ugcEditorConfig;

            UgcSdk._viewModel.showUgcEditorView = true;
            UgcSdk._viewModel.showUgcEditorLoaderView = true;
        } else {
            throw new Error("UgcEditor component does not connected to App");
        }
    }

    static _viewModel?: UgcEditorViewModel;
    public static set viewModel(viewModel: UgcEditorViewModel) {
        UgcSdk._viewModel = viewModel;
    }

}
