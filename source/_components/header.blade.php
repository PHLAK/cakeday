<div class="text-center">
    <h1 class="text-4xl font-semibold">
        🎂 Reddit Cake Day
    </h1>

    <h2 class="text-base text-gray-600">
        Discover the day you joined Reddit!
    </h2>

    <form action="." method="GET" v-on:submit.prevent="submit"
        class="group relative bg-white rounded-full shadow-inner px-10 py-2 mt-6"
    >
        <input type="text" name="username" class="" placeholder="Reddit username" v-model="search">

        <div class="flex justify-center items-center absolute left-0 inset-y-0 ml-2 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-search" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#a0aec0" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z"/>
                <circle cx="10" cy="10" r="7" />
                <line x1="21" y1="21" x2="15" y2="15" />
                <line x1="21" y1="21" x2="17" y2="17" stroke-width="3" />
            </svg>
        </div>
    </form>
</div>
