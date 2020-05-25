<template>
    <div class="container mx-auto">
        <AddIssues v-on:refresh-list="slate()" :initial="this.id" :uid="this.uid"/>
        <p class="text-sm text-center font-thin my-4 italic" v-if="issues.length<=0" >nothing here to see yet</p>
        <ul v-if="issues.length>0">
            <li  v-for="issue of issues" :key="issue.id" v-on:click="issuesClick(issue.id)"
                class="max-w-sm rounded overflow-hidden shadow-lg bg-gray-100 mx-auto my-4 hover:bg-green-100">
                <div class="p-2">
                    <div class="font-bold text-center">{{ issue.name }}</div>
                </div>
            </li>
        </ul>
    </div>
    
</template>

<script>
    import { db } from '../firebase'
    import AddIssues from './AddIssues.vue';

    export default {
        components : {
            AddIssues: AddIssues
        },
        data() {
            return {
                issues: [],
                id: null
            }
        },
        firestore() {
            return { 
                issues: db.collection('issues').where('author', '==', this.uid)
            }
            
        },
        methods: {
            issuesClick(issueId) {
                this.id = issueId;
            },
            slate() {
                this.id = null;
            },
        },
        props :['uid']
    }
</script>
