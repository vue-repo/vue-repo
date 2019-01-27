<template>
    <section class="content">
        <h1>{{title}}</h1>
        <slot></slot>
    </section>
</template>

<script>
    import Vue from 'vue'
    export default Vue.extend({
        name: "content-page",
        props: {
            title: {
                type: String
            }
        }
    })
</script>

<style scoped>

</style>
