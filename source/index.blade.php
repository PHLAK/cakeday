@extends('_layouts.app')

@section('content')
    @include('_components.header')

    <div class="flex flex-col items-center" v-show="! (loaded || loading || error)">
        <p class="font-light text-gray-400 text-2xl text-center">
            Search for a Reddit user by username to see their cake day.
        </p>
    </div>

    @include('_components.user-card')
    @include('_components.loading')
    @include('_components.error')

    @include('_components.footer')
@endsection
