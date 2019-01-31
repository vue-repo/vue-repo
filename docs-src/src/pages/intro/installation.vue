<template>
    <content-page title="Introduction">
        <h2>Installation</h2>

        <h3>NPM</h3>
        <v-code>npm install @vue-repo/vue-repo --save</v-code>

        <h3>Install typescript and allow decorators compiling</h3>
        <p>
            Note that if you don't want to write on typescript - you can use it only for compiling decorators.
            But we recommend you to use typescript because it gives you a super-power. Any changes in your app become more easy and reliable.
            Babel setup instruction will be added soon.
        </p>
        <v-code>
            // -- Typescript-based configuration --

            // install
            npm i --save-dev typescript ts-loader

            // tsconfig.json
            {
                "compilerOptions": {
                    "target": "esnext",
                    "moduleResolution": "node",
                    "experimentalDecorators": true,
                    "outDir": "./js"
                }
            }

            // webpack.conf.js
            {
                resolve: {
                    extensions: [".ts", ".tsx", ".js"]
                },
                module: {
                    rules: [
                        {
                            test: /\.ts|.js$/,
                            exclude: /node_modules/,
                            use: [
                                {
                                    loader: 'ts-loader',
                                    options: {
                                        appendTsSuffixTo: [/\.vue$/],
                                        transpileOnly: true
                                    }
                                }
                            ]
                        }
                    ]
                }
            }
        </v-code>
    </content-page>
</template>

<script lang="ts">
    import Vue from 'vue'
    export default Vue.extend({
        name: "installation"
    })
</script>

<style lang="scss" scoped>

</style>
