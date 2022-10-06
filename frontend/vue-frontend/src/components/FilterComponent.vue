<template>
	<tr class="white">
		<th>
			<input
				placeholder="Filter name"
				v-model.trim="name"
				@change="updateFilter('name', name)"
			/>
		</th>
		<th>
			<input
				placeholder="Filter code"
				v-model.trim="code"
				@change="updateFilter('code', code)"
			/>
		</th>
		<th>
			<div>
				<input
					placeholder="Filter weight"
					type="number"
					v-model="weight"
					@change="updateNumericFilter('weight')"
				/>
				<select
					v-model="operationTypeWeight"
					@change="updateNumericFilter('weight')"
				>
					<option value="=" selected>=</option>
					<option value=">">&#62;</option>
					<option value="<">&#60;</option>
					<!-- <option value="!=">!=</option> -->
				</select>
			</div>
		</th>
		<th>
			<div>
				<input
					placeholder="Filter price"
					type="number"
					v-model="price"
					@change="updateNumericFilter('price')"
				/>
				<select
					v-model="operationTypePrice"
					@change="updateNumericFilter('price')"
				>
					<option value="=" selected>=</option>
					<option value=">">&#62;</option>
					<option value="<">&#60;</option>
					<!-- <option value="!=">!=</option> -->
				</select>
			</div>
		</th>
		<th>
			<input
				placeholder="Filter color"
				v-model.trim="color"
				@change="updateFilter('color', color)"
			/>
		</th>
		<th></th>
	</tr>
</template>
<script>
export default {
	data() {
		return {
			filterParameters: {},
			numericFilter: {},
			operationTypePrice: "=",
			operationTypeWeight: "=",
			name: "",
			code: "",
			color: "",
			price: "",
			weight: "",
		};
	},
	inject: ["updateFilterParameters", "updateNumericFilterParameters"],
	methods: {
		updateFilter(filterName, value) {
			if (value) this.filterParameters[filterName] = value;
			else delete this.filterParameters[filterName];
			this.updateFilterParameters(this.filterParameters);
		},
		updateNumericFilter(attrName) {
			switch (attrName) {
				case "price":
					if (this.price === "") {
						delete this.numericFilter[attrName];
						break;
					}
					this.numericFilter[attrName] = {
						value: this.price,
						method: this.operationTypePrice,
					};
					break;
				case "weight":
					if (this.weight === "") {
						delete this.numericFilter[attrName];
						break;
					}
					this.numericFilter[attrName] = {
						value: this.weight,
						method: this.operationTypeWeight,
					};
					break;
			}
			this.updateNumericFilterParameters(this.numericFilter);
		},
	},
};
</script>
<style scoped>
th {
	padding: 0px;
}
tr.white {
	background-color: white;
}
input,
select {
	font-size: 2rem;
	padding: 0.4rem 0;
}
input[type="number"] {
	width: 50%;
}
div {
	display: flex;
	justify-content: space-between;
	padding: 0 2px;
}
</style>
