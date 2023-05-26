export const IS_BROWSER = typeof window !== 'undefined' && typeof window.document !== 'undefined'
export const IS_TOUCH = IS_BROWSER && 'ontouchstart' in window;



const psrIcon = `<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="28px" height="28px" viewBox="0 0 32.000000 32.000000"
preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,32.000000) scale(0.100000,-0.100000)" fill="currentColor" stroke="none"><path d="M130 310 c-8 -5 -27 -11 -42 -15 -16 -3 -28 -12 -28 -20 0 -8 -12
-22 -26 -31 -19 -13 -24 -23 -20 -40 4 -13 1 -34 -6 -48 -9 -21 -8 -29 4 -43
9 -10 18 -27 20 -38 2 -11 13 -25 26 -31 12 -6 30 -17 39 -26 23 -19 104 -18
128 2 9 8 27 19 38 25 12 6 23 19 25 30 2 11 11 28 20 38 12 14 13 22 4 43 -7
14 -10 35 -6 48 4 17 -1 27 -20 40 -14 9 -26 23 -26 31 0 8 -12 17 -27 20 -16
4 -36 10 -45 16 -21 11 -38 11 -58 -1z m65 -170 l-60 -60 -34 34 c-30 30 -33
37 -21 51 12 14 15 14 35 -5 l21 -20 44 45 c39 40 46 43 59 30 14 -13 9 -22
-44 -75z" /></g></svg>`

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
                icon: 'devicon-github-original'
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
                icon: 'devicon-github-original'
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
                icon: psrIcon
            },
            {
                label: 'Voir le projet sur github',
                href: 'https://github.com/ngsoft/cache',
                icon: 'devicon-github-original'
            }
        ]

    },
    {
        label: 'Cookie Middleware',
        describe: 'Un Middleware PSR-15 qui permet de créer et de gérer des cookies SameSite dans un framework php compatible PSR-7.',
        picture: 'composer-project.png',
        href: 'https://packagist.org/packages/ngsoft/slim-cookie-middleware',
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
                icon: psrIcon
            },
            {
                label: 'Voir le projet sur github',
                href: 'https://github.com/ngsoft/slim-cookie-middleware',
                icon: 'devicon-github-original'
            }
        ]

    },
];