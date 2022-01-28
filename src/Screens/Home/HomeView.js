import React, { useContext } from 'react';
import { Grid, Typography, Alert, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import MaterialTable from 'material-table';
import './Home.css'
import CustomButton from '../../Component/CustomButton/CustomButton';


export default function HomeView({ loading, onChangePage, getDataPage, onAddPage, onEditPage, 
    onDeletePage, connectMessage, connectCode, isLoadingDelete, tableRef,
    isShowDialog, onConfirmDelete, onClosePopup }) {

    let name = "";
    const columns = [
        { title: 'SobreNome', field: 'lastName', },
        { title: 'Nome', field: 'firstName' },
        { title: 'Telefone', field: 'phone' }
    ];

    let message = null;
    if (connectMessage !== "") {
        let severity = "success";
        if (connectCode !== 1) {
            severity = "error";
        } else {
            if (tableRef.current != null){
                tableRef.current.onQueryChange();
            }            
        }
        message = (
            <Alert severity={severity} variant="filled"> {connectMessage} </Alert>
        );
    }

    let actionButons = [];
    if (!isLoadingDelete){
        actionButons = [
            {
                icon: 'visibility',
                tooltip: 'See Detail',
                onClick: (event, rowData) => {
                    onChangePage(rowData)
                }
            },
            {
                icon: 'edit',
                tooltip: 'Edit Person',
                onClick: (event, rowData) => {
                    onEditPage(rowData)
                }
            },
            {
                icon: 'delete',
                tooltip: 'Delete Person',
                onClick: (event, rowData) => {
                    onDeletePage(rowData)
                }
            }
        ]
    }

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            justifyContent="center"
            alignItems="center">
            {message}
            <Typography xs={12} gutterBottom variant="h3" className="text">
                Lista de Colaboradores
            </Typography>
            <Grid item xs={12} className='divTopButton'>
                <CustomButton onClick={onAddPage}>Adicionar Colaborador</CustomButton>
            </Grid>
            <Grid item xs={12} className='divTopButton'>
                <MaterialTable
                    xs={12}
                    title="Remote Data Preview"
                    columns={columns}
                    tableRef={tableRef}
                    className="customTable"
                    data={getDataPage}
                    isLoading={loading || isLoadingDelete}
                    actions={actionButons}
                    options={{
                        showTitle: false,
                        search: true,
                        actionsColumnIndex: -1,
                        headerStyle: {
                            backgroundColor: '#555',
                            color: '#ed145b',
                        },
                        rowStyle: {
                            color: '#ed145b'
                        },
                        searchFieldStyle: {
                            color: '#ed145b',
                            borderBottom: '2px solid #333',
                        }
                    }}

                />
                <Dialog
                    open={isShowDialog}
                    onClose={onClosePopup}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Deseja remover o colaborador?"}
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={onClosePopup}>Não</Button>
                        <Button onClick={onConfirmDelete} autoFocus>
                            Sim
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        </Grid>
    );
}