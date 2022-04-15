<script>

export default {
    props: {
        text: String
    }
}

</script>

<template>

    <div class="border">
        <span>
            {{ text }}
        </span>
    </div>

</template>

<style scoped>
.border {
    border: 1px solid #000000
}
</style>