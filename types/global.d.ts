declare type RootStackParamList = {
    Main: undefined;
    JourneySelection: {journeyType: string} | undefined;
    JourneyScreen: undefined;
    UserHomeScreen: undefined;
    WelcomeScreen: undefined;
    Taim: undefined;
    JourneyInfoScreen: {journeyType: string} | undefined;
    PlantSelectionScreen: {journeyType: string} | undefined;
    JourneyPrepScreen: undefined;
    SproutSeedSoakScreen: undefined;
}

enum rolesEnum {
    USER = 0,
    ADMIN = 1
}

enum phaseEnum {
    PREP = 0,
    SOAKING = 1,
    GROWING = 2,
    HARVESTING = 3
}

enum tasksEnum {
    SOAK = 0,
    RINSE = 1,
    WATER = 2,
    FERTILIZE = 3,
    PRUNE = 4,
    HARVEST = 5,
    CHECK = 6
  }
  