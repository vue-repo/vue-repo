<template>
    <content-page title="CRUD repository">
        <h2>Local state</h2>
        <p>
            Sometimes you want to have an oppotunity to reset state of list to last saved state.
            Meet the "local state". Main idea here is to save changes of the list in separate state and have a getter "localList"
            which compute an actual local state. Added items will save to "added" state, deleted to "deleted". And localList will
            return a list without deleted items and with additional added items.
        </p>
        <v-code>
            // -- Simple example --
            await taskRepo.updateList()
            // Now list and localList are the same
            taskRepo.list // [{id: 1},{id: 2}]
            taskRepo.localList // [{id: 1},{id: 2}]
            // Let's add and delete items locally
            taskRepo
                .deleteLocal(taskRepo.last)
                .addLocal({id: null})
            taskRepo.list // [{id: 1},{id: 2}]
            taskRepo.localList // [{id: null},{id: 1}]
            // And send changes to server
            await taskRepo.flush()
        </v-code>
        <h2>Local list</h2>
        <v-code>
            // localList accessor
            taskRepo.localList

            // Helpful getters
            taskRepo.isLocalListEmpty // boolean
            taskRepo.localListItemByIndex(index) // task
            taskRepo.localListItemById(id) // task
            taskRepo.localListIndex(task) // number
            taskRepo.localListIndexById(id) // number
            taskRepo.localListMap // { [id: string | number]: task }
            taskRepo.localListIds // string[] | number[]
            taskRepo.localListLength // number
            taskRepo.localListLastIndex // number
            taskRepo.localListLastItem // task
            taskRepo.localListFirstItem // task
        </v-code>
        <h2>Local add</h2>
        <v-code>

            // Helpful getters
            taskRepo.addLocal(task) // add to added
            taskRepo.deleteAdded(task) // delete from added and deactivate if it was active
            taskRepo.deleteAllAdded() // delete all from added

            // Helpful getters
            taskRepo.hasAdded // boolean
            taskRepo.isAdded // boolean
            taskRepo.addedById(id) // task
            taskRepo.isAddedById(id) // boolean
            taskRepo.addedIndex(task) // number
            taskRepo.addedMap // { [id: string | number]: task }. Applicable if id generates on client side
        </v-code>
        <h2>Local delete</h2>
        <v-code>

            // Helpful getters
            taskRepo.deleteLocal(task) // add to deleted and deactivate if it was active
            taskRepo.deleteDeleted(task) // delete from deleted
            taskRepo.deleteAllDeleted() // delete all from deleted
            taskRepo.deleteActiveLocal() // add active to deleted and deactivate it

            // Helpful getters
            taskRepo.hasDeleted // boolean
            taskRepo.isDeleted // boolean
            taskRepo.deletedById(id) // task
            taskRepo.isDeletedById(id) // boolean
            taskRepo.deletedIndex(task) // number
            taskRepo.deletedMap // { [id: string | number]: task }
        </v-code>
    </content-page>
</template>

<script lang="ts">
    import Vue from 'vue'
    export default Vue.extend({
        name: "local-state"
    })
</script>

<style lang="scss" scoped>

</style>
