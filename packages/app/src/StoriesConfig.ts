
const storyManagerConfig = {
    // apiKey: 'BSEBAAAAAAAAAAAAABYaIThgDx0GIhFYKhdBRhlHFCMoYAkNPDauAaJvpKu-CuqyqA3nU8OGJheFtlMBWIcbmRLHRX0',
    apiKey: 'BSoAAAAAAAAAAAAAABYaIThgDx0GIhFYKhdBRhlHFCMoYAkNcQqZR7Czlob66R4MWU_OqlT3NT2JCAWHG8wJwRp68B8',
    userId: null,
    appPackageId: "com.inappstory.webpreview",
    tags: [],
    placeholders: {},
    lang: 'en',
    defaultMuted: true,
};

export const createStoryManager = () => {
    // @ts-ignore
    const storyManager = new window.IAS.StoryManager(storyManagerConfig);

    storyManager.on('clickOnStory', (payload: any) =>
        console.log('clickOnStory', { payload })
    );
    storyManager.on('clickOnFavoriteCell', (payload: any) =>
        console.log('clickOnFavoriteCell', { payload })
    );
    storyManager.on('showStory', (payload: any) =>
        console.log('showStory', { payload })
    );
    storyManager.on('closeStory', (payload: any) =>
        console.log('closeStory', { payload })
    );
    storyManager.on('showSlide', (payload: any) =>
        console.log('showSlide', { payload })
    );
    storyManager.on('clickOnButton', (payload: any) =>
        console.log('clickOnButton', { payload })
    );
    storyManager.on('likeStory', (payload: any) =>
        console.log('likeStory', { payload })
    );
    storyManager.on('dislikeStory', (payload: any) =>
        console.log('dislikeStory', { payload })
    );
    storyManager.on('favoriteStory', (payload: any) =>
        console.log('favoriteStory', { payload })
    );
    storyManager.on('shareStory', (payload: any) =>
        console.log('shareStory', { payload })
    );
    storyManager.on('shareStoryWithPath', (payload: any) =>
        console.log('shareStoryWithPath', { payload })
    );

    // btn handler
    storyManager.storyLinkClickHandler = (payload: any) => {
        console.log({ payload });
        if (payload.data.url != null) {
            window.open(payload.data.url, '_blank');
        }
    };

    return storyManager;
};

export const createAppearanceManager = () => {
    // @ts-ignore
    const appearanceManager = new window.IAS.AppearanceManager();
    appearanceManager
        .setCommonOptions({
            hasLike: true,
            hasFavorite: true,
        })
        .setStoriesListOptions({
            card: {
                title: {
                    color: 'black',
                    font: 'bold normal 11px/13px "InternalPrimaryFont"',
                    padding: '6px 0 0 0',
                    lineClamp: 2,
                    textAlign: 'center',
                    position: 'cardOutsideBottom',
                },
                gap: 10,
                height: 78,
                variant: 'quad',
                border: {
                    radius: 26,
                    color: 'transparent',
                    width: 2,
                    gap: 4,
                    gradient: 'linear-gradient(130deg, #F97BF5, #60D7FD)',
                },
                boxShadow: null,
                opacity: 1,
                mask: {
                    color: 'rgba(34, 34, 34, 0.3)',
                },
                svgMask: null,
                opened: {
                    border: {
                        radius: 26,
                        color: 'transparent',
                        width: 2,
                        gap: 4,
                    },
                    boxShadow: null,
                    opacity: null,
                    mask: {
                        color: 'rgba(34, 34, 34, 0.1)',
                    },
                    svgMask: null,
                },
            },
            favoriteCard: {
                title: {
                    content: 'Saved',
                },
            },
            ugcCard: {
                title: {
                    content: 'Ugc',
                    color: 'black',
                },
                border: {
                    color: 'transparent',
                    gradient: 'linear-gradient(37deg,red,orange)',
                },
                backgroundColor: 'blue',
                image: {
                    svgSrc: {
                        baseState: `<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M50 85.5C69.6061 85.5 85.5 69.6061 85.5 50C85.5 30.3939 69.6061 14.5 50 14.5C30.3939 14.5 14.5 30.3939 14.5 50C14.5 69.6061 30.3939 85.5 50 85.5Z" stroke="white" stroke-width="2"/>
<path d="M50.5 34.5V65.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M34.5 49.5H65.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
                    },
                },
                mask: {
                    color: 'rgba(34, 34, 34, 0)',
                    linearGradient: [
                        {
                            direction: 'to bottom',
                            points: [
                                'rgba(0, 0, 0, 0) 48.74%',
                                'rgba(255, 0, 0, 0.6) 75.3%',
                                'rgba(255, 0, 0, 0.6) 100%',
                            ],
                        },
                    ],
                },
            },
            layout: {
                height: 0,
                backgroundColor: 'transparent',
            },
            sidePadding: 0,
            topPadding: 0,
            bottomPadding: 0,
            bottomMargin: 0,
            navigation: {
                showControls: false,
                controlsSize: 48,
                controlsBackgroundColor: 'white',
                controlsColor: 'black',
            },
        })
        .setStoryReaderOptions({
            closeButtonPosition: 'right',
            scrollStyle: 'flat',
            // loader: {
            //   default: {
            //     color: "transparent",
            //     accentColor: "white"
            //   }
            // }
            slideBorderRadius: 5,
        })
        .setStoryFavoriteReaderOptions({
            title: {
                content: 'Favorite',
                font: '1.6rem/1.4 InternalPrimaryFont',
                color: 'white',
            },
        });

    return appearanceManager;
};

export const UGCPayloadAndFilter = {prop1: "test", prop2: "test2"};
