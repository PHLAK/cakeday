const axios = require('axios');
const cache = window.localStorage;
const { DateTime } = require('luxon');
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter)
const router = new VueRouter({ mode: 'history' });

var app = new Vue({
    el: '#app',
    router,
    data: {
        search: null,
        username: null,
        bannerImage: null,
        userImage: null,
        created: 0,
        karma: { comment: 0, link: 0 },
        profileUrl: null,
        loading: false,
        loaded: false,
        error: false
    },
    computed: {
        cakeDay() {
            return DateTime.fromSeconds(this.created).toLocaleString(DateTime.DATE_FULL);
        },
        facebookShareUrl() {
            let url = encodeURI(window.location.href);

            return `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        },
        redditShareUrl() {
            let url = encodeURIComponent(window.location.href);
            let title = encodeURI(
                `🎂 My Reddit cake day is ${this.cakeDay}! Since joining I've received ${this.karma.link} link karma and ${this.karma.comment} comment karma.`
            );

            return `http://www.reddit.com/submit?url=${url}&title=${title}`;
        },
        twitterShareUrl() {
            let text = encodeURI(
                `🎂 My Reddit cake day is ${this.cakeDay}! Since joining I've received ${this.karma.link} link karma and ${this.karma.comment} comment karma.\n\n${window.location.href}`
            );

            return `https://twitter.com/intent/tweet?text=${text}`;
        }
    },
    methods: {
        submit(search) {
            if (search == this.username) {
                return;
            }

            this.loaded = false;
            this.loading = true;

            let userData = cache.getItem(search.toLowerCase());

            if (userData !== null) {
                let {expiration, data} = JSON.parse(userData);

                if (DateTime.local() <= DateTime.fromISO(expiration)) {
                    this.setUserData(data);
                    return;
                }
            }

            axios.get(`https://api.reddit.com/user/${search}/about`).then(response => {
                cache.setItem(search.toLowerCase(), JSON.stringify({
                    expiration: DateTime.local().plus({ minutes: 10 }),
                    data: response.data.data
                }));
                this.setUserData(response.data.data);
            }).catch(response => {
                console.log(response)
                this.error = true;
                this.loading = false;
            });
        },
        setUserData(data) {
            this.username = data.name;
            this.bannerImage = data.subreddit.banner_img;
            this.userImage = data.subreddit.icon_img;
            this.created = data.created;
            this.karma.comment = data.comment_karma;
            this.karma.link = data.link_karma;
            this.profileUrl = `https://www.reddit.com${data.subreddit.url}`;

            router.push({ query: { username: data.name } }).catch(() => {});

            this.error = false;
            this.loaded = true;
            this.loading = false;
        }
    },
    mounted: function () {
        window.addEventListener('keyup', e => e.keyCode == 191 && this.$refs.searchInput.focus());

        if (this.$route.query.username) {
            this.submit(this.$route.query.username);
        }
    },
    watch: {
        '$route.query.username'() {
            this.submit(this.$route.query.username);
        }
    },
});
