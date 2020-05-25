<template>
    <div>
        <p class="text-center">
            Didn't find your passionate fight?
            <a v-on:click="show()" class="text-blue-600 hover:text-blue-400 font-bold cursor-pointer">Create one</a>
        </p>
        
        <modal name="formModal" height="auto" width="80%" @closed="beforeClose">
            <form @submit.prevent="save" class="bg-white rounded px-8 pt-6 pb-8 mb-4"> 
                <h3 class="text-center text-3xl">Add Issue</h3>
                <div class="mb-4">
                    <label class="block text-gray-700 font-bold mb-2" for="name">
                        Name
                    </label>
                <input 
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    id="name" type="text" placeholder="name" v-model="name" required>  
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 font-bold mb-2" for="description">
                        Description
                    </label>
                    <textarea 
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="description" type="text" placeholder="description" rows="6" v-model="description" required>
                    </textarea>
                </div>
                <div class="mb-6">
                    <label class="block text-gray-700 font-bold mb-2" for="wiki">
                        Wikipedia Link
                    </label>
                <input 
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    id="wiki" type="url" placeholder="wikipedia link" v-model="wiki" required>  
                </div>
                <div class="flex items-center justify-between">
                    <button 
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                        :class="{ 'opacity-50 cursor-not-allowed': loading }"
                        type="submit">
                        Add Issue
                    </button>
                </div>
                <p class="text-red-500 italic" v-if="feedback">{{ feedback }}</p>
            </form>
        </modal>
    </div>
</template>

<script>
import { db } from '../firebase'

    export default {
        data() {
            return {
                name: '',
                description: '',
                wiki: '',
                errors: [],
                feedback: '',
                title: 'New issue',
                id: null,
                loading: false,
            };
        },
        props: ['initial', 'uid'],
        watch: {
            initial: async function () {
                this.id = this.initial; 
                if (this.initial != null) {
                    this.id = this.initial;
                    await db.collection('issues').doc(this.id).get()
                        .then(doc => {
                            let issue = doc.data()
                            this.name = issue.name
                            this.description = issue.description
                            this.wiki = issue.wiki
                        })
                    this.title = "Edit issue";
                    this.show();
                }
            }
        },
        beforeRouteLeave (to, from, next) {
            this.name = '',
            this.description = '',
            this.wiki = '',
            next();
        },
        methods: {
            slate() {
                this.errors = [];
                this.name = '',
                this.description = '',
                this.wiki = '',
                this.feedback = '';
                this.id = null;
                this.title = 'New Issue';
                this.$emit('refresh-list', true);
            },
            async deleteIssue() {
                this.loading = true;
                await db.collection('issues').doc(this.id).delete().then(
                    this.feedback = 'Issue Added'
                )
                this.loading = false;
            },
            async save() {
                if (this.id == null) {
                    this.loading = true;
                    await db.collection('issues').add({
                        name: this.name,
                        description: this.description,
                        wiki: this.wiki,
                        author: this.uid,
                        members: [this.uid],
                        memberCount: 1
                    }).then(
                        this.feedback = 'Issue Added'
                    )
                    this.loading = false;
                } else {
                    this.loading = true;
                    await db.collection('issues').doc(this.id).update({
                        name: this.name,
                        description: this.description,
                        wiki: this.wiki,
                    }).then(
                        this.feedback = 'Issue Updated'
                    )
                    this.loading = false;
                }
                this.hide();
            },
            show () {
                this.$modal.show('formModal');
            },
            hide () {
                this.$modal.hide('formModal');
            },
            beforeClose () {
                this.slate();
            }
        },

    }
    
</script>

<style scoped>
    form {
        margin: 10px auto;
    }
    textarea {
        width: 240px;
    }
</style>
