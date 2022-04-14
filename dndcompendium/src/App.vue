<script>
// import HelloWorld from './components/HelloWorld.vue'
// import TheWelcome from './components/TheWelcome.vue'
import Spell from './components/Spell.vue'

export default {
    components: {
        Spell
    },
    data() { 
        return {
            greeting: "Hello",
            spellList: []
        }
    },
    methods: {
        getAllSpells: async function() {
            await fetch('127.0.0.1:8080/getAllSpells')
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    this.spellList = data
                });
            return this.spellList;
        }
    },
    mounted() {
        // this.getAllSpells().then();
    }
}
</script>

<template>


<h1>{{ greeting }}</h1>

<Spell :text="'hello'" />

<button @click="getAllSpells()">btn</button>

</template>

<style>

</style>
