import React from 'react';
import { Link } from 'react-router-dom';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

export const Settings = () => {
  return (
    <>
      <Tabs>
        <TabList>
          <Link to='/zestaw3'>
            <Tab _selected={{ bg: 'blue.100' }}>back</Tab>
          </Link>
          <Tab _selected={{ bg: 'blue.100' }}>Info</Tab>
          <Tab _selected={{ bg: 'blue.100' }}>user</Tab>
          <Tab _selected={{ bg: 'blue.100' }}>faq</Tab>
          <Tab _selected={{ bg: 'blue.100' }}>help</Tab>
        </TabList>
        <TabPanels>
          <TabPanel />
          <TabPanel>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam ducimus eius incidunt
            corrupti sunt. Minus error ad nisi sequi consequuntur eius, nemo repudiandae sapiente
            natus tempore alias molestiae iste quia.
          </TabPanel>
          <TabPanel>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat officia minus mollitia a
            beatae, quasi facere ullam debitis dolor sunt libero sint natus eius error totam eum,
            culpa, illum tempore.
          </TabPanel>
          <TabPanel>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus voluptas praesentium
            asperiores accusamus eligendi, reprehenderit maxime, sunt labore beatae, veritatis
            quidem sint tempora explicabo! Facilis veniam rerum laboriosam consequatur totam.
          </TabPanel>
          <TabPanel>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut vero, modi temporibus ea
            dolorum cupiditate fuga soluta eos quaerat ipsa eum laudantium odio quos tempore, vel,
            eveniet rem sequi sed?
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};
