@extends('_layouts.app')

@section('content')
    @include('_components.header')

    <div class="flex flex-col items-center">
        <div class="bg-white rounded-lg shadow-lg text-xl overflow-hidden my-6">
            <img :src="bannerImage" alt="" class="max-w-24 h-32 object-cover">

            <div class="flex flex-col items-center p-6">
                <img :src="userImage" :alt="username" class="relative rounded-full border-8 border-white w-40 h-40 -mt-20">

                <p class="leading-loose">
                    <a :href="profileUrl" class="text-3xl inline-block hover:underline">
                        @{{ username }}
                    </a>

                    <p class="text-base text-gray-600">
                        joined Reddit on
                    </p>

                    <div class="font-bold text-2xl">
                        @{{ cakeDay }}
                    </div>
                </p>

                <hr class="border-t-4 border-orange-600 w-4/5 my-6">

                <div class="flex justify-around w-full">
                    <div class="flex flex-col items-center">
                        <div class="font-mono">@{{ karma.link }}</div>

                        <div class="text-gray-600 text-sm">Link Karma</div>
                    </div>

                    <div class="flex flex-col items-center">
                        <div class="font-mono">@{{ karma.comment }}</div>

                        <div class="text-gray-600 text-sm">Comment Karma</div>
                    </div>
                </div>
            </div>
        </div>

        <div>
            {{-- 🎂 My Reddit cake day is [[cakeDay]]! Since joining I've received [[karma.link]] link karama and [[karma.comment]] comment karma. Find out your Reddit cake day at https://cakeday.phlak.dev #Reddit #CakeDay --}}
            <a href="https://twitter.com/intent/tweet?text=Coming%20soon!" target="_blank" class="underline">
                Tweet
            </a>
        </div>
    </div>

    @include('_components.footer')
@endsection
