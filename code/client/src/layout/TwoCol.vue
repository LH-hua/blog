<template>
    <div class="layout">
        <div class="main">
            <slot name="main"></slot>
        </div>
        <div class="side">
            <slot name="side"></slot>
        </div>
    </div>
</template>

<style scoped>
.layout{
    width: 50%;
    margin: 0 auto;
    /* margin-top: 70px; */
    display: flex;
    gap: 10px;
}
.main{
    flex: 5;
}
.side{
    flex: 2;
}
</style>