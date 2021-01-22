import React from "react";
import { Container, Text, Content, List, ListItem } from "native-base";


export default function ProjectDesc () {

    return (
        
          <List>
            <ListItem>
              <Text>Proyek Kecil (Rp.100.000 / meter){'\n'}<Text note>antara 0 - 10 meter</Text></Text>
            </ListItem>
              
            <ListItem>
            <Text>Proyek Sedang (Rp.750.000 / meter){'\n'}<Text note>antara 11 - 50 meter</Text></Text>
              
            </ListItem>
            <ListItem>
            <Text>Proyek Besar (Rp.50.000 / meter){'\n'}<Text note>50 meter keatas</Text></Text>
              
            </ListItem>
          </List>
       
    )
} 