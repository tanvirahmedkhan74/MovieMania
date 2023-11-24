import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
} from 'react-native';
import React from 'react';
import {styles} from '../theme';
import {useNavigation} from '@react-navigation/native';
import { fallBackMoviePoster, image185 } from '../api/moviedb';

var {width, height} = Dimensions.get('window');

export default function MovieList({title, data, hideSeeAll}) {
  let movieName = 'The Killer';
  const navigation = useNavigation();

  return (
    <View className="mb-8 space-y-4">
      <View className="mx-4 justify-between flex-row item-center">
        <Text className="text-white text-xl">{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text style={styles.text} className="text-lg">
              See All
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {/* movie roww*/}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 15}}>
        {data.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.push('Movie', item)}>
              <View className="space-y-1 mr-4">
                <Image
                  // source={require('../assets/images/movie_poster2.jpg')}
                  source={{uri: image185(item.poster_path) || fallBackMoviePoster}}
                  className="rounded-3xl"
                  style={{width: width * 0.33, height: height * 0.22}}
                />
                <Text className="text-neutral-300 ml-2">
                  {item.title.length > 14 ? item.title.slice(0, 14) : item.title}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
}
