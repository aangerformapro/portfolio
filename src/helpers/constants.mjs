import { ICON_NETBEANS, ICON_PSR, ICON_TWIG } from "../components/icons.mjs";
import { Tag } from "../components/skills.mjs";



export const IS_BROWSER = typeof window !== 'undefined' && typeof window.document !== 'undefined';
export const IS_TOUCH = IS_BROWSER && 'ontouchstart' in window;




export const PROJECT_LIST = [
    {
        label: 'Memory Game',
        describe: 'Un jeu de Memory développé pendant ma formation.',
        picture: ['memory-desktop.webp', 'memory-desktop.png'],
        href: 'https://aanger-memory.netlify.app/',
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
                icon: 'devicon-github-original'
            }
        ]

    },

    {
        label: 'Movie Quiz',
        describe: 'Un jeu ou on doit deviner des noms de films ou de séries avec une image',
        picture: ['movie-quiz.webp', 'movie-quiz.png'],
        href: 'https://aa-movie-game.netlify.app/',
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

            {
                label: 'Svelte',
                icon: 'devicon-svelte-plain'
            },
        ],
        links: [
            {
                label: 'Voir le projet sur github',
                href: 'https://github.com/aangerformapro/movie-quiz',
                icon: 'devicon-github-original'
            }
        ]

    },
    {
        label: 'Birthday Manager',
        describe: 'Un gestionnaire pour gérer les cadeaux d\'anniversaire',
        picture: ['b-manager.webp', 'b-manager.png'],
        href: 'https://aa-bmanager.netlify.app/',
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
                label: 'Tailwind',
                icon: 'devicon-tailwindcss-plain'
            },

            {
                label: 'Vue',
                icon: 'devicon-vuejs-plain'
            },
        ],
        links: [
            {
                label: 'Voir le projet sur github',
                href: 'https://github.com/aangerformapro/mes-anniversaires',
                icon: 'devicon-github-original'
            }
        ]

    },
    {
        label: 'Portfolio',
        describe: 'Ce portfolio.',
        picture: ['portfolio.webp', 'portfolio.png'],
        href: './',
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
        label: 'Guts Out',
        describe: 'Un jeu en Javascript développé en 2 jours qui utilise les canvas pendant un événement OnlineFormapro GameJam 2023 du 5/07 au 6/07/2023.',
        picture: ['gutsout.webp', 'gutsout.png'],
        href: 'https://guts-out.netlify.app/',
        icons: [
            {
                label: 'NodeJS',
                icon: 'devicon-nodejs-plain'
            },

            {
                label: 'SASS',
                icon: 'devicon-sass-original'
            },


        ],
        links: [
            {
                label: 'Voir le projet sur github',
                href: 'https://github.com/aangerformapro/gamejam',
                icon: 'devicon-github-original'
            }
        ]

    },
    {
        label: 'DailySitter',
        describe: 'Une plateforme de mise en relation de parents avec des assistantes maternelles développé en php',
        picture: ['dailysitter.webp', 'dailysitter.png'],
        href: 'https://dailysitter.000webhostapp.com/',
        icons: [
            {
                label: 'PHP',
                icon: 'devicon-php-plain'
            },

            {
                label: 'MySQL',
                icon: 'devicon-mysql-plain'
            },

            {
                label: 'SASS',
                icon: 'devicon-sass-original'
            },

            {
                label: 'Bootstrap',
                icon: 'devicon-bootstrap-plain'
            },

            {
                label: 'NodeJS',
                icon: 'devicon-nodejs-plain'
            },


        ],
        links: [
            {
                label: 'Voir le projet sur github',
                href: 'https://github.com/aangerformapro/nounous',
                icon: 'devicon-github-original'
            }
        ]

    },


    {
        label: 'Cache',
        describe: 'Une librairie PSR-6/PSR-16/React/Laravel/Doctrine qui est compatible avec la majorité des moteurs de cache.',
        picture: ['composer-project.webp', 'composer-project.png'],
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
                icon: ICON_PSR
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
        picture: ['composer-project.webp', 'composer-project.png'],
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
                icon: ICON_PSR
            },
            {
                label: 'Voir le projet sur github',
                href: 'https://github.com/ngsoft/slim-cookie-middleware',
                icon: 'devicon-github-original'
            }
        ]

    },
];


