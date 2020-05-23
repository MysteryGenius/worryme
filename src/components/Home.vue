<template>
    <div>
        <User v-slot:user="{ user }">
            <div v-if="user">
                <UserProfile :user="user"/>
            </div>
            <Login v-else />
        </User>
        <IssuesList/>
    </div>
</template>

<script>
import Login from './Login'
import User from './User'
import UserProfile from './UserProfile'
import IssuesList from './IssuesList'

export default {
    components:{ Login, User, UserProfile, IssuesList }
}
</script>