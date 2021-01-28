import React, { useEffect, useState } from "react";
import {  Text,  List, ListItem } from "native-base";


export default function ProjectDesc (props) {
  const [projDetail, setProj] = useState({})

  useEffect(() => {
    setProj(props.data)
    console.log(props.data);
  }, [props])

    return (
        
          <List>
            <ListItem>
              <Text>Proyek Kecil {projDetail.small_project_price ? 'Rp. '+projDetail.small_project_price+' /m' : 'silahkan edit harga' }{'\n'}<Text note>{projDetail.small_project_desc ? projDetail.small_project_desc : 'silahkan edit keterangan' }</Text></Text>
            </ListItem>
              
            <ListItem>
            <Text>Proyek Sedang {projDetail.medium_project_price ? 'Rp. '+projDetail.medium_project_price+' /m' : 'silahkan edit harga' }{'\n'}<Text note>{projDetail.medium_project_desc ? projDetail.medium_project_desc : 'silahkan edit keterangan' }</Text></Text>
              
            </ListItem>
            <ListItem>
            <Text>Proyek Besar {projDetail.big_project_price ? 'Rp. '+projDetail.big_project_price+' /m' : 'silahkan edit harga' }{'\n'}<Text note>{projDetail.big_project_desc ? projDetail.big_project_desc : 'silahkan edit keterangan' }</Text></Text>
              
            </ListItem>
          </List>
       
    )
} 