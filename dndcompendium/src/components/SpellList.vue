<script>
import Spell from './Spell.vue'


export default {
    components: {
        Spell
    },
    props: {
        list: Array
    }
}

</script>

<template>
    <div>

        <div class="flex flow-row-nw justify-content-around">
            <div class="flex flow-col-nw width-200px r-gap-5px">

                <div class="grow" v-for="(spell, index) in list" :key="spell.name">
                    <Spell :text="`${index}. ${spell.name}`" />
                </div>

            </div>
        </div>


    </div>
</template>

<style scoped>
@import '../styles/_base.css';
</style>