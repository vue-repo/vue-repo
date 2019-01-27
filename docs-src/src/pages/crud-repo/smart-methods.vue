<template>
    <content-page title="CRUD repository">
        <h2>Smart methods</h2>
        <p>
            To reduce the routine a bit more, smart methods have appeared:
        </p>
        <v-code>
            // If task is local-added - call flushAdded
            // If not - call upsert
            await taskRepo.smartUpsert(task)

            // Same as above but for active
            await taskRepo.smartUpsertActive(task)

            // Same as smartUpsert but alse activate
            await taskRepo.smartUpsertAndActivate(task)

            // If task is local-added - delete from added and deactivate if it was active
            // If task is local-deleted - call flushDeleted
            // Else - call delete
            await taskRepo.smartDelete(task)

            // Same as above but for active
            await taskRepo.smartDeleteActive(task)

        </v-code>
    </content-page>
</template>

<script lang="ts">
    import Vue from 'vue'
    export default Vue.extend({
        name: "smart-methods"
    })
</script>

<style lang="scss" scoped>

</style>
