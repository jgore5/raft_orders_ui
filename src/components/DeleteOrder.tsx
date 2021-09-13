import React, {useState} from 'react';
import {Button, TextField, Typography} from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/Remove";
import axios from 'axios';

interface Props {
    order: Order;
}

export const DeleteOrder: React.FC<Props> = () => {
    const [deleteOrderId, setDeleteOrderId] = useState("");
    const [deleteOrderMessage, setDeleteOrderMessage] = useState(false)
    const [failureDeleteOrderMessage, setFailureDeleteOrderMessage] = useState(false)


    const onChangeUpdateDeleteOrderId = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const newDeleteOrderId = e.target.value;
        setDeleteOrderId(newDeleteOrderId)
    }

    const deleteOnClick = () => {
        const url = `http://localhost:8080/api/v1/order/delete-order/${deleteOrderId}`

        axios.delete(url).then(
            response => {
                if (response.status === 200) {
                    setDeleteOrderMessage(true)
                }
            }
        ).catch(error => {
            console.log(error)
            setFailureDeleteOrderMessage(true)
        })
    }

    return (
        <>
            <div>
                <TextField
                    id="filled-basic"
                    label="Enter Id For Deletion"
                    variant="filled"
                    onChange={(e) => onChangeUpdateDeleteOrderId(e)}
                />
                <Button
                    variant="contained"
                    startIcon={<RemoveIcon/>}
                    onClick={() => deleteOnClick()}
                />
            </div>

            {deleteOrderMessage &&
            <Typography variant="subtitle2">
                {`Order ${deleteOrderId} Was Successfully Deleted`}
            </Typography>
            }

            {failureDeleteOrderMessage &&
            <Typography variant="subtitle2">
                {`Order ${deleteOrderId} Does Not Exist`}
            </Typography>
            }
        </>
    );
}