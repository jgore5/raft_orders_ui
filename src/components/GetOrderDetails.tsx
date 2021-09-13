import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import {Button, TextField} from '@material-ui/core';
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import ListItemText from "@material-ui/core/ListItemText";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
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
}));

export const GetOrderDetails: React.FC<Props> = () => {
    const [currentOrder, setCurrentOrder] = useState<Order>();
    const [searchOrderId, setSearchOrderId] = useState("");

    const onChangeSearchOrderId = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const newSearchOrderId = e.target.value;
        setSearchOrderId(newSearchOrderId)
    }

    const searchOnClick = () => {
        const url = `http://localhost:8080/api/v1/order/get-order/${searchOrderId}`

        axios.get(url).then(
            response =>
                setCurrentOrder(
                {
                    productName: response.data.productName,
                    productQuantity: response.data.productQuantity,
                    id: response.data.orderId
                })
        )
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
                    startIcon={<AddIcon/>}
                    onClick={() => searchOnClick()}
                />
            </div>
            <div>
                {currentOrder ?
                    <List className={classes.root}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <ImageIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Product Name" secondary={
                                currentOrder.productName
                            }/>
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <WorkIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Product Quantity" secondary={
                                currentOrder.productQuantity
                            }/>
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <BeachAccessIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Order Id" secondary={
                                currentOrder.id
                            }/>
                        </ListItem>
                    </List>
                    :
                    <></>
                }
            </div>
        </>
    );
}