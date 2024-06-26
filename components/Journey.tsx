import { gql, useQuery, useMutation } from "@apollo/client";
import React, { useEffect, useRef, useState } from "react";
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity, Image, ScrollView } from "react-native";
import JourneyComplete from "./JourneyComplete";
import { getTaskInEstonian } from "../helpers";
import AbandonJourney from "./AbandonJourney";
import Loader from "./Loader";
import FlipCard from 'react-native-flip-card'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const GET_TASKDETAILS = gql`
  query taskDetails($journeyId: Int!) {
    journey(id: $journeyId) {
      taskDetails {
        plantTasks {
          order
          taskDetail {
            id
            taskType
            description
            longDescription
            picture
          }        
        }
        typeTasks {
          ... on SproutToTaskDetail {
            order
            taskDetail {
              id
              taskType
              description
              longDescription
              picture
            }
          }
          ... on FoodToTaskDetail {
            order
            taskDetail {
              id
              taskType
              description
              longDescription
              picture
            }
          }
          ... on FlowerToTaskDetail {
            order
            taskDetail {
              id
              taskType
              description
              longDescription
              picture
            }
          }
        }
        doneTasks {
          id
          lastDone
          taskDetail {
            id
            taskType
            description
            longDescription
            picture
          }
        }
      }
      plant {
        name
        maturity
        image
        minGrowthTime
        maxGrowthTime
      }
      endDate
      status
    }
  }
`;

const CREATE_TASK = gql`
  mutation CreateTask($taskDetailId: Int!, $journeyId: Int!, $lastDone: DateTime!) {
    createTask(data: {taskDetailId: $taskDetailId, journeyId: $journeyId, lastDone: $lastDone} ) {
      id
      journey {
        id
      }
      status
      lastDone
      taskDetail {
        id
      }
    }
  }
`;

const UPDATE_JOURNEY_DATE = gql`
  mutation UpdateJourneyDate($journeyId: Int!, $endDate: DateTime!) {
    updateJourneyDate(data: {journeyId: $journeyId, endDate: $endDate}) {
      id
      endDate
    }
  }
`;

