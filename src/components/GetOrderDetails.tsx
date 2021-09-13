import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import {Button, TextField, Typography} from '@material-ui/core';
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';
import ListItemText from "@material-ui/core/ListItemText";
import ListIcon from '@material-ui/icons/List';
import PersonIcon from '@material-ui/icons/Person';
import List from "@material-ui/core/List";
import axios from "axios";

interface Props {
    order: Order;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    addButton: {
        marginTop: '10px',
        marginLeft: "10px",
    },
}));

export const GetOrderDetails: React.FC<Props> = () => {
    const [currentOrder, setCurrentOrder] = useState<Order>();
    const [searchOrderId, setSearchOrderId] = useState("");
    const [failureGetOrderMessage, setFailureGetOrderMessage] = useState(false)


    const onChangeSearchOrderId = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const newSearchOrderId = e.target.value;
        setSearchOrderId(newSearchOrderId)
    }

    const searchOnClick = () => {
        const url = `http://localhost:8080/api/v1/order/get-order/${searchOrderId}`

        axios.get(url).then(
            response => {
                setCurrentOrder(
                    {
                        productName: response.data.productName,
                        productQuantity: response.data.productQuantity,
                        id: response.data.id,
                        orderId: response.data.orderId
                    })
            }
        ).catch(error => {
            console.log(error)
            setFailureGetOrderMessage(true)
        })
    }

    const classes = useStyles();
    return (
        <>
            <div>
                <TextField
                    id="filled-basic"
                    label="Enter Id For Retrieval"
                    variant="filled"
                    onChange={(e) => onChangeSearchOrderId(e)}
                />
                <Button
                    variant="contained"
                    className={classes.addButton}
                    startIcon={<AddIcon/>}
                    color={"primary"}
                    onClick={() => searchOnClick()}
                />
            </div>
            <div>
                {currentOrder ?
                    <List className={classes.root}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <LocalGroceryStoreIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Product Name" secondary={
                                currentOrder.productName
                            }/>
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <ListIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Product Quantity" secondary={
                                currentOrder.productQuantity
                            }/>
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <PersonIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Order Id" secondary={
                                currentOrder.orderId
                            }/>
                        </ListItem>
                    </List>
                    :
                    <></>
                }
            </div>

            {failureGetOrderMessage &&
            <Typography variant="subtitle2">
                {`Order ${searchOrderId} Does Not Exist`}
            </Typography>
            }
        </>
    );
}