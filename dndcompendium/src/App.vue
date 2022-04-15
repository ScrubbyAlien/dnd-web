<script>
import Spell from './components/Spell.vue'
import SpellList from './components/SpellList.vue'
// TODO add component :is  for navbar


export default {
    components: {
        Spell,
        SpellList,
    },
    data() {
        return {
            greeting: "Spells!",
            spellList: []
        }
    },
    methods: {
        getAllSpells: async function () {
            await fetch('http://127.0.0.1:8080/getAllSpells')
                .then(res => res.json())
                .then(data => {
                    this.spellList = data.sort((a, b) => {
                        a.name > b.name ? -1 : 1
                    })
                });
            return this.spellList;
        }
    },
    mounted() {
        this.getAllSpells().then();
    }
}
</script>

<template>

    <div>
        
        <div>
            <h1>{{ greeting }}</h1>
        </div>

        <div>
            <SpellList :list="spellList" />
        </div>
    
    </div>


</template>

<style scoped>
@import './styles/_base.css';
</style>
