<template>
    <content-page title="CRUD repository">
        <h2>Active state</h2>
        <p>
            Often we want to activate locally some item to edit, delete or something else in future.
            That's how we can work with active items in vue-repo:
        </p>
        <v-code>
            // Active task accessor
            taskRepo.active

            // Set task to active
            taskRepo.activate(task)
            taskRepo.activateFirst()
            taskRepo.activateLast()
            taskRepo.activateByIndex(index)

            // Activate task2 if task1 is active
            taskRepo.activateInstead(task1, task2)
            taskRepo.activateInsteadById(task1.id, task2)

            // Clear active state
            taskRepo.deactivate()
            taskRepo.deactivateIfActive(task)

            // Helpful getters
            taskRepo.hasActive // boolean
            taskRepo.isActive(task) // boolean
            taskRepo.isActiveById(task.id) // boolean
            taskRepo.isActiveNew // boolean
        </v-code>
        <p>
            A cool feature that when item is activating, repo saves a copy(by deep cloning) to state called "activeInitialCopy".
            It gives us a bit of power:
        </p>
        <v-code>
            taskRepo.isActiveChangedAfterActivation // true if "active" is not deep equals to "activeInitialCopy"
            taskRepo.resetActiveToInitialState() // set copy of "activeInitialCopy" to active and change it in list
        </v-code>
    </content-page>
</template>

<script lang="ts">
    import Vue from 'vue'
    export default Vue.extend({
        name: "active-state"
    })
</script>

<style lang="scss" scoped>

</style>
