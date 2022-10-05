<template>
	<base-dialog @close="$emit('close')" :title="title">
		<form @submit.prevent="submitForm">
			<div class="form-control">
				<label for="name">Name</label>
				<input
					id="name"
					name="name"
					type="text"
					ref="name"
					required
					:value="productName"
				/>
			</div>
			<div class="form-control">
				<label for="code">Code</label>
				<input
					id="code"
					name="code"
					type="text"
					ref="code"
					required
					:value="productCode"
				/>
			</div>
			<div class="form-control">
				<label for="weight">Weight</label>
				<input
					id="weight"
					name="weight"
					type="number"
					min="0"
					step=".01"
					ref="weight"
					required
					:value="productWeight"
				/>
			</div>
			<div class="form-control">
				<label for="price">Price</label>
				<input
					id="price"
					name="price"
					type="number"
					min="0"
					ref="price"
					step=".01"
					required
					:value="productPrice"
				/>
			</div>
			<div class="form-control">
				<label for="color">Color</label>
				<input
					id="color"
					name="color"
					type="text"
					ref="color"
					required
					:value="productColor"
				/>
			</div>
			<div>
				<div v-if="isLoading">
					<img :src="loadingImage" />
					<p>Execute action...</p>
				</div>
				<p v-if="isSuccess">{{ successMessage }}</p>
				<p v-if="isError" class="error">
					Action failed, please try again later.⏱
				</p>
			</div>
			<menu>
				<button type="submit">
					{{ actionName }}
				</button>
				<button type="reset" @click="$emit('close')">Cancel</button>
			</menu>
		</form>
	</base-dialog>
</template>
<script>
import LoadingImage from "../assets/Loading.gif";
import BaseDialog from "./UI/BaseDialog.vue";
export default {
	mount() {
		console.log("yep yep");
	},
	components: { BaseDialog },
	props: {
		actionType: {
			type: String,
			required: true,
		},
		productId: {
			type: String,
			required: false,
		},
		productName: {
			type: String,
			required: false,
		},
		productCode: {
			type: String,
			required: false,
		},
		productPrice: {
			type: Number,
			required: false,
		},
		productWeight: {
			type: Number,
			required: false,
		},
		productColor: {
			type: String,
			required: false,
		},
	},
	data() {
		return {
			loadingImage: LoadingImage,
			isLoading: false,
			isSuccess: false,
			isError: false,
		};
	},
	emits: ["close"],
	methods: {
		submitForm() {
			console.log(this.actionType);
			const newProduct = {
				name: this.$refs.name.value,
				code: this.$refs.code.value,
				weight: this.$refs.weight.value,
				price: this.$refs.price.value,
				color: this.$refs.color.value,
				isDeleted: false,
			};
			this.isSuccess = false;
			this.isError = false;
			this.isLoading = true;
			let fetchPromise;
			if (this.actionType === "create") {
				fetchPromise = fetch("http://localhost:3000/produse", {
					method: "POST",
					cache: "no-cache",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(newProduct),
				});
			}
			if (this.actionType === "update") {
				fetchPromise = fetch(
					`http://localhost:3000/produse/${this.productId}`,
					{
						method: "PATCH",
						cache: "no-cache",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(newProduct),
					}
				);
			}
			fetchPromise
				.then((response) => {
					if (!response.ok) {
						throw `Error during fetch ${response.status}`;
					} else {
						this.isSuccess = true;
					}
				})
				.catch((error) => {
					this.isError = true;
					console.log(error);
				})
				.finally(() => {
					this.isLoading = false;
				});
		},
	},
	computed: {
		successMessage() {
			if (this.actionType === "create") return "Successfully created product✔";
			if (this.actionType === "update") return "Successfully updated product✔";
			return "Success✔";
		},
		title() {
			if (this.actionType === "create") return "Create product:";
			if (this.actionType === "update") return `Update product:`;
			return "Please complete form:";
		},
		actionName() {
			return this.actionType.charAt(0).toUpperCase() + this.actionType.slice(1);
		},
	},
};
</script>
<style scoped>
.error {
	color: red;
}
img {
	height: 24px;
	width: 24px;
	display: inline-block;
}

button {
	margin: 10px;
	padding: 1rem 2rem;
}

label {
	font-weight: bold;
	display: block;
	margin-bottom: 0.5rem;
}

input,
textarea {
	display: block;
	width: 100%;
	font: inherit;
	padding: 0.15rem;
	border: 1px solid #ccc;
}

input:focus,
textarea:focus {
	outline: none;
	border-color: #42b983;
	background-color: #d1eadf;
}

.form-control {
	margin: 1rem 0;
}
</style>
