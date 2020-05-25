<template>
  <div id="app" class="min-h-screen bg-blue-100">
    <header class="mx-auto">
      <h1 class="text-gray-900 text-6xl text-center">
        <router-link :to="{name: 'Home'}" >
          Worry Me
        </router-link>
      </h1>
      <nav class="flex items-center justify-between flex-wrap bg-teal-900 p-6 text-center">
            <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <div class="text-sm lg:flex-grow">
                    <router-link :to="{name: 'About'}" class="block lg:inline-block lg:mt-0 text-teal-200 hover:text-white mx-12 tracking-wider">
                      About
                    </router-link>
                    <router-link :to="{name: 'Landing'}" class="block lg:inline-block lg:mt-0 text-teal-200 hover:text-white mx-12 tracking-wider">
                      Dashboard
                    </router-link>
                </div>
            </div>
        </nav>
    </header>
    <main class="p-6">
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
