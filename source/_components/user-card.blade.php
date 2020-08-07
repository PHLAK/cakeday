<div class="flex flex-col items-center" v-show="(loaded && ! loading)">
    <div class="bg-white rounded-lg shadow-lg text-xl overflow-hidden my-6">
        <img :src="user.subreddit.banner_img" alt="" class="max-w-24 h-32 object-cover">

        <div class="flex flex-col items-center p-6">
            <img :src="user.subreddit.icon_img" :alt="user.name" class="relative rounded-full border-8 border-white w-40 h-40 -mt-20">

            <p class="leading-loose">
                <a :href="`https://www.reddit.com${user.subreddit.url}`" class="text-3xl inline-block hover:underline">
                    @{{ user.name }}
                </a>

                <p class="text-base text-gray-600">
                    joined Reddit on
                </p>

                <div class="font-bold text-2xl">
                    @{{ cakeDay }}
                </div>
            </p>

            <hr class="border-t-4 border-reddit w-4/5 my-6">

            <div class="flex justify-around space-x-4 w-full">
                <div class="flex flex-col items-center">
                    <div class="font-mono">@{{ user.link_karma }}</div>

                    <div class="text-gray-600 text-sm">Link Karma</div>
                </div>

                <div class="flex flex-col items-center">
                    <div class="font-mono">@{{ user.comment_karma }}</div>

                    <div class="text-gray-600 text-sm">Comment Karma</div>
                </div>
            </div>
        </div>
    </div>

    <div class="flex justify-center space-x-4">
        <a :href="redditShareUrl" target="_blank" class="text-gray-500 hover:text-reddit" title="Share on Reddit">
            <i class="fab fa-reddit fa-2x"></i>
        </a>

        <a :href="twitterShareUrl" target="_blank" title="Share on Twitter" class="text-gray-500 hover:text-twitter">
            <i class="fab fa-twitter fa-2x"></i>
        </a>

        <a :href="facebookShareUrl" target="_blank" title="Share on Facebook" class="text-gray-500 hover:text-facebook">
            <i class="fab fa-facebook-square fa-2x"></i>
        </a>
    </div>
</div>
