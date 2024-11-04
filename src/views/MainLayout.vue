<template>
    <div class="container">
        <div class="body">
       <div class=" header">
        <button>Login</button>
        <button>User profile</button>
       </div>
       <router-view class="main-content"></router-view>
    </div>
    </div>
</template>
<style scoped>
.container{
    height: 100vh;
    display: flex;
    flex-direction: row;
}
.header{
    height: 7vh;
    background-color: #e5f0f9;
    display: flex;
    justify-content:flex-end ;
    align-items: center;
    border: 1px solid #dfdada;

}
.body{
    height: 100vh;
width: 100%;
    /* width: fit-content; */
display: flex;
flex-direction: column;

}
/* .sidenav{
    width: 15%;
    min-width: 226px;
    background-color: rgb(7, 7, 7);
    height: 100%;
} */
.main-content{
    border-radius: 20px;
}

</style>