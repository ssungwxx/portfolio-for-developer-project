<!--삭제 예정-->

<template>
    <v-layout column px-4>
        <v-flex v-for="i in 5" v-if="members[i-1]!==undefined">
            <v-divider v-if="i === 1"></v-divider>
            <Repository :member="members[i - 1]"></Repository>
            <v-divider></v-divider>
        </v-flex>
    </v-layout>
</template>

<script>
    import Repository from '@/components/Repository'
    import GitlabService from '@/services/GitlabService'

    export default {
        name: 'RepositoryList',
        data() {
            return {
                members: []
            }
        },
        components: {
            Repository,
        },
        mounted() {
            this.getMembers()
        },
        methods: {
            async getMembers() {
                const response = await GitlabService.getRepomemebers()
                if (response.status !== 200) {
                    return
                }
                this.members = response.data
            },
        }
    }
</script>