export const TAG_ICONS = [
    [
        Tag.HTML,
        'HTML 5',
        '<i class="devicon-html5-plain-wordmark colored"></i>'
    ],
    [
        Tag.CSS,
        'CSS 3',
        '<i class="devicon-css3-plain-wordmark colored"></i>'
    ],
    [
        Tag.JS,
        'JavaScript ESNext',
        '<i class="devicon-javascript-plain colored"></i>'
    ],
    [
        Tag.PHP,
        'PHP [ 7.4 - 8.2 ]',
        '<i class="devicon-php-plain colored"></i>'
    ],
    [
        Tag.IDE,
        'Environnement de Développement',
        '<i class="bi bi-code-slash"></i>'
    ],
];



export const SKILLS = [

    {
        tags: [Tag.HTML, Tag.CSS],
        label: 'Responsive Design',
        describe: 'Responsive',
        icon: '<i class="bi bi-phone"></i>'
    },
    {
        tags: [Tag.HTML],
        label: 'Search Engine Optimization',
        describe: 'SEO',
        icon: '<i class="devicon-google-plain colored"></i>'
    },


    {
        tags: [Tag.HTML, Tag.CSS, Tag.JS],
        label: 'Bootstrap',
        describe: 'Bootstrap',
        icon: '<i class="devicon-bootstrap-plain colored"></i>'
    },
    {
        tags: [Tag.HTML, Tag.CSS],
        label: 'Tailwind',
        describe: 'Tailwind',
        icon: '<i class="devicon-tailwindcss-plain colored"></i>'
    },


    {
        tags: [Tag.HTML, Tag.PHP],
        label: 'Twig',
        describe: 'Twig',
        icon: ICON_TWIG
    },

    {
        tags: [Tag.CSS],
        label: 'SaSS',
        describe: 'SaSS',
        icon: '<i class="devicon-sass-original colored"></i>'
    },
    {
        tags: [Tag.JS],
        label: 'Node JS',
        describe: 'NodeJS',
        icon: '<i class="devicon-nodejs-plain colored"></i>'
    },


    {
        tags: [Tag.JS, Tag.IDE],
        label: 'WebPack',
        describe: 'WebPack',
        icon: '<i class="devicon-webpack-plain colored"></i>',
    },

    {
        tags: [Tag.JS],
        label: 'React',
        describe: 'React',
        icon: '<i class="devicon-react-original colored"></i>',
    },
    {
        tags: [Tag.JS],
        label: 'Next.js',
        describe: 'Next.js',
        icon: '<i class="devicon-nextjs-original colored"></i>',
    },

    {
        tags: [Tag.JS],
        label: 'Vue.js',
        describe: 'Vue',
        icon: '<i class="devicon-vuejs-plain colored"></i>',
    },
    {
        tags: [Tag.JS],
        label: 'Nuxt',
        describe: 'Nuxt',
        icon: '<i class="devicon-nuxtjs-plain colored"></i>',
    },
    {
        tags: [Tag.IDE],
        label: 'Figma',
        describe: 'Figma',
        icon: '<i class="devicon-figma-plain colored"></i>'
    },

    {
        tags: [Tag.IDE],
        label: 'Git',
        describe: 'Git',
        icon: '<i class="devicon-git-plain colored"></i>',
    },
    {
        tags: [Tag.IDE],
        label: 'Github',
        describe: 'Github',
        icon: '<i class="devicon-github-original colored"></i>',
    },

    {
        tags: [Tag.IDE],
        label: 'GitLab',
        describe: 'GitLab',
        icon: '<i class="devicon-gitlab-plain colored"></i>',
    },



    {
        tags: [Tag.PHP],
        label: 'Laravel',
        describe: 'Laravel',
        icon: '<i class="devicon-laravel-plain colored"></i>',
    },

    {
        tags: [Tag.PHP],
        label: 'Doctrine',
        describe: 'Doctrine',
        icon: '<i class="devicon-doctrine-plain colored"></i>',
    },
    {
        tags: [Tag.IDE],
        label: 'Linux',
        describe: 'Ubuntu',
        icon: '<i class="devicon-ubuntu-plain colored"></i>',
    },
    {
        tags: [Tag.IDE],
        label: 'Windows [7-11]',
        describe: 'Windows',
        icon: '<i class="devicon-windows8-original colored"></i>',
    },
    {
        tags: [Tag.IDE],
        label: 'MacOS',
        describe: 'MacOS',
        icon: '<i class="devicon-apple-original colored"></i>',
    },
    {
        tags: [Tag.IDE],
        label: 'Visual Studio Code',
        describe: 'VSCode',
        icon: '<i class="devicon-vscode-plain colored"></i>',
    },

    {
        tags: [Tag.IDE],
        label: 'The hackable text editor',
        describe: 'Atom',
        icon: '<i class="devicon-atom-original colored"></i>',
    },

    {
        tags: [Tag.IDE],
        label: 'SSH',
        describe: 'SSH',
        icon: '<i class="devicon-ssh-original-wordmark colored"></i>',
    },

    {
        tags: [Tag.PHP, Tag.IDE],
        label: 'Composer',
        describe: 'Composer',
        icon: '<i class="devicon-composer-line colored"></i>',
    },
    {
        tags: [Tag.JS],
        label: 'Svelte / Sveltekit',
        describe: 'Svelte',
        icon: '<i class="devicon-svelte-plain colored"></i>',
    },

    {
        tags: [Tag.PHP],
        label: 'Symfony',
        describe: 'Symfony',
        icon: '<i class="devicon-symfony-original colored"></i>',
    },

    {
        tags: [Tag.PHP],
        label: 'CakePHP',
        describe: 'CakePHP',
        icon: '<i class="devicon-cakephp-plain colored"></i>',
    },

    {
        tags: [Tag.PHP],
        label: 'SlimPHP',
        describe: 'SlimPHP',
        icon: '<img width="32" height="32" src="./assets/pictures/icons/slimphp.webp" data-src="./assets/pictures/icons/slimphp.png" alt="SlimPHP">',
    },
    {
        tags: [Tag.PHP, Tag.IDE],
        label: 'PHP Standards Recommendations',
        describe: 'PSR',
        icon: ICON_PSR,
    },
    {
        tags: [Tag.JS, Tag.IDE],
        label: 'Node Package Manager',
        describe: 'NPM',
        icon: '<i class="devicon-npm-original-wordmark colored"></i>',
    },
    {
        tags: [Tag.JS, Tag.IDE],
        label: 'Yarn Package Manager',
        describe: 'yarn',
        icon: '<i class="devicon-yarn-plain colored"></i>',
    },
    {
        tags: [Tag.IDE],
        label: 'Bash',
        describe: 'Bash',
        icon: '<i class="devicon-bash-plain colored"></i>',
    },

    {
        tags: [Tag.IDE],
        label: 'Python',
        describe: 'Python',
        icon: '<i class="devicon-python-plain colored"></i>',
    },

    {
        tags: [Tag.IDE],
        label: 'Apache',
        describe: 'Apache',
        icon: '<i class="devicon-apache-line colored"></i>',
    },




    {
        tags: [Tag.IDE, Tag.PHP],
        label: 'SQLite',
        describe: 'SQLite',
        icon: '<i class="devicon-sqlite-plain colored"></i>',
    },



    {
        tags: [Tag.IDE, Tag.PHP],
        label: 'MySQL / MariaDB',
        describe: 'MySQL',
        icon: '<i class="devicon-mysql-plain colored"></i>',
    },


    {
        tags: [Tag.IDE],
        label: 'Apache NetBeans',
        describe: 'NetBeans',
        icon: ICON_NETBEANS,
    },


    {
        tags: [Tag.JS, Tag.IDE],
        label: 'Electron',
        describe: 'Electron',
        icon: '<i class="devicon-electron-original colored"></i>',
    },

    {
        tags: [Tag.JS],
        label: 'JQuery',
        describe: 'JQuery',
        icon: '<i class="devicon-jquery-plain colored"></i>',
    },

];

