const path = require('path');
const TestPlugin = require('../test/testPlugin');

module.exports = {
    module: {
        rules: [
            // {
            //     test: /\.vue$/,
            //     loader: 'vue-loader'
            // },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset',
                generator: {
                    filename: 'image/[hash][ext][query]'
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 50 * 1024
                    }
                }
            },
            {
                test: /\.(css|less)$/,
                use: [
                    {
                        loader: path.resolve(__dirname, '../test/testLoader2'),
                        options: {
                            agg: 999
                        }
                    },
                    {
                        loader: path.resolve(__dirname, '../test/testLoader'),
                        options: {
                            name: 123
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new TestPlugin()
        // new VueLoaderPlugin()
    ]
};

