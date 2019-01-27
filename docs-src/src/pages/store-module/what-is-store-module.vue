<template>
    <content-page title="Store module">
        <h2>What is Store-module?</h2>
        <p>
            It's a main base class, which purpose is to properties reactive.
            Let's look how we can use it.
        </p>
        <h2>@State</h2>
        <p>@State directive apply to class properties and makes it reactive. You can use it in your Vue components as it were in its "data" block.</p>
        <v-code>
            class TaskRepo extends StoreModule {
                @State()
                public someProp: string
            }
        </v-code>
        <h2>@Mutation</h2>
        <p>Ok now we need to change this state. @Mutation is a method which change <b>local</b> state</p>
        <v-code>
            class TaskRepo extends StoreModule {
                @State()
                public someProp: string
                @Mutation()
                public setSomeProp (val: string) {
                    this.someProp = val
                }
            }
        </v-code>
        <p>You can change it directly by v-model="taskRepo.someProp" or taskRepo.someProp = 'new val' but in large applications it can be a cause of misunderstanding of your dataflow.</p>
        <!--TODO describe more about datafrow problem-->
        <h2>@Action</h2>
        <p>Action is an async state change. For example you need to update someState on server side</p>
        <v-code>
            class TaskRepo extends StoreModule {
                @State()
                public someProp: string
                @Mutation()
                public setSomeProp (val: string) {
                    this.someProp = val
                }
                @Action()
                public updateSomeProp (val: string) {
                    const resp = Api.request({
                        path: 'api/some/edit',
                        urlParams: { val }
                    })
                    this.setSomeProp(resp)
                }
            }
        </v-code>
        <h2>@Getter</h2>
        <p>Getter is a reactive computed property. It could be based on your state or not.</p>
        <v-code>
            class TaskRepo extends StoreModule {
                @State()
                public someProp: string
                @Mutation()
                public setSomeProp (val: string) {
                    this.someProp = val
                }
                @Action()
                public updateSomeProp (val: string) {
                    const resp = Api.request({
                        path: 'api/some/edit',
                        urlParams: { val }
                    })
                    this.setSomeProp(resp)
                }
                @Getter()
                public get someComputedProp () {
                    return this.someState + '_' + Date.now()
                }
            }
        </v-code>
    </content-page>
</template>

<script lang="ts">
    import Vue from 'vue'
    export default Vue.extend({
        name: "store-module-middlewares"
    })
</script>

<style lang="scss" scoped>

</style>
