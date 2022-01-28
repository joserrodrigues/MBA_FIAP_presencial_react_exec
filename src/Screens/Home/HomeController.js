import React, { useRef, useState, useContext } from 'react';
import useAPI from '../../Services/APIs/Common/useAPI';
import persons from '../../Services/APIs/Persons/Persons';
import HomeView from './HomeView';
import { geolocated } from "react-geolocated";
import { useNavigate } from 'react-router-dom';
import Header from '../../Component/Header/Header';
import { InfoContext } from '../../store/InfoContext';

const HomeController = ({ coords, isGeolocationAvailable, isGeolocationEnabled }) => {

    const getPersonsGetAPI = useAPI(persons.getAllPersons);
    const deletePersonsAPI = useAPI(persons.deletePersons);
    const tableRef = useRef(null);
    const userCoordinates = useRef(null);
    const infoDelete = useRef(null);

    const { tokenLogin } = useContext(InfoContext);

    const [connectMessage, setConnectMessage] = useState("");
    const [connectCode, setConnectCode] = useState(0);
    const [isLoadingDelete, setIsLoadingDelete] = useState(false);
    const [isShowDialog, setIsShowDialog] = useState(false);
    
    const navigate = useNavigate();

    if (isGeolocationAvailable &&
        isGeolocationEnabled && coords !== null && coords !== undefined) {
        console.log(coords.latitude + " - " + coords.longitude);
        userCoordinates.current = coords;
    }

    const onChangePage = (info) => {
        navigate("Detail/" + info.id, {
            state: {
                info: JSON.stringify(info)
            }
        });
    }

    const onAddPage = (info) => {
        navigate("Add/", {
            state: {
                latitude: userCoordinates.current.latitude,
                longitude: userCoordinates.current.longitude
            }
        });
    }


    const onEditPage = (info) => {
        navigate("edit/"+info._id, {
            state: {
                info: JSON.stringify(info)
            }
        });
    }

    const onDeletePage = (info) => {
        setIsShowDialog(true);
        infoDelete.current = info;
    }

    const onClosePopup = () => {
        setIsShowDialog(false);
    }

    const onConfirmDelete = () => {
        setIsLoadingDelete(true);
        setIsShowDialog(false);
        deletePersonsAPI.requestPromise(infoDelete.current._id, tokenLogin)
            .then(info => {
                setConnectMessage("Colaborador removido com sucesso");
                setConnectCode(1);
                setIsLoadingDelete(false);
                setTimeout(() => {
                    setConnectCode(0);
                    setConnectMessage("");
                }, 3000);
            })
            .catch((error) => {
                setConnectMessage("O servidor retornou um erro= " + error.response.status);
                setIsLoadingDelete(false)
                setConnectCode(-1);
                setTimeout(() => {
                    setConnectCode(0);
                    setConnectMessage("");
                }, 3000);
            })
    }

    const getDataPage = (query) => {
        return new Promise((resolve, reject) => {
            console.log(query);

            let page = query.page + 1
            let info = `page=${page}&perPage=${query.pageSize}`;
            if (query.orderBy !== undefined && query.orderBy !== "") {
                info += `&orderBy=${query.orderBy.field}`
            }
            if (query.orderDirection !== undefined && query.orderDirection !== "") {
                info += `&orderDirection=${query.orderDirection}`
            }
            if (query.search !== undefined && query.search !== "") {
                info += `&search=${query.search}`
            }
            getPersonsGetAPI.requestPromise(info, tokenLogin)
                .then(info => {
                    console.log(info);
                    resolve({
                        data: info.persons,
                        page: info.page - 1,
                        totalCount: info.totalItems
                    });
                })
                .catch(error => {
                    console.log(error);
                })
        })
    }

    return (
        <>
            <Header />
            <HomeView person={getPersonsGetAPI.data} 
                loading={getPersonsGetAPI.loading}
                onChangePage={onChangePage}
                onAddPage={onAddPage}
                getDataPage={getDataPage}
                onEditPage={onEditPage}
                onDeletePage={onDeletePage}
                connectMessage={connectMessage}
                connectCode={connectCode}
                isLoadingDelete={isLoadingDelete} 
                isShowDialog={isShowDialog}
                onConfirmDelete={onConfirmDelete}
                onClosePopup={onClosePopup}
                tableRef={tableRef}/>
        </>
    );

}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(HomeController);