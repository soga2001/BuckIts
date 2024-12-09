<template>
    <Splitter style="height: 100vh">
        <SplitterPanel class="flex items-center justify-center" :size="25" :minSize="10"> Navbar </SplitterPanel>
        <SplitterPanel class="" :size="75"> 
            <slot /> 
        </SplitterPanel>
    </Splitter>
    <!-- <div>
        <slot />
    </div> -->
</template>