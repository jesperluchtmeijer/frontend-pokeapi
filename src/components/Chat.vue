<template>
    <div class="min-h-screen flex">
        <!-- Chat Section (Left) -->
        <div class="flex-1 flex flex-col">
            <!-- Header Section -->
            <div class="bg-green-500 p-4 text-white">
                <h1 class="text-2xl font-semibold">Poke Chat</h1>
                <p v-if="!name">Please log in to chat</p>
                <p v-else>Logged in as: {{ name }}</p>
            </div>

            <!-- Chat Messages Section -->
            <div class="flex-1 overflow-y-auto bg-gray-100" style="min-height: 60vh;" ref="messageContainer">
                <div v-if="name" class="p-4">
                    <div class="flex flex-col gap-2" v-for="message in messages" :key="message.id">
                        <div :class="{ 'self-start': message.sender !== name, 'self-end': message.sender === name }"
                            class="p-2 max-w-md rounded-lg shadow-md bg-white">
                            <p class="text-sm font-semibold">{{ message.sender }}</p>
                            <p class="text-base">{{ message.text }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Input Section -->
            <div v-if="name" class="p-4 bg-gray-200">
                <div class="flex items-center">
                    <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type your message..."
                        class="flex-1 bg-white border border-gray-400 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-500" />
                    <button @click="sendMessage"
                        class="ml-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:bg-green-600">
                        Send
                    </button>
                </div>
            </div>
        </div>

        <!-- Online Players Menu (Right) -->
        <div class="w-1/4 bg-gray-200 p-4">
            <h2 class="text-lg font-semibold mb-4">Online Players</h2>
            <ul>
                <li v-for="player in users " :key="player" class="text-sm">
                    <button @click="sendInvite(player.userID)"
                        class="bg-green-500 text-white px-2 py-1 rounded-lg hover:bg-green-600 focus:outline-none focus:bg-green-600">
                        {{ player.userID }}
                    </button>
                </li>

            </ul>
        </div>
    </div>
</template>

<script>
import socketHandler from '../main.js';
import usePlayerListStore from '../stores/playerList.js';


export default {
    mounted() {
        this.name = localStorage.getItem('name');
    },
    updated() {
        this.scrollToBottom();
    },
    created() {
        console.log(socketHandler);
        socketHandler.handleMessages(this.messages);
        socketHandler.handleReceiveInvite(this.getInvite);
        socketHandler.handleRedirectInvite();

    },
    data() {
        return {
            messages: [],
            newMessage: '',
            name: '',
        };
    },
    methods: {
        sendMessage() {
            if (this.newMessage.trim() === '') {
                return;
            }
            socketHandler.handleMessage(this.newMessage, this.name, this.messages);

            this.newMessage = '';
        },
        sendInvite(player) {
            socketHandler.handleInvite(player);
        },
        scrollToBottom() {
            this.$refs.messageContainer.scrollTop = this.$refs.messageContainer.scrollHeight;
        },

    },
    computed: {
        users() {
            return usePlayerListStore().playerList;
        }
    }
};
</script>
