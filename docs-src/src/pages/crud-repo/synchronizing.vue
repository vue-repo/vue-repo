<template>
    <content-page title="CRUD repository">
        <h2>Synchronizing of local and remote states</h2>
        <p>
            After you do changes of local state you will need an oppotunity to send this changes to server:
        </p>
        <v-code>
            // If task is not local-added - throw error
            // Send add request to server
            // Delete from local-added
            // Add response to list
            // Activate response if task was active
            await taskRepo.flushAdded(task)

            // Same as above but for all local-added tasks
            await taskRepo.flushAllAdded()

            // If task is not local-deleted - throw error
            // Send delete request to server
            // Delete from local-deleted
            // Delete task from list
            // Deactivate if task was active
            await taskRepo.flushDeleted(task)

            // Same as above but for all local-deleted tasks
            await taskRepo.flushAllDeleted()

            // Call flushAllAdded and flushAllDeleted
            await taskRepo.flush()
        </v-code>
    </content-page>
</template>

<script lang="ts">
    import Vue from 'vue'
    export default Vue.extend({
        name: "synchronizing"
    })
</script>

<style lang="scss" scoped>

</style>
