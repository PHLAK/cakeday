const axios = require('axios');
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
        karma: {
            comment: 0,
            link: 0
        },
        profileUrl: null,
        loading: false,
        loaded: false
    },
    computed: {
        cakeDay() {
            return DateTime.fromSeconds(this.created).toLocaleString(DateTime.DATE_FULL);
        },
        facebookShareUrl() {
            return 'https://www.facebook.com/sharer/sharer.php?u=https://cakeday.phlak.net';
        },
        redditShareUrl() {
            let title = encodeURI(`🎂 My Reddit cake day is ${this.cakeDay}! Discover yours at https://cakeday.phak.net`);

            return `http://www.reddit.com/submit?url=https://cakeday.phlak.dev&title=${title}`;
        },
        twitterShareUrl() {
            let text = encodeURI(
                `🎂 My Reddit cake day is ${this.cakeDay}! Since joining I've received ${this.karma.link} link karama and ${this.karma.comment} comment karma.\n\nDiscover your Reddit cake day at https://cakeday.phlak.dev`
            );

            return `https://twitter.com/intent/tweet?text=${text}`;
        }
    },
    methods: {
        submit(search) {
            this.loaded = false;
            this.loading = true;

            axios.get(`https://api.reddit.com/user/${search}/about`).then(response => {
                this.username = response.data.data.name;
                this.bannerImage = response.data.data.subreddit.banner_img;
                this.userImage = response.data.data.subreddit.icon_img;
                this.created = response.data.data.created;
                this.karma.comment = response.data.data.comment_karma;
                this.karma.link = response.data.data.link_karma;
                this.profileUrl = `https://www.reddit.com${response.data.data.subreddit.url}`;

                router.push({ query: { username: response.data.data.name } }).catch(() => {});
            }).catch(response => console.log(response));

            this.loading = false;
            this.loaded = true;
        }
    },
    mounted: function () {
        window.addEventListener('keyup', e => e.keyCode == 191 && this.$refs.searchInput.focus());

        if (this.$route.query.username) {
            this.submit(this.$route.query.username);
        }
    }
});
