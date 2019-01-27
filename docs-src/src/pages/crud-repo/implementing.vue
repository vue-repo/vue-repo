<template>
    <content-page title="CRUD repository">
        <h2>Implementing</h2>
        <p>
            First you should create your base crud repo by extending from AbstractCRUDRepo and implementing its several abstract methods which will call the server side.
            It can look something like this:
        </p>
        <v-code>
            class CRUDRepo&lt;T&gt; extends IWithId> extends AbstractCRUDRepository&lt;T&gt; {
                async sendAddReq(instance: T, ...params) {
                    return await ApiClient.send({
                        path: this.api.add,
                        bodyParams: instance
                    })
                }
                async sendDeleteReq(instance: T, ...params) {
                    return await ApiClient.send({
                        path: this.api.delete,
                        urlParams: {id: instance.id}
                    })
                }
                async sendEditReq(instance: T, ...params) {
                    return await ApiClient.send({
                        path: this.api.edit,
                        bodyParams: instance
                    })
                }
                async sendGetReq(id, ...params) {
                    return await ApiClient.send({
                        path: this.api.get,
                        urlParams: {id: instance.id}
                    })
                }
                async sendListReq(...params) {
                    return await ApiClient.send({path: this.api.list})
                }
            }
        </v-code>
        <p>
            Now you can create a repo for entity that has a crud methods by simple extending your CRUDRepo and you'll got all of functionality.
            Passing of entity type to CRUDRepo gives us full types control in repo.
            Passing of api description need to use it in you api client to send correct requests.
        </p>
        <v-code>
            class TaskRepo extends CRUDRepo&lt;Task&gt; {
                super({
                    list: 'api/tasks/list',
                    get: 'api/tasks/get',
                    add: 'api/tasks/add',
                    edit: 'api/tasks/edit',
                    delete: 'api/tasks/delete'
                })
            }
            export const taskRepo = new TaskRepo()
        </v-code>
    </content-page>
</template>

<script lang="ts">
    import Vue from 'vue'
    export default Vue.extend({
        name: "implementing"
    })
</script>

<style lang="scss" scoped>

</style>
