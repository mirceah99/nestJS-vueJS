<template>
	<tr>
		<th>{{ name }}</th>
		<th>{{ code }}</th>
		<th class="text-left">
			<span>{{ weight }}</span>
			<span> KG</span>
		</th>
		<th class="text-left">
			<span>{{ price }}</span>
			<span> RON</span>
		</th>
		<th>{{ color }}</th>
		<th>
			<span
				@click="deleteProduct"
				v-if="deleteIcon === 'deleteIcon' && !deletingError"
				>🗑️
			</span>
			<span class="delete-fail-msg" v-if="deletingError"
				>{{ deletingError }}
			</span>
			<img
				class="delete-loading"
				v-if="deleteIcon === 'loadingIcon'"
				:src="loadingImage"
			/>
			<span @click="toggleUpdateDialog">✏️</span>
		</th>
	</tr>
	<!-- TODO please change emit with provide - inject mechanism -->
	<product-form
		v-if="isUpdating"
		actionType="update"
		@close="toggleUpdateDialog"
		@refetch="$emit('refetch')"
		:productId="id"
		:productName="name"
		:productCode="code"
		:productColor="color"
		:productPrice="price"
		:productWeight="weight"
	></product-form>
</template>
<script>
import LoadingImage from "../assets/Loading.gif";
import ProductForm from "./ProductForm.vue";
export default {
	components: { ProductForm },
	data() {
		return {
			isDeleting: false,
			deletingError: null,
			loadingImage: LoadingImage,
			isUpdating: false,
		};
	},
	props: ["name", "code", "weight", "price", "color", "id"],
	emits: ["deleteProduct", "refetch"],
	methods: {
		deleteProduct() {
			const canDelete = confirm(`Delete ${this.name} (code: ${this.code})?`);
			console.log(canDelete);
			if (canDelete) {
				this.isDeleting = true;

				fetch(`http://localhost:3000/produse/${this.id}`, {
					method: "DELETE",
				})
					.then((response) => {
						if (response.ok) {
							this.$emit("deleteProduct", this.productId);
						} else throw response.status;
					})
					.catch((error) => {
						this.deletingError = "FAIL";
						console.log(error);
					})
					.finally(() => {
						this.isDeleting = false;
						this.$emit("refetch");
					});
			}
		},
		toggleUpdateDialog() {
			this.isUpdating = !this.isUpdating;
		},
	},
	computed: {
		deleteIcon() {
			if (this.isDeleting) return "loadingIcon";
			return "deleteIcon";
		},
	},
};
</script>
<style>
.delete-loading {
	width: 24px;
	height: 24px;
}
.delete-fail-msg {
	cursor: text;
	font-size: inherit;
}
tr th:last-child {
	display: flex;
	justify-content: space-around;
	font-size: 1.8rem;
	align-items: center;
}
tr th:last-child span:not(.delete-fail-msg) {
	cursor: pointer;
}
tr th:last-child span:hover:not(.delete-fail-msg) {
	scale: 1.5;
}
.delete-fail-msg:hover {
	scale: 1;
}
.delete-fail-msg::after {
	content: "Delete failed, please tray again later!";
	display: none;
}
.delete-fail-msg::after {
	content: "Delete failed, please tray again later!";
	display: none;
	position: absolute;
	background-color: #ddd;
}
.delete-fail-msg:hover::after {
	display: block;
}
.text-left {
	text-align: right;
}
</style>
