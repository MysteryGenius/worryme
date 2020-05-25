<template>
    <aside class="w-full max-w-xs mx-auto">
        <form class="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
            <div v-if="newUser">
                <h3 class="text-center text-3xl font-semibold">Sign Up</h3>
                <a class="text-gray-600" href="#" @click="newUser = false">Returning User?</a>
            </div>
        
            <div v-else>
                <h3 class="text-center text-3xl font-semibold">Sign In</h3>
                <a class="text-gray-600" href="#" @click="newUser = true">New user?</a>
            </div>

            <div v-if="newUser" class="mb-4">
                <label class="block text-gray-700 font-bold mb-2" for="name">
                    Name
                </label>
                <input 
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    v-model="name" placeholder="name" type="text" id="name" required>
            </div>

            <div class="mb-4">
                <label class="block text-gray-700 font-bold mb-2" for="email">
                    Email
                </label>
                <input 
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    v-model="email" placeholder="email" type="email" id="email" required>
            </div>

            <div class="mb-4">
                <label class="block text-gray-700 font-bold mb-2" for="password">
                    Password
                </label>
                <input 
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    v-model="password" type="password" id="password" required>
            </div>
            
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" :class="{ 'opacity-50 cursor-not-allowed': loading }" @click="signInOrCreateUser()">
                {{ newUser ? 'Sign Up' : 'Login'}}
            </button>
            
            <p class="text-red-500 italic" v-if="errorMessage">{{ errorMessage }}</p>
        </form>
    </aside>
</template>

<script>
import { auth, db } from '../firebase';

export default {
    data() {
        return {
            auth,
            newUser: false,
            name: '',
            email: '',
            password: '',
            loading: false,
            errorMessage: ''
        }
    },

    methods: {
        async signInOrCreateUser() {
            this.loading = true;
            this.errorMessage = '';
            try {
                if (this.newUser) {
                    if(this.name !== ""){
                        await auth.createUserWithEmailAndPassword(this.email, this.password)
                    } else {
                        this.errorMessage = "Name is required"
                    }
                } else {
                    await auth.signInWithEmailAndPassword(this.email, this.password)
                }
            } catch (error) {
                this.errorMessage = error.message;
            }
            this.loading = false;
            if (this.newUser) {
                db.collection('users').doc(auth.currentUser.uid).set({
                    name: this.name,
                    worryList: []
                })
            }
        }
    },
}
</script>