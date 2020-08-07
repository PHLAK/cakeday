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
        user: {
            name: null,
            created: 0,
            comment_karma: 0,
            link_karma: 0,
            subreddit: { banner_img: null, icon_img: null, url: null }
        },
        loading: false,
        loaded: false,
        error: false
    },
    computed: {
        cakeDay() {
            return DateTime.fromSeconds(this.user.created).toLocaleString(DateTime.DATE_FULL);
        },
        title() {
            let title = 'Reddit Cake Day'

            if (this.user.name == undefined) {
                return title;
            }

            return `${this.user.name} • ${title}`;
        },
        facebookShareUrl() {
            let url = encodeURI(window.location.href);

            return `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        },
        redditShareUrl() {
            let url = encodeURIComponent(window.location.href);
            let title = encodeURI(
                `🎂 My Reddit cake day is ${this.cakeDay}! Since joining I've received ${this.user.link_karma} link karma and ${this.user.comment_karma} comment karma.`
            );

            return `http://www.reddit.com/submit?url=${url}&title=${title}`;
        },
        twitterShareUrl() {
            let text = encodeURI(
                `🎂 My Reddit cake day is ${this.cakeDay}! Since joining I've received ${this.user.link_karma} link karma and ${this.user.comment_karma} comment karma.\n\n${window.location.href}`
            );

            return `https://twitter.com/intent/tweet?text=${text}`;
        }
    },
    methods: {
        submit(search) {
            if (search == this.user.name) {
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
                console.log(response);
                this.error = true;
                this.loading = false;
            });
        },
        setUserData(data) {
            this.user = data;

            router.push({ query: { username: this.user.name } }).catch(() => {});

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
        '$route'() {
            document.title = this.title;
        },
        '$route.query.username'() {
            this.submit(this.$route.query.username);
        }
    }
});
