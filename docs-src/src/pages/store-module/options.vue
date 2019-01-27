<template>
    <content-page title="Store module">
        <h2>Options</h2>
        <p>You can pass any options to annotations and handle it in middlewares</p>
        <v-code>
            import {IGetterOptions} from '@/StoreModule/annotations';
            import {addGetterMiddleware} from '@/StoreModule/middlewares';
            // Augment options interface
            declare module '@/StoreModule/annotations' {
                interface IGetterOptions {
                    cache: true
                }
            }

            addGetterMiddleware(
                (options, target, propertyKey, descriptor) => {
                    // do something with options. For example wrap getter method to decorator which will implement a cache
                }
            )
        </v-code>
    </content-page>
</template>

<script lang="ts">
    import Vue from 'vue'
    export default Vue.extend({
        name: "store-module-options"
    })
</script>

<style lang="scss" scoped>

</style>
