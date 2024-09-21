<template>
  <div class="container mx-auto px-4 h-full">
    <header>
      <nav class="border-b border-b-slate-400 py-4 flex flex-row gap-12 items-end">
        <div class="font-bold text-xl">SpaceX Launches</div>
        <ul class="flex flex-row gap-4 text-black/50">
          <li>
            <NuxtLink to="/" class="p-4">Latest</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/saved" class="p-4">Saved</NuxtLink>
          </li>
        </ul>
      </nav>
    </header>
    <slot />
  </div>
</template>

<style scoped>
</style>