<template>
    <div>
        <User v-slot:user="{ user }">
            <div v-if="user">
                <UserProfile :user="user"/>
                <CoreIssues :uid="user.uid"/>
            </div>
            <Login v-else />
        </User>
    </div>
</template>

<script>
import Login from './Login'
import User from './User'
import UserProfile from './UserProfile'
import CoreIssues from './CoreIssues'

export default {
    components:{ Login, User, UserProfile, CoreIssues }
}
</script>