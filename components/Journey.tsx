import { gql, useQuery, useMutation } from "@apollo/client";
import React, { useEffect, useRef, useState } from "react";
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import JourneyComplete from "./JourneyComplete";

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
          }        
        }
        typeTasks {
          ... on SproutToTaskDetail {
            order
            taskDetail {
              id
              taskType
              description
            }
          }
          ... on FoodToTaskDetail {
            order
            taskDetail {
              id
              taskType
              description
            }
          }
          ... on FlowerToTaskDetail {
            order
            taskDetail {
              id
              taskType
              description
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
          }
        }
      }
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

  const [taskArray, setTaskArray] = useState([]);

  const [errorMessage, setErrorMessage] = useState(null);
  const [errorTaskDetailId, setErrorTaskDetailId] = useState(null);
  const [createTaskError, setCreateTaskError] = useState(null);
  const [journeyComplete, setJourneyComplete] = useState(false);
  
  const [createTask] = useMutation(CREATE_TASK);
  const [updateJourneyDate] = useMutation(UPDATE_JOURNEY_DATE); 
  
  const { data, loading, error, refetch } = useQuery(GET_TASKDETAILS, {
    variables: { journeyId: journeyId },     
  })
  
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

  const handlePress = async (taskDetailId) => {
    const lastDone = new Date().toISOString()
  
    try {
      await createTask({ variables: { taskDetailId, journeyId, lastDone } })   
      
      refetch()

      setCreateTaskError(null);
      setErrorTaskDetailId(null);
    
    } catch(error) {
      console.error("Error creating task:", error);
      setErrorTaskDetailId(taskDetailId);
      setCreateTaskError("Ei õnnestunud! Proovi uuesti.");
    }
  
    try {
      const lastItem = taskArray[taskArray.length - 1]
      if (lastItem.taskDetail.id === taskDetailId) {
        const endDate = new Date().toISOString();
        await updateJourneyDate({ variables: { journeyId, endDate } });
        setJourneyComplete(true);       
      }
      
      setErrorMessage(null); 
    } catch (error) {
      console.error("Error updating journey end date:", error);
      setErrorMessage("Õpitee ei salvestunud. Proovi uuesti.")
    }
  }

  const item = ({item}) => (
    <View style={[styles.item, item.__typename === 'Task' ? styles.doneTask : styles.item]}>
      <Text style={styles.title}>{item.taskDetail.taskType}</Text>
      <Text>{item.taskDetail.description}</Text>
      {item.lastDone && (
        <Text>Last Done: {new Date(item.lastDone).toLocaleString()}</Text>
      )}      
      {item.__typename !== 'Task' && (
        <TouchableOpacity style={styles.button} onPress={() => handlePress(item.taskDetail.id)}>
          <Text style={styles.buttonLabel}>Tehtud!</Text>
        </TouchableOpacity>
      )}
      {errorTaskDetailId === item.taskDetail.id && (
        <Text style={styles.errorText}>{createTaskError}</Text>
      )}
    </View>
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

  if (flatListRef.current && initialIndex >= 0) {
    flatListRef.current.scrollToIndex({ index: initialIndex });
  }

  return (
    <SafeAreaView style={styles.container}>
      <>
        {errorMessage && (
          <Text style={styles.errorText}>{errorMessage}</Text>
        )}
      </>
      {taskArray.length > 0 ? (
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
      ) : (
        <Text>Laadin...</Text>
      )}
      <JourneyComplete visible={journeyComplete} onClose={() => setJourneyComplete(false)} />
    </SafeAreaView>
  );
}

export default Journey

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    borderRadius: 8,
    width: 300,
    
  },
  doneTask: {
    backgroundColor: '#C0C0C0',
  },
  title: {
    fontSize: 32,
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
});