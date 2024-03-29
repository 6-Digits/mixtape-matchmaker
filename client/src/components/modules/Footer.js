import React, {  } from "react";
import { Box, Link, Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme)=>({
	footer: {
		position: 'fixed',
		borderRadius: "10px 10px 0px 0px",
		left: "10%",
		bottom: "0px",
		width: "80%",
		padding: theme.spacing(2, 2, 2)
	},
	bold: {
		fontWeight: "bold"
	}
}));

function Footer() {
	const classes = useStyles();
	return (
		<Box bgcolor="text.disabled" className={classes.footer}>
			<Grid container direction="row" justify="space-evenly" alignItems="center">
				<div>
					© 2020 6 Digits, Inc.
				</div>
				<Link href="/about" color="text.primary" className={classes.bold}>About</Link>
			</Grid>
		</Box>
	);
}

export default Footer;
