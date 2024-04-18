<script>
import socketHandler from '../main';

export default {
    data() {
        return {
            result: [],
            choice: "",
        }
    },
    methods: {
        battle(pokemon) {
            this.result = `You chose ${pokemon}!`
        },
        choseBulbasaur() {
            if (this.choice == "") {
                this.choice = 'Bulbasaur'
                socketHandler.handleChoosePokemon(this.choice)
            } else {
                console.log('You already chose a pokemon')
            }

        },
        choseSquirtle() {
            if (this.choice == "") {
                this.choice = 'Squirtle'
                socketHandler.handleChoosePokemon(this.choice)
            } else {
                console.log('You already chose a pokemon')
            }
        },
        choseCharmander() {
            if (this.choice == "") {
                this.choice = 'Charmander'
                socketHandler.handleChoosePokemon(this.choice)
            } else {
                console.log('You already chose a pokemon')
            }
        }
    },
    mounted() {
        // Instantiate the SocketHandler
        socketHandler.handleBattleResult(this.result);
    }
}
</script>

<template>
    <div class="bg-gray-200 flex justify-center items-center h-screen">
        <div class="w-96 h-96 bg-gray-300 rounded-lg flex flex-col justify-center items-center">
            <div class="flex justify-center items-center">
                <button @click="choseBulbasaur()"
                    class="bg-green-500 text-white px-4 py-2 rounded-lg mr-4">Bulbasaur</button>
                <button @click="choseSquirtle()"
                    class="bg-blue-500 text-white px-4 py-2 rounded-lg mr-4">Squirtle</button>
                <button @click="choseCharmander()"
                    class="bg-red-500 text-white px-4 py-2 rounded-lg">Charmander</button>
            </div>
            <p class="mt-8 text-xl font-semibold">You chose: {{ choice }}</p>
            <!-- <p v-if="result.some(item => item.winner === true)" class="mt-4 text-xl font-semibold">You won</p> -->
            <div v-if="result.some(item => item.winner === true)" class="mt-4 text-xl font-semibold">
                <p>You won</p>
                <a href="/chat" class="text-blue-500">Go back to chat</a>
            </div>
            <div v-else-if="result.some(item => item.winner === false)" class="mt-4 text-xl font-semibold">
                <p>You lost</p>
                <a href="/chat" class="text-blue-500">Go back to chat</a>

            </div>
            <div v-else class="mt-4 text-xl font-semibold">
                <p>No results yet</p>
            </div>

        </div>
    </div>
</template>