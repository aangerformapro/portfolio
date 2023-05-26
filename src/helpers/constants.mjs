export const IS_BROWSER = typeof window !== 'undefined' && typeof window.document !== 'undefined'
export const IS_TOUCH = IS_BROWSER && 'ontouchstart' in window;


export const PROJECT_LIST = [
    {
        label: 'Memory Game',
        describe: 'Un jeu de Memory développé pendant ma formation.',
        picture: 'memory-desktop.png',
        href: 'https://aanger-memory.netlify.app/',
        icons: [
            {
                label: 'NodeJS',
                icon: 'devicon-nodejs-plain'
            },
            {
                label: 'Babel',
                icon: 'devicon-babel-plain'
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

    },
    {
        label: 'Portfolio',
        describe: 'Ce portfolio.',
        picture: 'portfolio.png',
        href: '',
        icons: [
            {
                label: 'NodeJS',
                icon: 'devicon-nodejs-plain'
            },
            {
                label: 'Babel',
                icon: 'devicon-babel-plain'
            },
            {
                label: 'SASS',
                icon: 'devicon-sass-original'
            },

            {
                label: 'Bootstrap',
                icon: 'devicon-bootstrap-plain'
            }
        ],
        links: [
            {
                label: 'Voir le projet sur github',
                href: 'https://github.com/aangerformapro/portfolio',
                icon: 'devicon-github-original-wordmark'
            }
        ]

    },
    {
        label: 'Cache',
        describe: 'Une librairie PSR-6/PSR-16/React/Laravel/Doctrine qui est compatible avec la majorité des moteurs de cache.',
        picture: 'composer-project.png',
        href: 'https://packagist.org/packages/ngsoft/cache',
        icons: [
            {
                label: 'PHP',
                icon: 'devicon-php-plain'
            },
            {
                label: 'Composer',
                icon: 'devicon-composer-line'
            },

        ],

        links: [
            {
                label: 'Voir les recommendations PSR',
                href: 'https://www.php-fig.org/psr/',
                icon: 'customicon-php-fig customicon-28px'
            },
            {
                label: 'Voir le projet sur github',
                href: 'https://github.com/ngsoft/cache',
                icon: 'devicon-github-original-wordmark'
            }
        ]

    },

];