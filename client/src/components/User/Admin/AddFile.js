import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { Link } from 'react-router-dom';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPlusCircle, faTrash } from '@fortawesome/fontawesome-free-solid';
import { CircularProgress } from '@material-ui/core';

import UserLayout from './../../../hoc/UserLayout';
import { USER_SERVER } from './../../utils/misc';

class AddFile extends Component {
    constructor() {
        super()
        this.state = {
            formSuccess: false,
            formError: false,
            uploading: false,
            files: []
        }
    }

    componentDidMount() {
        axios.get(`${USER_SERVER}/files`).then(response => {
            this.setState({files: response.data.items});
        });
    }
    

    onDrop(files) {
        this.setState({uploading: true});
        let formData = new FormData();
        const config = {
            header: {'content-type': 'multipart/form-data'}
        }

        formData.append('file', files[0]);

        axios.post(`${USER_SERVER}/uploadFile`, formData, config).then(response => {
            if (response.data.success) {
                this.componentDidMount();
                this.setState({
                    uploading: false,
                    formSuccess: true,
                    formError: false
                }, () => {
                    setTimeout(() => {
                        this.setState({formSuccess: false});
                    }, 2000);
                });   
            } else {
                this.setState({formError: true});
            }
        });
    }

    download = (item) => {
        axios({
            url: `${USER_SERVER}/download/${item}`, //your url
            method: 'GET',
            responseType: 'blob', // important
            }).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', item); //or any other extension
                document.body.appendChild(link);
                link.click();
        });
    }

    deleteFile = (item) => {
        axios.get(`${USER_SERVER}/deleteFile/${item}`).then(response => {
            if (response.data.success) {
                this.componentDidMount();
            }
        });
    }

    showFileList = () => (
        this.state.files ?
            this.state.files.map((item, i) => (
                // <li key={i} onClick={() => this.download(item)}>
                <li key={i}>
                    <span onClick={() => this.download(item)} style={{cursor: 'pointer'}}>
                        {item}
                    </span>

                    <FontAwesomeIcon
                        icon={faTrash}
                        style={{marginLeft: '10px', cursor: 'pointer'}}
                        onClick={() => this.deleteFile(item)}
                    />
                </li>
            ))
        : null
    )

    render() {
        return (
            <UserLayout>
                <h1>Upload file</h1>
                <div>
                    <Dropzone
                        onDrop={(files) => this.onDrop(files)}
                        multiple={false}
                        className='dropzone_box'
                        style={{cursor: 'pointer'}}
                    >
                        <div className="wrap">
                            <FontAwesomeIcon
                                icon={faPlusCircle}
                            />
                        </div>
                    </Dropzone>
                    {
                        this.state.uploading ?
                            <div 
                                className="dropzone_box"
                                style={{
                                    textAlign:'center',
                                    paddingTop:'60px'
                                }}
                            >
                                <CircularProgress
                                    style={{color:'#00bcd4'}}
                                    thickness={7}
                                />
                            </div>
                        : null
                    }
                    <div style={{clear: 'both'}}>
                        {
                            this.state.formSuccess ?
                                <div className="form_success">Success</div>
                            : null
                        }
                        {
                            this.state.formError ?
                                <div className="error_label">Please check your data</div>
                            : null
                        }
                    </div>
                    <hr/>
                    <div>
                        <ul>
                            {this.showFileList()}
                        </ul>
                    </div>
                </div>
            </UserLayout>
        );
    }
}

export default AddFile;