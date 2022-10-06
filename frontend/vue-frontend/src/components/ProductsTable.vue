<template>
	<h2>Products found ({{ numberOfProductsFound }}):</h2>
	<div class="small-margin">
		<table>
			<tr class="sort-header">
				<th>
					<div>
						<p>Name</p>
						<sort-arrows
							attributeName="name"
							@changeSort="changeSort"
						></sort-arrows>
					</div>
				</th>
				<th>
					<div>
						<p>Code</p>
						<sort-arrows
							attributeName="code"
							@changeSort="changeSort"
						></sort-arrows>
					</div>
				</th>
				<th>
					<div>
						<p>Weight</p>
						<sort-arrows
							attributeName="weight"
							@changeSort="changeSort"
						></sort-arrows>
					</div>
				</th>
				<th>
					<div>
						<p>Price</p>
						<sort-arrows
							attributeName="price"
							@changeSort="changeSort"
						></sort-arrows>
					</div>
				</th>
				<th>
					<div>
						<p>Color</p>
						<sort-arrows
							attributeName="color"
							@changeSort="changeSort"
						></sort-arrows>
					</div>
				</th>
				<th>
					<p>Tool</p>
				</th>
			</tr>
			<filter-component
				@updateFilterParameters="updateFilterParameters"
			></filter-component>
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
			<table-skeleton
				v-for="index in numberOfSkeletons"
				:key="index"
			></table-skeleton>
		</table>
		<p class="error-fetching" v-if="isError">
			Error fetching products, please try again later 😭😭😭
		</p>
		<product-table-footer
			:totalPages="totalPages"
			:currentPage="currentPage"
			@updateCurrentPage="updateCurrentPage"
			@refetch="fetchProducts"
			@updateItemsPerPage="updateItemsPerPage"
		></product-table-footer>
	</div>
</template>
<script>
import FilterComponent from "./FilterComponent.vue";
import ProductRow from "./ProductRow.vue";
import ProductTableFooter from "./ProductsTableFooter.vue";
import SortArrows from "./UI/SortArrows.vue";
import TableSkeleton from "./UI/TableSkeleton.vue";
export default {
	components: {
		ProductRow,
		ProductTableFooter,
		SortArrows,
		FilterComponent,
		TableSkeleton,
	},
	data() {
		return {
			products: [],
			sort: {},
			filterObject: {},
			numericFilter: {},
			isLoading: true,
			isError: false,
			totalPages: null,
			currentPage: 1,
			itemsPerPage: 5,
			numberOfSkeletons: this.itemsPerPage,
			numberOfProductsFound: "loading...",
		};
	},
	created() {
		this.fetchProducts();
	},
	methods: {
		fetchProducts() {
			this.isLoading = true;
			this.isError = false;
			this.numberOfSkeletons = +this.itemsPerPage; // convert string to number
			this.products = [];
			const queryObject = {
				page: this.currentPage,
				limit: this.itemsPerPage,
				sort: this.sort,
				filter: this.filterObject,
				numericFilter: this.numericFilter,
			};
			console.log("queryObject", queryObject);
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
					if (this.currentPage > data.totalPages) {
						this.currentPage = Math.max(data.totalPages, 1);
						this.fetchProducts();
					}
					this.numberOfProductsFound = data.totalResult;
				})
				.catch((error) => {
					console.log(error);
					this.isError = true;
				})
				.finally(() => {
					this.isLoading = false;
					this.numberOfSkeletons = 0;
				});
		},
		updateCurrentPage(newPageNumber) {
			this.currentPage = newPageNumber;
			this.fetchProducts();
		},
		changeSort(attributeName, sortValue) {
			if (sortValue) this.sort[attributeName] = sortValue;
			else delete this.sort[attributeName];
			this.fetchProducts();
		},
		updateFilterParameters(newFilterObject) {
			this.filterObject = newFilterObject;
			this.fetchProducts();
		},
		updateNumericFilter(newFilterObject) {
			this.numericFilter = newFilterObject;
			this.fetchProducts();
		},
		updateItemsPerPage(newItemsPerPage) {
			this.itemsPerPage = newItemsPerPage;
			this.fetchProducts();
		},
	},
	provide() {
		return {
			updateFilterParameters: this.updateFilterParameters,
			updateNumericFilterParameters: this.updateNumericFilter,
		};
	},
};
</script>
<style>
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
	background-color: #93e1be;
}

/* border */
table,
th,
td {
	border: 1px solid black;
	border-collapse: collapse;
}
.sort-header th div {
	display: flex;
}
.small-margin {
	margin: 10px;
}
.error-fetching {
	font-size: 2.2rem;
	margin: 15px;
}
</style>
