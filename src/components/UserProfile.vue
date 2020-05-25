<template>
    <div class="text-center">
        Logged in as {{ name }}

        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded " @click="signOut()">Sign Out</button>
    </div>
</template>

<script>
import { auth, db } from '../firebase'

export default {
    data() {
        return {
            auth,
            name: '',
            uid: ''
        }
    },
    created: function () {
        if(localStorage.uid !== "" && localStorage.uid){
            this.uid = localStorage.uid;
        } else {
            this.uid = auth.currentUser.uid;
        }
        if(localStorage.name !== "" && localStorage.name){
            this.name = localStorage.name;
        } else {
            db.collection('users').doc(this.uid).get()
            .then(doc => {
                console.log(doc.data())
                this.name = doc.data().name
            })
        }
    },
    watch: {
        name(newName) {
            localStorage.name = newName;
        },
        uid(newUid) {
            localStorage.uid = newUid;
        }
    },
    methods: {
        signOut() {
            auth.signOut();
            localStorage.clear();
        }
    },
    props: ['user']
}
</script>