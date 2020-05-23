<template>
    <div>
        <ul>
            <li v-for="issue of issues" :key="issue.id" class="max-w-sm rounded overflow-hidden shadow-lg bg-gray-100 mx-auto">
                <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2">{{ issue.name }}</div>
                    <p class="text-gray-700 text-base">{{ issue.description }}</p>
                    <p>worried by : {{ issue.members.length }}</p>
                </div>
                
            </li>
        </ul>
    </div>
</template>

<script>
import { db } from '../firebase'

export default {
    data() {
        return {
            issues: []
        }
    },
    firestore() {
        return { 
            issues: db.collection('issues')
        }
        
    }
}
</script>