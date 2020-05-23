<template>
<div class="w-full max-w-xs mx-auto">
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h3 class="text-center text-3xl">Add Issue</h3>
        <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                Name
            </label>
        <input 
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="username" type="text" placeholder="Username">
    </div>
    <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Description
        </label>
        <textarea 
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="username" type="text" placeholder="Username" rows="6">
        </textarea>
    </div>
    <div class="flex items-center justify-between">
        <button 
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
            type="button" >
            Add Issue
        </button>
    </div>
  </form>
</div>
</template>

<script>
import { db } from '../firebase'

export default {
    data() {
        return {
            name: '',
            description: ''
        }
    },
    methods: {
        async createIssue() {
            const newIssue = await db.collection('issues').add({
                members: [this.uid]
            })
            console.log(newIssue)
        }
    }
}
</script>