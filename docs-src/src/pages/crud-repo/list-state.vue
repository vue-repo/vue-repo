<template>
    <content-page title="CRUD repository">
        <h2>List state</h2>
        <p>
            Usually there are a list of objects for each entity in our app, which we get from server, save it local and draw a view.
            It can be a table where each row is an object from list.
            Let's look how we can work with lists vue-repo:
        </p>
        <v-code>
            // List of tasks accessor
            taskRepo.list

            // Get list of tasks from server and save it to "list" state
            await taskRepo.updateList()

            // Or set list local
            taskRepo.setList(listOfTasks)

            // Clear list
            taskRepo.clearList()

            // Some helpful getters
            taskRepo.hasList // boolean
            taskRepo.isListEmpty // boolean
            taskRepo.listItemByIndex(index) // task
            taskRepo.listItemById(id) // task
            taskRepo.listIndex(task) // number
            taskRepo.listIndexById(id) // number
            taskRepo.listMap // { [id: string | number]: task }
            taskRepo.listIds // string[] | number[]
            taskRepo.listLength // number
            taskRepo.listLastIndex // number
            taskRepo.listLastItem // task
            taskRepo.listFirstItem // task
        </v-code>
        <p>
            Easy and very helpful, isn't it?
        </p>
    </content-page>
</template>

<script lang="ts">
    import Vue from 'vue'
    export default Vue.extend({
        name: "list-state"
    })
</script>

<style lang="scss" scoped>

</style>
