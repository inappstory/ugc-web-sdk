import { PropsWithChildren, useEffect, useState } from 'react';
import * as React from 'react';

declare let window: {
    IASReady: any;
    IAS: {
        StoryManager: any;
        AppearanceManager: any;
    };
};
export const IasConnector = ({ children }: PropsWithChildren) => {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        window.IASReady = ((d, s, id): void => {
            const fjs = d.getElementsByTagName(s)[0];
            const st = window.IASReady || {};
            if (d.getElementById(id)) return st;
            const js = d.createElement(s) as HTMLScriptElement;
            js.id = id;
            js.src = 'https://sdk.test.inappstory.com/v2.9.0/dist/js/IAS.js';
            js.async = true;
            js.charset = 'UTF-8';
            fjs?.parentNode?.insertBefore(js, fjs);
            st._e = [];
            st.ready = (f: () => void): void => {
                st._e.push(f);
            };
            return st;
        })(document, 'script', 'ias-wjs');

        window.IASReady.ready(() => setReady(true));
    });

    if (!ready) {
        return null;
    }
    return <>{children}</>;
};
