<template>
    <div>
        <section v-for="issue of issues" :key="issue.id" class="child max-w-sm rounded overflow-hidden shadow-lg bg-gray-100 mx-auto my-4">
            <div class="p-6">
                <div class="font-bold text-xl mb-2">{{ issue.name }}</div>
                <p class="text-gray-700 text-base mb-2">{{ issue.description }}</p>
                <a :href="issue.wiki" class="font-medium mb-6 text-blue-600" target="_blank">Learn more...</a>
                <p class="font-medium my-4" v-if="issue.members.length == 1">
                    Worried by only you
                </p>
                <p class="font-medium my-4" v-else>
                    Worried by <span v-if="issue.members.includes(uid)">you and</span> {{ issue.members.length }} other souls
                </p>
                <div v-if="uid">
                    <button 
                        class="bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 hover:opacity-75"
                        @click="removeWorry(issue.id, issue.members)"
                        v-if="issue.members.includes(uid)"> 
                        Worrying
                    </button>
                    <button 
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        @click="addWorry(issue.id, issue.members)"
                        v-else> 
                        Worry
                    </button>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { auth, db } from '../firebase'

export default {
    data() {
        return {
            issues: [],
            uid: '',
            user: []
        }
    },
    firestore() {
        return { 
            issues: db.collection('issues').orderBy('memberCount', 'desc'),
            user: db.collection('users').doc(localStorage.uid)
        }
        
    },
    created() {
        if(localStorage.uid !== "" && localStorage.uid){
            this.uid = localStorage.uid;
        } else {
            this.uid = auth.currentUser.uid;
        }
    },
    methods: {
        async addWorry(id, newMembers) {
            newMembers.push(this.uid)
            newMembers = Array.from(new Set(newMembers)).filter(function(e) { return e !== undefined });
            let newMembersCount = newMembers.length
            db.collection('issues')
                .doc(id)
                .update({ members: newMembers, memberCount: newMembersCount })
            let newWorryList = Array.from(this.user.worryList);
            newWorryList.push(id);
            newWorryList = Array.from(new Set(newWorryList)).filter(function(e) { return e !== undefined });
            db.collection('users')
                .doc(this.uid)
                .update({ worryList: newWorryList })
        },
        async removeWorry(id, newMembers) {
            newMembers = newMembers.filter(item => item !== this.uid);
            newMembers = Array.from(new Set(newMembers)).filter(function(e) { return e !== undefined });
            let newMembersCount = newMembers.length
            db.collection('issues')
                .doc(id)
                .update({ members: newMembers, memberCount: newMembersCount })
            let newWorryList = Array.from(this.user.worryList);
            newWorryList = newWorryList.filter(item => item !== id);
            newWorryList = Array.from(new Set(newWorryList)).filter(function(e) { return e !== undefined });
            db.collection('users')
                .doc(this.uid)
                .update({ worryList: newWorryList })
        },
    }
}
</script>

<style>
    body {
        scroll-snap-type: y mandatory;
    }

    .child {
        scroll-snap-align: center;   
    }
</style>
