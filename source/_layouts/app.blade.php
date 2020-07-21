<!DOCTYPE html>

<meta charset="utf-8">
<meta name="description" content="{{ $page->description }}">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

<link rel="canonical" href="{{ $page->getUrl() }}">
<link rel="icon" href="images/cake.svg">
<link rel="stylesheet" href="{{ mix('css/app.css', 'assets/build') }}">

<title>Cake Day</title>

<div id="app" class="bg-gray-200 flex flex-col justify-between items-center min-h-screen font-sans p-4">
    @yield('content')
</div>

<script src="{{ mix('js/app.js', 'assets/build') }}" defer></script>
