<template>
  <div id="app" class="px-6 py-4 min-h-screen bg-blue-100">
    <header>
      <h1 class="text-gray-900 text-6xl text-center">Worry Me</h1>
      <p class="text-gray-700 text-base text-center">things that should worry us</p>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
</style>
