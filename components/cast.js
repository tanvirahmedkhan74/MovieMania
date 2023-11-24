import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import { fallBackPersonImage, image185 } from '../api/moviedb';

export default function Cast({cast, navigation}) {
  let personName = 'Cillian Murphy';
  let characterName = 'Dr. Robert Oppenheimer';

  return (
    <View className="my-6">
      <Text className="text-white text-lg mx-4 mb-5">Top Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 15}}>
        {cast &&
          cast.map((person, index) => {
            return (
              <TouchableOpacity key={index} 
              className="mr-4 items-center"
              onPress={() => navigation.navigate('Person', person)}
              >
                <Text className="text-white text-xs mt-1">
                  {person.character.length > 10
                    ? person.character.slice(0, 10) + '...'
                    : person.character}
                </Text>
                <View className="overflow-hidden rounded-full h-20 w-20 border border-neutral-300">
                  <Image
                    // source={require('../assets/images/cast.jpg')}
                    source={{uri: image185(person.profile_path) || fallBackPersonImage}}
                    className="rounded-2xl h-24 w-20 mt-1"
                  />
                </View>
                <Text className="text-neutral-400 text-xs mt-1">
                  {person.original_name.length > 10
                    ? person.original_name.slice(0, 10) + '...'
                    : person.original_name}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
}
