<template>
	<div>
		<button @click="toggleDisplayInsertForm">Add product</button>
		<button @click="$emit('refetch')">Reload</button>
	</div>
	<product-form
		actionType="create"
		@close="toggleDisplayInsertForm"
		v-if="displayInsertForm"
	></product-form>
</template>
<script>
import ProductForm from "./ProductForm.vue";
export default {
	components: { ProductForm },
	data() {
		return {
			displayInsertForm: false,
		};
	},
	emits: ["refetch"],
	methods: {
		toggleDisplayInsertForm() {
			this.displayInsertForm = !this.displayInsertForm;
		},
	},
};
</script>
<style scoped>
button {
	margin-top: 10px;
	margin-right: 10px;
	padding: 1rem 2rem;
}
div {
	display: flex;
}
</style>
