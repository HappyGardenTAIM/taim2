declare type RootStackParamList = {
    Main: undefined;
    JourneySelection: {journeyType: string} | undefined;
    JourneyScreen: {journeyId: number} | {hideModal: boolean} | undefined;
    UserHomeScreen: undefined;
    WelcomeScreen: undefined;
    Taim: undefined;
    PlantSelectionScreen: {journeyType: string} | undefined;
    CompletedJourneysScreen: {journeyId: number} | undefined;
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
  