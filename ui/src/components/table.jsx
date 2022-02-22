import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from '@material-ui/core/TablePagination';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from "@material-ui/core/Paper";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables({ data }) {
  const classes = useStyles();

  const headers = data.reduce((output, entry) => {
    const result = output;
    Object.keys(entry).forEach((key) => {
      if (!result.includes(key)) result.push(key);
    });
    return result;
  }, []);
	
	//Pagination
	const [page, setPage] = React.useState(0);
	  const [rowsPerPage, setRowsPerPage] = React.useState(10);

	  const handleChangePage = (event, newPage) => {
		setPage(newPage);
	  };

	  const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	  };
		//Table Sorting
		const [orderDirection, setOrderDirection] = React.useState("asc");
		
		  const sortArray = (arr, orderBy) => {
		   switch (orderBy) {
			 case "asc":
			 default:
			   return arr.sort((a, b) =>
				 a.paymentAmount > b.paymentAmount ? 1 : b.paymentAmount > a.paymentAmount ? -1 : 0
			   );
			 case "desc":
			   return arr.sort((a, b) =>
				 a.paymentAmount < b.paymentAmount ? 1 : b.paymentAmount < a.paymentAmount ? -1 : 0
			   );
		   }
		 };
		 const handleSortRequest = () => {
		   sortArray(data, orderDirection);
		   setOrderDirection(orderDirection === "asc" ? "desc" : "asc");
		 };	
	
  return (
	<div>
		<TableContainer component={Paper}>
		  <Table className={classes.table} aria-label="customized table">
			<TableHead>
			  <TableRow>
				{headers.map((key) => {
				  return (
					
					<StyledTableCell key={key}>
						{
							key === 'paymentAmount' && (
							<TableSortLabel active={true} direction={'desc'} onClick={handleSortRequest}/>
							)		
						}
					
					  {
						// Convert camelcased values to uppercased values to be used as
						// dynamic headers
						key
						  .replace(/([A-Z])/g, " $1")
						  .replace(/^./, function (str) {
							return str.toUpperCase();
						  })
					  }
					</StyledTableCell>
					
				  );
				})}
			  </TableRow>
			</TableHead>
			<TableBody>
			  {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
				<StyledTableRow key={row.name}>
				  {headers.map((key) => {
					return (
					  <StyledTableCell key={`${row.name}-${key}`}>
						{row[key]}
					  </StyledTableCell>
					);
				  })}
				</StyledTableRow>
			  ))}
			</TableBody>
		  </Table>
		</TableContainer>
		<TablePagination
		  component="div"
		  count={data.length}
		  page={page}
		  onChangePage={handleChangePage}
		  rowsPerPage={rowsPerPage}
		  onChangeRowsPerPage={handleChangeRowsPerPage}
		/>
	</div>
  );
}
