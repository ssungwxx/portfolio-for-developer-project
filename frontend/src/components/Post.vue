<template>
    <router-link :to="detaillink" style="text-decoration:none">
        <v-layout py-4 h-100>
            <v-flex row>
                <div class="caption target">{{post_date}}</div>
                <h2 class="color-332 headline font-weight-light target">{{post_title}}</h2>
                <p class="mb-1 color-666 font-weight-light subheading target">{{post_content}}</p>
            </v-flex>
        </v-layout>
    </router-link>
</template>

<script>
import  DetailPost from "../views/DetailPost"

export default {
    name: "Post",
    props: {
        post_no: {type: Number},
        post_title: { type: String },
        post_content: { type: String },
        post_date: { type: String },
        post_user_id: {type: String}
    },
    components: {
        DetailPost,
    },
    data() {
        return {
            detaillink: "/detailpost/" + this.post_user_id,
        };
    }
};
</script>
<style>
.color-666 {
    color: #666;
}
.color-332 {
    color: #333;
    height: 95px;
}
.h-100 {
    height: 100%;
}
</style>
