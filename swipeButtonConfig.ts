const swipeButtonConfig = {
  sprout_prep: [
      { title: 'Seemneid', thumbIconImageSource: require ('../assets/seeds.png'), identifier: 'sprout_seeds'  },
      { title: 'Klaaspurki', thumbIconImageSource: require ('../assets/jar.png'), identifier: 'sprout_jar' },
      { title: 'Marlit', thumbIconImageSource: require ('../assets/fabric.png'), identifier: 'sprout_cloth' },
      { title: 'Kummipaela', thumbIconImageSource: require ('../assets/rubber-band.png'), identifier: 'sprout_rubber' },
    ],
  plant_prep: [
    { title: 'Seemneid', thumbIconImageSource: require ('../assets/seeds.png'), identifier: 'plant_seeds'  },
    { title: 'Mulda', thumbIconImageSource: require ('../assets/soil.png'), identifier: 'plant_soil'  },
    { title: 'Potti', thumbIconImageSource: require ('../assets/plant-pot.png'), identifier: 'plant_pot' },
  ],
  sprout_soak: [
    { title: 'Pane purki paar sl seemneid.', thumbIconImageSource: require ('../assets/seeds.png'), identifier: 'add_seeds'  },
    { title: 'Täida purk veega.', thumbIconImageSource: require ('../assets/coffee-beans.png'), identifier: 'fill_water' },
    { title: 'Leota seemneid soojas kohas 8-12 tundi.', thumbIconImageSource: require ('../assets/soak.png'), identifier: 'soak' },
  ],
};

export default swipeButtonConfig;