export const IS_BROWSER = typeof window !== 'undefined' && typeof window.document !== 'undefined'
export const IS_TOUCH = IS_BROWSER && 'ontouchstart' in window;


export const projects = [
    {
        label: 'Memory Game',
        describe: 'Un jeu de Memory développé pendant ma formation.',
        picture: 'memory-desktop.png',
        icons: [
            {
                label: 'NodeJS',
                icon: 'devicon-nodejs-plain'
            },
            {
                label: 'SASS',
                icon: 'devicon-sass-original'
            },

            {
                label: 'Bootstrap',
                icon: 'devicon-bootstrap-plain'
            },
        ],
        links: [
            {
                label: 'Voir le projet sur github',
                href: 'https://github.com/aangerformapro/memory-game',
                icon: 'devicon-github-original-wordmark'
            }
        ]

    }
];