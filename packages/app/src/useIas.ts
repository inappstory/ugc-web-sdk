import { createEvent, createStore } from 'effector';
import { useBeforeFirstRender } from './useBeforeFirstRender';
import { useStore } from 'effector-react';

const setManagers =
    createEvent<{ storyManager: any; appearanceManager: any }>();
const $managers = createStore<{
    storyManager: any;
    appearanceManager: any;
}>({ storyManager: null, appearanceManager: null }).on(
    setManagers,
    (state, value) => value
);

export const useIas = (
    createStoryManager: () => any,
    createAppearanceManager: () => any
) => {
    const managers = useStore($managers);
    useBeforeFirstRender(() => {
        if (managers.storyManager == null || managers.appearanceManager == null) {
            setManagers({
                storyManager: createStoryManager(),
                appearanceManager: createAppearanceManager(),
            });
        }
    });
    return managers;
};
