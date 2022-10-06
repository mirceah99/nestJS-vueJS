<template>
	<tr>
		<th>
			<div class="line"></div>
		</th>
		<th>
			<div class="line"></div>
		</th>
		<th>
			<div class="line"></div>
		</th>
		<th>
			<div class="line"></div>
		</th>
		<th>
			<div class="line"></div>
		</th>
		<th>
			<div class="line"></div>
		</th>
	</tr>
</template>
<script>
export default {};
</script>
<style scoped>
.line {
	float: left;
	width: 100%;
	height: 100%;
	height: 20px;
	border-radius: 7px;
	background-image: linear-gradient(
		90deg,
		#f4f4f4 0px,
		rgba(229, 229, 229, 0.8) 40px,
		#f4f4f4 80px
	);
	background-size: 600px;
	animation: shine-lines-d5c20c20 2s infinite ease-out;
}
@keyframes shine-lines {
	0% {
		background-position: -100px;
	}
	40%,
	100% {
		background-position: 140px;
	}
}
</style>