const Journey = ({ route }) => {
  
  const journeyId = route.params.journeyId;

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const [taskArray, setTaskArray] = useState([]);

  const [errorMessage, setErrorMessage] = useState(null);
  const [errorTaskDetailId, setErrorTaskDetailId] = useState(null);
  const [createTaskError, setCreateTaskError] = useState(null);
  const [journeyComplete, setJourneyComplete] = useState(false);
  const [modalVisible, setModalVisible] = useState(journeyComplete);
  const [disabled, setDisabled] = useState(false);
  
  const [createTask] = useMutation(CREATE_TASK);
  const [updateJourneyDate] = useMutation(UPDATE_JOURNEY_DATE); 
  
  const { data, loading, error, refetch } = useQuery(GET_TASKDETAILS, {
    variables: { journeyId: journeyId },     
  })

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refetch();
    });

    return unsubscribe;
  }, [navigation, refetch]);

  useEffect(() => {
    if (data && (data.journey.endDate || data.journey.status === 'ABANDONED')) {
      setDisabled(true);
    }
  }, [data])
  
  useEffect(() => {
    if (data) {
      const sortedDoneTasks = [...data.journey.taskDetails.doneTasks].sort((a, b) => { 
        const dateA = new Date(a.lastDone).getTime()
        const dateB = new Date(b.lastDone).getTime()  
        return dateA - dateB
      })
      const sortedPlantTasks = [...data.journey.taskDetails.plantTasks].sort((a, b) => a.order - b.order)
      const sortedTypeTasks = [...data.journey.taskDetails.typeTasks].sort((a, b) => a.order - b.order)

      const filteredPlantTasks = sortedPlantTasks.filter(
        (plantTask) =>
          !sortedDoneTasks.some(
            (doneTask) => doneTask.taskDetail.id === plantTask.taskDetail.id
          )
      );
      
      const filteredTypeTasks = sortedTypeTasks.filter(
        (typeTask) =>
          !sortedDoneTasks.some(
            (doneTask) => doneTask.taskDetail.id === typeTask.taskDetail.id
          )
      );      
    
      const sortedFilteredTasks = []
      
      while (filteredPlantTasks.length > 0 || filteredTypeTasks.length > 0) {
        if (filteredPlantTasks.length === 0) {
          sortedFilteredTasks.push(filteredTypeTasks.shift())
        } else if (filteredTypeTasks.length === 0) {
          sortedFilteredTasks.push(filteredPlantTasks.shift())
        } else if (filteredPlantTasks[0].order <= filteredTypeTasks[0].order) {
          sortedFilteredTasks.push(filteredPlantTasks.shift())
        } else {
          sortedFilteredTasks.push(filteredTypeTasks.shift())
        }
      }

      setTaskArray([...sortedDoneTasks, ...sortedFilteredTasks])      
    }
  }, [data])

  const handleJourneyComplete = () => {    
    if (!data.journey.endDate) {      
      const endDate = new Date().toISOString();

      updateJourneyDate({ variables: { journeyId, endDate } })
        .then(() => setJourneyComplete(true))
        .catch((error) => {
          console.error("Error updating journey end date:", error)
          setErrorMessage("Õpitee ei salvestunud. Proovi uuesti.")
        })
        .then(() => setModalVisible(true))
        .then(() => setErrorMessage(null)) 
    }
  }

  const handlePress = async (taskDetailId) => {
    const lastDone = new Date().toISOString()
    const lastTask = taskArray[taskArray.length - 1];  
    try {
      await createTask({ variables: { taskDetailId, journeyId, lastDone } }) 
      
      if (lastTask.taskDetail.id === taskDetailId) {
        handleJourneyComplete()
      }

      refetch()

      setCreateTaskError(null);
      setErrorTaskDetailId(null);    
    } catch(error) {
      console.error("Error creating task:", error);
      setErrorTaskDetailId(taskDetailId);
      setCreateTaskError("Ei õnnestunud! Proovi uuesti.");
    }
  }

  const item = ({item}) => (
    <FlipCard
      style={[styles.item, item.__typename === 'Task' || disabled ? styles.doneTask : styles.item]}
      friction={6}
      perspective={1000}
      flipHorizontal={true}
      flipVertical={false}
      flip={false}
      clickable={true}
    >
      <View style={[styles.item, item.__typename === 'Task' || disabled ? styles.doneTask : styles.item]}>
        <Text style={styles.title}>{getTaskInEstonian(item.taskDetail.taskType)}</Text>
        {item.taskDetail.taskType === 'HARVEST' ? (
          <Image source={{ uri: data.journey.plant.image }} style={styles.image} />
        ) : (
          <Image source={{ uri: item.taskDetail.picture }} style={styles.image} />
        )}
        {item.taskDetail.taskType === 'HARVEST' && (
          <>
          <Text style={styles.leadText}>{data.journey.plant.name} on valmis, kui:</Text>
          <Text style={styles.text}>{data.journey.plant.maturity}</Text>
          </>
        )}
        {item.taskDetail.taskType !== 'HARVEST' && (<Text style={styles.text}>{item.taskDetail.description}</Text>
        )}
        {item.taskDetail.taskType === 'RINSE' && (<Text style={styles.text}>Tee seda {data.journey.plant.minGrowthTime}-{data.journey.plant.maxGrowthTime} päeva.</Text>
        )}
        <Icon name="rotate-right" size={25} color="#1C0F13"/>
        {item.lastDone && (
          <Text>Tegid viimati: {new Date(item.lastDone).toLocaleString()}</Text>
        )}      
        {item.__typename !== 'Task' && !disabled && (
          <TouchableOpacity style={styles.button} onPress={() => handlePress(item.taskDetail.id)} disabled={disabled}>
            <Text style={styles.buttonLabel}>Tehtud!</Text>
          </TouchableOpacity>
        )}
        {errorTaskDetailId === item.taskDetail.id && (
          <Text style={styles.errorText}>{createTaskError}</Text>
        )}
      </View>

      <View style={styles.flipCard}>
        <ScrollView>
          <Text style={styles.text}>{item.taskDetail.longDescription}</Text>
          <View style={styles.flipCard}>
            <Icon name="rotate-left" size={25} color="#1C0F13" />
          </View>
        </ScrollView>
      </View>
    </FlipCard>
  );

  const keyExtractor = (item, index) => {
    if (item.__typename === 'Task') {
      return `done_${item.id}`;
    } else if (item.__typename === 'SproutToTaskDetail' || item.__typename === 'FoodToTaskDetail' || item.__typename === 'FlowerToTaskDetail') {
      return `type_${item.taskDetail.id}`;
    } else {
      return `plant_${item.taskDetail.id}`;
    }
  };

  let initialIndex = 0;
  if (taskArray.length > 0) {
    const lastTask = taskArray.length - 1;
    const lastIndex = taskArray[lastTask];
    if (lastIndex.__typename === 'Task') {
      initialIndex = lastTask; // Set initialIndex to the last task index
    } else {
      initialIndex = taskArray.findIndex(task => task.__typename !== 'Task');
    } 
  }

  const flatListRef = useRef(null);  

  useEffect(() => {
    if (flatListRef.current && initialIndex >= 0) {
      flatListRef.current.scrollToIndex({ index: initialIndex });
    }
  }, [initialIndex]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.largeText}>{data?.journey.plant.name}</Text>
      <>
        {errorMessage && (
          <Text style={styles.errorText}>{errorMessage}</Text>
        )}
      </>
      {loading ? (
        <Loader />
      ) : (
        <View style={styles.flatListContainer}>
          {taskArray.length > 0 && (            
            <FlatList
              ref={flatListRef}
              data={taskArray}
              horizontal={true}
              pagingEnabled={true}
              renderItem={item}
              keyExtractor={keyExtractor}
              contentContainerStyle={styles.horizontalList}
              initialScrollIndex={initialIndex}
              onScrollToIndexFailed={() => {}}
              snapToAlignment="center"
              getItemLayout={(_, index) => ({
                length: 300 + 16 * 2,
                offset: (300 + 16*2) * index,
                index,
              })}
            />            
          )}
          {taskArray.length > 0 && !disabled && (
            <View>
              <AbandonJourney journeyId={journeyId}/>            
            </View>
          )}
        </View>
      )}
      {route.params.hideModal ? null 
      : (<JourneyComplete 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)}
        /> ) }    
    </SafeAreaView>
  );
}

export default Journey

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  horizontalList: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#93C393',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 38,
    width: 300,    
  },
  doneTask: {
    backgroundColor: '#C0C0C0',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#caffa8',
    padding: 15,
    borderRadius: 10,
    margin: 10, // Add some margin between buttons
    minWidth: 120, // Set minimum width for buttons
    alignSelf: 'center',
  },
  buttonLabel: {
    color: '#1C0F13',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center', // Center the text horizontally
    maxWidth: '100%', // Ensure text doesn't overflow button width
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginHorizontal: 10,
    textAlign: 'center',
  },
  flatListContainer: {
    height: 450,
    marginVertical: 45,
  },
  largeText: {
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#93C385',
    marginHorizontal: 10,
    lineHeight: 35,
  },
  text: {
    color: '#1C0F13',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'justify',
  },
  leadText: {
    color: '#1C0F13',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  image: { 
    width: 100,
    height: 100, 
    marginBottom: 10, 
    borderRadius: 18 
  },
  buttonContainer: {
    justifyContent: 'center',
    marginBottom: 20,
  },
  disabled: {
    backgroundColor: '#F0F0F0', // Grey background color
    opacity: 0.5, // Reduced opacity to indicate disabled state
  },
  flipCard: {
    padding: 20,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  }
});