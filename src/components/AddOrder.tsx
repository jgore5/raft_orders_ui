import React, {useState} from 'react';
import axios from "axios";
import {Button, Typography} from "@material-ui/core";

interface Props {
    order: Order;
}

export const AddOrder: React.FC<Props> = () => {
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>()
    const [uploadOrderMessage, setUploadOrderMessage] = useState(false)


    const onChangeUpdateFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSelectedFiles = event.target.files;
        setSelectedFiles(newSelectedFiles)
    }

    const upLoadFiles = () => {
        const url = `http://localhost:8080/api/v1/order/save-order`
        if (selectedFiles) {
            const file = selectedFiles[0]
            console.log(file)
            const formData = new FormData()
            formData.append("file", file)

            axios.post(
                url,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }).then(
                response => {
                    if (response.status === 200) {
                        setUploadOrderMessage(true)
                    }
                }
            ).catch(error => {
                console.log(error)
            })
        }
    }

    return (
        <div className="mg20">
            <label htmlFor="btn-upload">
                <input
                    id="btn-upload"
                    name="btn-upload"
                    style={{display: 'none'}}
                    type="file"
                    onChange={(e) => onChangeUpdateFile(e)}/>
                <Button
                    className="btn-choose"
                    variant="outlined"
                    component="span">
                    Choose Files
                </Button>
            </label>
            <div className="file-name">
                {selectedFiles ? selectedFiles[0].name : null}
            </div>
            <Button
                className="btn-upload"
                color="primary"
                variant="contained"
                component="span"
                disabled={!selectedFiles}
                onClick={upLoadFiles}>
                Upload
            </Button>

            {uploadOrderMessage &&
            <Typography variant="subtitle2">
                Uploaded Files Successfully
            </Typography>
            }

        </div>
    );
}