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
				@refetch="fetchProducts"
			></product-row>
		</table>
		<product-table-footer
			:totalPages="totalPages"
			:currentPage="currentPage"
			@updateCurrentPage="updateCurrentPage"
			@refetch="fetchProducts"
		></product-table-footer>
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
			totalPages: null,
			currentPage: 1,
			itemsPerPage: 5,
		};
	},
	created() {
		this.fetchProducts();
	},
	methods: {
		fetchProducts() {
			this.isLoading = true;
			const queryObject = { page: this.currentPage, limit: this.itemsPerPage };
			fetch("http://localhost:3000/produse/query", {
				method: "POST",
				cache: "no-cache",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(queryObject),
			})
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					this.products = data.products;
					this.totalPages = data.totalPages;
				})
				.catch((error) => {
					console.log(error);
				})
				.finally(() => {
					this.isLoading = false;
				});
		},
		updateCurrentPage(newPageNumber) {
			this.currentPage = newPageNumber;
			this.fetchProducts();
		},
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
