import React, {useEffect, useState} from "react";
import {useIas} from "../useIas";
import {createAppearanceManager, createStoryManager} from "../StoriesConfig";

export type UGCStoryListProps = { filter?: Record<string, unknown>, ugcCardClickHandler: () => void };

interface UGCStoriesList {
    ugcCardClickHandler: () => void;
}

const MOUNT_ID = "ugcStoryList";
export const UGCStoryList = ({filter = {}, ugcCardClickHandler}: UGCStoryListProps) => {
    const {storyManager, appearanceManager} = useIas(
        createStoryManager,
        createAppearanceManager
    );
    const [storyList, setStoryList] = useState<UGCStoriesList>();

    useEffect(() => {
        setStoryList(
            new storyManager.UGCStoriesList(`#${MOUNT_ID}`, appearanceManager, {
                filter,
                useUgcCard: true,
            })
        );
        // @ts-ignore
        return storyList?.destroy();
    }, []);

    useEffect(() => {
        if (storyList != null) {
            storyList.ugcCardClickHandler = ugcCardClickHandler;
        }
    }, [ugcCardClickHandler, storyList]);


    return <div id={MOUNT_ID} />;
};
