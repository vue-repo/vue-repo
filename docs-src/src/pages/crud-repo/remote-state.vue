<template>
    <content-page title="CRUD repository">
        <h2>Remote state</h2>
        <p>Easy change remote state and don't worry about local state updating. Clever repo do it for you:</p>
        <v-code>
            // Send to server add request
            // Add response to list
            await taskRepo.add(task)

            // Same as above, but also activate response
            await taskRepo.addAndActivate(task)

            // Send to server edit request
            // Replace task by response in list
            // Replace active by response if it was active
            await taskRepo.edit(task)

            // Looks for id existence in task and choose add or edit method to call
            await taskRepo.upsert(task)

            // Same as upsert but also activate response
            await taskRepo.upsertAndActivate(task)

            // Upsert active task
            await taskRepo.upsertActive()

            // Send to server delete request
            // Delete task from list
            // Deactivate if it was active
            await taskRepo.delete(task)

            // Delete active
            await taskRepo.deleteActive()

            // Delete by index in localList
            await taskRepo.deleteByIndex(index)
        </v-code>
    </content-page>
</template>

<script lang="ts">
    import Vue from 'vue'
    export default Vue.extend({
        name: "remote-state"
    })
</script>

<style lang="scss" scoped>

</style>
