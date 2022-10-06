<template>
	<p @click="toggleOption">{{ options[actualOption] }}</p>
</template>
<script>
export default {
	props: ["attributeName"],
	emit: ["changeSort"],
	data() {
		return {
			options: ["↓↑", "↑", "↓"],
			actualOption: 0,
		};
	},
	methods: {
		toggleOption() {
			this.actualOption++;
			if (this.actualOption === this.options.length) this.actualOption = 0;
			// emit sort
			switch (this.options[this.actualOption]) {
				case "↑":
					this.$emit("changeSort", this.attributeName, "asc");
					break;
				case "↓":
					this.$emit("changeSort", this.attributeName, "desc");
					break;
				default:
					this.$emit("changeSort", this.attributeName, null);
			}
		},
	},
};
</script>
<style scoped>
p {
	cursor: pointer;
	font-weight: bold;
	display: inline-block;
	text-align: right;
	width: 100%;
}
</style>
