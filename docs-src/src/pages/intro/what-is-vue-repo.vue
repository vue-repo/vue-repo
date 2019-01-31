<template>
    <content-page title="Introduction">
        <h2>Quick start</h2>
        <p>
            It's modular, easy-scalable, class-based, reactive state-management implementation, written on typescript.
            And it has several base classes from the box which will simplify your work and significantly reduce the routine.
            Look at that:
        </p>
        <h2>1 - Extend abstract base class and implement its abstract methods</h2>
        <v-code>
            // You can access api description from this.api
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
        <h2>2 - Create your repo and describe api pathes</h2>
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
        <h2>3 - You're ready to use your first repo!</h2>
        <v-code>
            // -- Case 1 --
            // Get from server list of tasks and save it to repo
            await taskRepo.updateList()
            taskRepo.list // list of tasks

            // -- Case 2 --
            await taskRepo.updateList()
            // Activate first task
            taskRepo.activateFirst()
            taskRepo.hasActive // true
            taskRepo.isActive(taskRepo.list[0]) // true
            taskRepo.isActive(taskRepo.list[3]) // false
            // Edit name of active task
            taskRepo.active.name = 'edited'
            // Save to server edited task and change local object by response
            await taskRepo.editActive()

            // -- Case 3 --
            // Add new task on server and local
            await taskRepo.add({ name: 'new-task' })

            // -- Case 4 --
            // Add new task local
            taskRepo.addLocal({ name: 'new-unsaved-task' })
            // Change its name
            taskRepo.first.name = 'new-saved-task'
            // Save to server and change object by response
            await taskRepo.flushAdded(taskRepo.first)

            // -- Case 5 --
            // Add new task local
            taskRepo.addLocal({ name: 'new-unsaved-task' })
            // Delete all local-added tasks
            taskRepo.deleteAllAdded()

            // -- Case 6 --
            await taskRepo.updateList()
            // Activate item by index
            taskRepo.activateByIndex(2)
            taskRepo.active // {id: 2, name: 'Name'}
            taskRepo.listItemByIndex(2) // {id: 2, name: 'Name'}
            taskRepo.isActiveChangedAfterActivation // false
            // Edit active item
            taskRepo.active.name = 'Edited name'
            taskRepo.active // {id: 2, name: 'Edited name'}
            taskRepo.listItemByIndex(2) // {id: 2, name: 'Edited name'}
            taskRepo.isActiveChangedAfterActivation // true
            taskRepo.activeInitialCopy // {id: 2, name: 'Name'}
            // Reset active item to last saved state
            taskRepo.resetActiveToInitialState()
            taskRepo.active // {id: 2, name: 'Name'}
            taskRepo.listItemByIndex(2) // {id: 2, name: 'Name'}
            taskRepo.isActiveChangedAfterActivation // false
        </v-code>
    </content-page>
</template>

<script lang="ts">
    import Vue from 'vue'
    export default Vue.extend({
        name: "what-is-vue-repo"
    })
</script>

<style lang="scss" scoped>

</style>
