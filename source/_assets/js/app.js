window.Vue = require('vue');
const axios = require('axios');
const { DateTime } = require('luxon');

var app = new Vue({
    el: '#app',
    data: {
        search: null,
        username: 'jpinkerton',
        bannerImage: 'https://via.placeholder.com/1280x384',
        userImage: 'https://via.placeholder.com/512',
        created: 0,
        karma: {
            comment: 0,
            link: 0
        },
        profileUrl: 'https://example.com'
    },
    computed: {
        cakeDay() {
            return DateTime.fromSeconds(this.created).toLocaleString(
                DateTime.DATE_FULL
            );
        }
    },
    methods: {
        submit() {
            axios.get('https://api.reddit.com/user/' + this.search + '/about').then(response => {
                this.username = response.data.data.name;
                this.bannerImage = response.data.data.subreddit.banner_img;
                this.userImage = response.data.data.subreddit.icon_img;
                this.created = response.data.data.created;
                this.karma.comment = response.data.data.comment_karma;
                this.karma.link = response.data.data.link_karma;
                this.profileUrl = 'https://www.reddit.com' + response.data.data.subreddit.url;
            }).catch(
                response => console.log(response)
            );
        }
    }
});
