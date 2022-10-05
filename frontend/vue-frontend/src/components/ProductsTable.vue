<template>
	<h2>Products: 😊</h2>
	<div class="small-margin">
		<table>
			<tr>
				<th>Name</th>
				<th>Code</th>
				<th>Weight</th>
				<th>Price</th>
				<th>Color</th>
				<th>Tool</th>
			</tr>
			<product-row
				v-for="product in products"
				:key="product.id"
				:id="product.id"
				:name="product.name"
				:code="product.code"
				:color="product.color"
				:price="product.price"
				:weight="product.weight"
				@deleteProduct="deleteProduct"
			></product-row>
		</table>
		<product-table-footer @refetch="fetchProducts"></product-table-footer>
	</div>
</template>
<script>
import ProductRow from "./ProductRow.vue";
import ProductTableFooter from "./ProductsTableFooter.vue";
export default {
	components: { ProductRow, ProductTableFooter },
	data() {
		return {
			products: [],
			isLoading: false,
		};
	},
	created() {
		this.fetchProducts();
	},
	methods: {
		fetchProducts() {
			this.isLoading = true;
			fetch("http://localhost:3000/produse/query", {
				method: "POST",
				cache: "no-cache",
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then((response) => {
					console.log(response);
					return response.json();
				})
				.then((data) => {
					console.log(data);
					this.products = data;
				})
				.catch((error) => {
					console.log(error);
				})
				.finally(() => {
					this.isLoading = false;
				});
		},
		deleteProduct() {},
	},
};
</script>
<style>
.price {
	text-align: right;
}

table {
	font-family: arial, sans-serif;
	/* width: calc(100% - 20px);
     */
	width: 100%;
	/* margin: 10px; */
}

td,
th {
	border: 1px solid #dddddd;
	text-align: left;
	padding: 8px;
}

tr:nth-child(even) {
	background-color: #dddddd;
}

/* border */
table,
th,
td {
	border: 1px solid black;
	border-collapse: collapse;
}
.small-margin {
	margin: 10px;
}
</style>
