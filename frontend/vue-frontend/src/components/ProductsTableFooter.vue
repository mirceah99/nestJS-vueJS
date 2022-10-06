<template>
	<div>
		<button @click="toggleDisplayInsertForm">Adauga inregistrare</button>
		<button @click="$emit('refetch')">Reload</button>
		<label>Items per page:</label>
		<select
			v-model="itemsPerPage"
			@change="$emit('updateItemsPerPage', itemsPerPage)"
		>
			<option value="5" selected>5</option>
			<option value="10">10</option>
			<option value="15">15</option>
			<!-- <option value="!=">!=</option> -->
		</select>
		<div class="paginator">
			<button :disabled="allowPrevPage" @click="goToFirstPage">
				&#60;&#60;
			</button>
			<button :disabled="allowPrevPage" @click="changePageNumber(-1)">
				&#60;
			</button>
			<button class="current-page">{{ currentPage }}</button>
			<button :disabled="allowNextPage" @click="changePageNumber(1)">
				&#62;
			</button>
			<button :disabled="allowNextPage" @click="goToLastPage">
				&#62;&#62;
			</button>
		</div>
	</div>
	<product-form
		actionType="create"
		@close="toggleDisplayInsertForm"
		v-if="displayInsertForm"
		@refetch="$emit('refetch')"
	></product-form>
</template>
<script>
import ProductForm from "./ProductForm.vue";
export default {
	components: { ProductForm },
	props: ["totalPages", "currentPage"],
	emits: ["refetch", "updateCurrentPage", "updateItemsPerPage"],
	data() {
		return {
			displayInsertForm: false,
			itemsPerPage: 5,
		};
	},
	methods: {
		toggleDisplayInsertForm() {
			this.displayInsertForm = !this.displayInsertForm;
		},

		changePageNumber(add) {
			this.$emit("updateCurrentPage", this.currentPage + add);
		},
		goToFirstPage() {
			this.$emit("updateCurrentPage", 1);
		},
		goToLastPage() {
			this.$emit("updateCurrentPage", this.totalPages);
		},
	},
	computed: {
		allowPrevPage() {
			return this.currentPage === 1;
		},
		allowNextPage() {
			return this.currentPage === this.totalPages;
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
.paginator {
	margin-left: auto;
}
.paginator .current-page {
	background-color: rgb(77, 77, 77);
	color: white;
	border: 0px;
	font-weight: bold;
}
label {
	margin-top: 20px;
}
select {
	margin-top: 10px;
	margin-left: 10px;
}
</style>
