<div class="flex flex-col items-center" v-show="(error && ! loading)">
    <div class="flex justify-center items-center space-x-2 text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-alert-circle" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <circle cx="12" cy="12" r="9" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>

        <p class="font-light text-2xl">
            I'm sorry Dave, I'm afraid I can't do that.
        </p>
    </div>
</div>
