<template>
    <content-page title="CRUD repository">
        <h2>"Get" methods</h2>
        <v-code>
            // Send get request to server and activate response
            await taskRepository.getAndActivate(id)

            // Send get request to server
            // Replace task by response
            // Activate response if task was active
            await taskRepository.refreshItem(task)

            //Same as above but works by id
            await taskRepository.refreshItemById(id)
        </v-code>
    </content-page>
</template>

<script lang="ts">
    import Vue from 'vue'
    export default Vue.extend({
        name: "get-methods"
    })
</script>

<style lang="scss" scoped>

</style>
