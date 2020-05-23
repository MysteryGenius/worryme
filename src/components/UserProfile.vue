<template>
    <div class="text-center">
        Logged in as {{ user.email }}

        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="auth.signOut()">Sign Out</button>
    </div>
</template>

<script>
import { auth } from '../firebase'

export default {
    data() {
        return {
            auth
        }
    },
    props: ['user']
}
</script>