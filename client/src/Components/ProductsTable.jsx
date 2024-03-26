import Table from "./Table"

const columns = [{Header:"Id", accessor:"id"}];


function ProductsTable() {
  return Table(columns,[],"transactionBox", "Top Transactions ")
}

export default ProductsTable