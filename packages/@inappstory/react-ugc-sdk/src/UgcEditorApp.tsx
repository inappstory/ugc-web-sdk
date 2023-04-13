import React, {useLayoutEffect, useReducer, useRef} from "react";
import {UgcEditorViewModelReact} from "./UgcEditorViewModelReact";
import {UgcEditorView} from "./UgcEditorView";

const UgcEditor: React.FC<{ safeAreaInsets?: { top: number, bottom: number} }> = ({ safeAreaInsets }) => {
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    const viewModel = useRef<UgcEditorViewModelReact>();
    useLayoutEffect(() => {
        if (viewModel.current == null) {
            viewModel.current = new UgcEditorViewModelReact();
            forceUpdate();
        }
        return () => {};
    }, []);

    if (viewModel.current) {
        viewModel.current._safeAreaInsets = safeAreaInsets;

        return <UgcEditorView viewModel={viewModel.current}/>;
    }

    // return false;
    return <></>;
};


export { UgcEditor };


