<template>
	<nav>
		<router-link to="/produse">Produse</router-link>
		<router-link to="/produse">Produse 2</router-link>
		<router-link to="/produse">Produse 3</router-link>
		<router-link to="/about">About</router-link>
	</nav>
	<router-view />
</template>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

nav {
	padding: 30px;
	display: flex;
}

nav a {
	font-weight: bold;
	color: #2c3e50;
	margin-right: 15px;
}
nav a:last-child {
	margin-right: 0;
	margin-left: auto;
}

nav a.router-link-exact-active {
	color: #42b983;
}
body {
	margin: 0px;
	font-size: 1.6rem;
}
*,
::after,
::before {
	margin: 0px;
	padding: 0px;
	box-sizing: border-box;
}
html {
	font-size: 62.5%;
}
</style>
