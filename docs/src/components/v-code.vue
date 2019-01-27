<template>
    <div>
        <prism :code="code"></prism>
    </div>
</template>

<script>
    export default {
        name: "v-code",
        computed: {
            code () {
                return this.$slots.default[0].text
            }
        }
    }
</script>

<style scoped>

</style>
