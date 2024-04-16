import { gql, useQuery } from "@apollo/client";
import React from "react";
import { View, Text, FlatList, StyleSheet, SafeAreaView } from "react-native";

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

const Journey = () => {
  // placeholder journeyId
  const journeyId = 9
  const { data, loading, error } = useQuery(GET_TASKDETAILS, {
      variables: { journeyId: journeyId}
  })

  if (loading) {
    return <Text>Laadin...</Text>;
  }

  if (error) {
    return <Text>Tekkis viga: {error.message}</Text>;
  }

  const sortedDoneTasks = [...data.journey.taskDetails.doneTasks].sort((a, b) => { 
    const dateA = new Date(a.lastDone).getTime()
    const dateB = new Date(b.lastDone).getTime()

    return dateA - dateB
  })
  const sortedPlantTasks = [...data.journey.taskDetails.plantTasks].sort((a, b) => a.order - b.order)
  const sortedTypeTasks = [...data.journey.taskDetails.typeTasks].sort((a, b) => a.order - b.order)

  const sortedTasks = []
  
  while (sortedPlantTasks.length > 0 || sortedTypeTasks.length > 0) {
    if (sortedPlantTasks.length === 0) {
      sortedTasks.push(sortedTypeTasks.shift())
    } else if (sortedTypeTasks.length === 0) {
      sortedTasks.push(sortedPlantTasks.shift())
    } else if (sortedPlantTasks[0].order <= sortedTypeTasks[0].order) {
      sortedTasks.push(sortedPlantTasks.shift())
    } else {
      sortedTasks.push(sortedTypeTasks.shift())
    }
  } 

  const taskArray = [...sortedDoneTasks, ...sortedTasks]

  const item = ({item}) => (
      <View style={[styles.item, item.__typename === 'Task' ? styles.doneTask : styles.item]}>
        <Text style={styles.title}>{item.taskDetail.taskType}</Text>
        <Text>{item.taskDetail.description}</Text>
        {item.lastDone && (
          <Text>Last Done: {new Date(item.lastDone).toLocaleString()}</Text>
        )}
      </View>
  );

  const keyExtractor = (item, index) => {
    if (item.__typename === 'Task') {
      return `done_${item.taskDetail.id}`;
    } else if (item.__typename === 'SproutToTaskDetail' || item.__typename === 'FoodToTaskDetail' || item.__typename === 'FlowerToTaskDetail') {
      return `type_${item.taskDetail.id}`;
    } else {
      return `plant_${item.taskDetail.id}`;
    }
  };

  const initialIndex = taskArray.findIndex(task => task.__typename !== 'Task');  

  return (
    <SafeAreaView style={styles.container}>
     <FlatList
        data={taskArray}
        horizontal={true}
        pagingEnabled={true}
        renderItem={item}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.horizontalList}
        initialScrollIndex={initialIndex}
        snapToAlignment="center"
        getItemLayout={(_, index) => ({
          length: 300 + 16 * 2,
          offset: (290 + 16*2) * index,
          index,
          })
        }
      />
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
    backgroundColor: '#93C392',
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
});