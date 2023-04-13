import React, {useLayoutEffect} from "react";
import logo from './logo.svg';
import './App.css';

import { UgcEditor, UgcSdk} from "@inappstory/react-ugc-sdk";

const StoriesFeed = () => {
    useLayoutEffect(() => {
        const openFeed = function () {

            const storyManagerConfig = {
                //apiKey: "JCPo0hB5l2efXrfWi9anB5Zmqa5rienq",
                // apiKey: "BXMCAAAAAAAAAAAAABIaIThgEhYUJk9CMBlDT0RQFDydJG5QbS6J1vaJf3hdOy334lhJgvuTaftNoLqPPPYWpg", // dd prod
                // apiKey: "JCPo0hB5l2efXrfWi9anB5Zmqa5rienq", // a.strebizh test
                // apiKey: "test-key", // prod test-key
                apiKey: "BSEBAAAAAAAAAAAAABYaIThgDx0GIhFYKhdBRhlHFCMoYAkNPDauAaJvpKu-CuqyqA3nU8OGJheFtlMBWIcbmRLHRX0", // test project 289
                appPackageId: "com.inappstory.webpreview",
                userId: "VekB1z6GPZdU6oeERJl4bA", // usually - hash from real user identifier
                tags: [], // Array<string>
                placeholders: {
                    user: "Guest"
                },
                imagePlaceholders: {
                    userAvatar: "image_url"
                },
                lang: "ru",
                UgcSdk
            };

            // StoryManager singleton instance
            const storyManager = new window.IAS.StoryManager(storyManagerConfig);

            // AppearanceManager instance
            const appearanceManager = new window.IAS.AppearanceManager();

            // appearance config
            appearanceManager.setCommonOptions({
                hasLike: true,
                hasFavorite: true
            })
            .setStoriesListOptions({
                title: {
                    content: '',
                    color: '#000',
                    font: 'normal',
                    marginBottom: 20,
                },
                card: {
                    title: {
                        color: 'black',
                        font: '14px/16px "Segoe UI Semibold"',
                        padding: 8
                    },
                    gap: 10,
                    height: 100,
                    variant: 'quad',
                    border: {
                        radius: 20,
                        color: 'blue',
                        width: 2,
                        gap: 3,
                    },
                    boxShadow: null,
                    opacity: 1,
                    mask: {
                        color: 'rgba(34, 34, 34, 0.3)'
                    },
                    opened: {
                        border: {
                            radius: null,
                            // todo убрать рамку у ячейки
                            color: 'transparent',

                            width: null,
                            gap: null,
                        },
                        boxShadow: null,
                        opacity: null,
                        mask: {
                            color: 'rgba(34, 34, 34, 0.1)'
                        },
                    },
                },
                // favoriteCard: {},
                layout: {
                    height: 0,
                    backgroundColor: 'transparent'
                },
                sidePadding: 20,
                topPadding: 20,
                bottomPadding: 20,
                bottomMargin: 17,
                navigation: {
                    showControls: false,
                    controlsSize: 48,
                    controlsBackgroundColor: 'white',
                    controlsColor: 'black'
                },
            })
            .setStoryReaderOptions({
                closeButtonPosition: 'left',
                scrollStyle: 'flat',
                sharePanel: {
                    targets: ["facebook", "twitter", "vk", "linkedin"]
                }
            }).setStoryFavoriteReaderOptions({
                title: {
                    content: "Favorite",
                    color: "white",
                    font: "14px/16px InternalPrimaryFont"
                }
            });

            // mount and start StoriesList widget
            // #stories_widget - html element selectors
            const storiesList = new storyManager.StoriesList("#stories_widget", appearanceManager, {feed: "default", useUgcCard: true});

            // 4. Override default loading animation
            storiesList.on('startLoad', loaderContainer => loaderContainer.style.background = 'url("https://inappstory.com/stories/loader.gif") center / 45px auto no-repeat transparent');
            storiesList.on('endLoad', (loaderContainer, loadedStoriesLength) => {
                loaderContainer.style.background = 'none';
                // {defaultListLength: number, favoriteListLength: number}
                console.log({loadedStoriesLength});
            });

            // 5. Show onboarding example
            // showOnboardingStories(appearanceManager: AppearanceManager, {customTags?: string})
            // customTags - for override tags from storyManager
            // feed - for select another feed for onboarding (default feed - "onboarding")
            // storyManager.showOnboardingStories(appearanceManager, {feed: "extraOnboarding"}).then(result => {
            // 	console.log({showOnboardingStoriesResult: result});
            // 	// result: boolean - were onboarding or not
            // });
            // or window.IAS.StoryManager.getInstance()

            // 6. Add events for internal statistics (optional)
            const publicEvents = ['clickOnStory', 'showSlide', 'showStory', 'closeStory', 'clickOnButton', 'likeStory', 'dislikeStory', 'favoriteStory', 'shareStory', 'shareStoryWithPath'];
            publicEvents.forEach((eventName) => storyManager.on(eventName, (payload) => console.log("event", eventName, payload)));

        };

        if (window.IASReady == null) {
            window.IASReady = (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0], st = window.IASReady || {};
                if (d.getElementById(id)) return st;
                js = d.createElement(s);
                js.id = id;
                js.src = "https://sdk.test.inappstory.com/v2.6.0/dist/js/IAS.js";
                js.async = true;
                //js.charset = "UTF-8";
                fjs.parentNode.insertBefore(js, fjs);
                st._e = [];
                st.ready = function(f) {
                    st._e.push(f);
                };
                return st;
            }(document, "script", "ias-wjs"));


            window.IASReady.ready(openFeed);

        } else {
            openFeed();
        }





        const popup = document.querySelector(".vkuiPopoutRoot--absolute");
        if (popup) {
            popup.parentElement.removeChild(popup);
        }

    }, []);

    return <div id="stories_widget"></div>;
}

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img width={100} src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
                <StoriesFeed/>
            </header>

            <UgcEditor safeAreaInsets={{top: 0, bottom: 0}}/>

        </div>
    );
}

export default App;
