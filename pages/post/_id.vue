<template>
    <article class="post">
        <header class="post-header">
            <div class="post-title">
                <h1>Post title</h1>
                <nuxt-link to="/">
                    <i class="el-icon-back"></i>
                </nuxt-link>
            </div>
            <div class="post-info">
                <small>
                        <i class="el-icon-time"></i>
                        {{ new Date().toLocaleString() }}
                </small>
                <small>
                    <i class="el-icon-view"></i>
                    42
                </small>
            </div>
            <div class="post-img">
                <img 
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwrW3OndFNXczyruEfF62ijVXO6SexFtf1qw&usqp=CAU" 
                    alt="">
            </div>
        </header>
        <main class="post-content">
            <p>Lorem50 Lorem50 Lorem50 Lorem50 Lorem50</p>
        </main>
        <footer>
            <AppCommentForm
                v-if="canAddComment"
                @created="commentCreated" />
            <div
                v-if="true" 
                class="comments">
                <AppComment 
                    v-for="comment in 4"
                    :key="comment"
                    :comment="comment"
                />
            </div>
            <div
                v-else
                class="text-center">
                No comments
            </div>
        </footer>
    </article>
</template>

<script>
import AppComment from '@/components/main/Comment';
import AppCommentForm from '@/components/main/CommentForm';

export default {
    components: {
        AppComment,
        AppCommentForm
    },
    data() {
        return {
            canAddComment: true,
        }
    },
    validate({ params }) {
        return !!params.id;
    },
    methods: {
        commentCreated() {
            this.canAddComment = false;
        }
    }
}
</script>

<style lang="scss" scoped>
    .post {
        max-width: 600px;
        margin: 0 auto;
    }
    .post-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }
    .post-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: .5rem;
    }
    .post-img {
        width: 100%;
        height: auto;
    }
    .post-header {
        margin-bottom: 1.5rem;
    }
    .post-content {
        margin-bottom: 2rem;
    }
</style>