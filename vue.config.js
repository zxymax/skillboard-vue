module.exports = {
    chainWebpack: (config) => {
        // GraphQL Loader
        config.module
            .rule('graphql')
            .test(/\.graphql$/)
            .use('graphql-tag/loader')
            .loader('graphql-tag/loader')
            .end();
    },
    configureWebpack: {
        devtool: 'source-map',
    },
    devServer: {
        public: 'skillboard.local',
        host: '0.0.0.0',
        port: 54400,
        disableHostCheck: true,
    },
};
