
module.exports = (ctx) => {


    const env = ctx.env ?? 'development';

    return {
        map: ctx.options.map,
        parser: ctx.options.parser,
        plugins: {
            'postcss-combine-media-query': env === 'development' ? {} : false,
            'postcss-preset-env': {
                autoprefixer: {
                    cascade: false,
                },
                features: {
                    // creates fallback duplicates properties for older browsers
                    // adds ~200 lines to bootstrap mini
                    'custom-properties': true,
                },
            },
            cssnano: env === 'development' ? false : { preset: 'default' },
        }
    };
};