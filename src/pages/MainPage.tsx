import { Tabs, Tab, Box } from "@mui/material";
import { useState } from "react";
import CityManageableTable from '../components/city/CityManageableTable';
import RingManageableTable from '../components/ring/RingManageableTable';
import CreatureManageableTable from '../components/creature/CreatureManageableTable';
import CreatureManaging from "../components/creature/CreatureManaging";
import CityManaging from "../components/city/CityManaging";

export const MainPage = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    return (
    <Box>
        <Tabs value={selectedTab} onChange={(e, newValue) => setSelectedTab(newValue)} centered>
        <Tab label="Cities" />
        <Tab label="Rings" />
        <Tab label="Creatures" />
        </Tabs>
        <Box mt={2}>
        {selectedTab === 0 && <CityManageableTable/>}
        {selectedTab === 1 && <RingManageableTable/>}
        {selectedTab === 2 && <CreatureManageableTable/>}
        </Box>
        <CreatureManaging/>
        <CityManaging/>
  </Box>);


}