import {useCallback, useEffect, useState} from "react";
import Base from "../components/Base";
import ListDetailNavBar from "../components/UI/Navbars/ListDetailNavBar";
import APIService from "../helpers/APIService";
import {Checkbox} from "@mui/material";
import ContentDivider from "../components/UI/Dividers/ContentDivider";
import Strings from "../values/Strings";

function ItemRow({ item }) {
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            padding: "10px"
        }}>
            <span>{item.name}</span>
            <Checkbox checked={item.checked}/>
        </div>
    );
}





function ListDetail({listID}){
    const [list, setList] = useState(undefined);

    const getData = useCallback(async ()=>{
        let data = await APIService.getListDetails(listID);
        if(data){
            setList(data);
        }

    }, [listID]);



    useEffect(()=>{
        void getData();
    }, [getData])


    return ( list ?  <Base

        navbar={<ListDetailNavBar name={list.name} />}
        content={
            <div>
                <div>
                    {list.items.map((item, index) => (
                        <ItemRow item={item}/>
                    ))}
                </div>
                <ContentDivider text={Strings.participating}/>
                <div>
                    {
                        list.participants.map((item, index) => (
                            <span>{item}</span>
                        ))
                    }
                </div>

            </div>


        }
    >
    </Base> : <h2>Loading</h2>);
}
export default ListDetail;
