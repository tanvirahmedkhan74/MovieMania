import {
  View,
  Text,
  Dimensions,
  Platform,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {XMarkIcon} from 'react-native-heroicons/outline';
import {useNavigation} from '@react-navigation/native';
import Loading from '../components/loading';
import debounce from 'lodash';
import { fallBackMoviePoster, image185, searchMovies } from '../api/moviedb';

const {width, height} = Dimensions.get('window');
const ios = Platform.OS == 'ios';

export default function SearchScreen() {
  const navigation = useNavigation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = value => {
    if(value && value.length > 2) {
      setLoading(true);
      searchMovies(value).then(data => {
        setLoading(false);
        // console.log('Got it!', data)
        if(data && data.results) setResults(data.results);
      })
    }else{
      setLoading(false);
      setResults([]);
    }
    if(value && value.length > 2){
      console.log(value);
    }
  }

  // Will Implement later
  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  return (
    <SafeAreaView className="bg-neutral-700 flex-1">
      {/* {search box and cancel mark} */}
      <View className="mx-4 mb-3 mt-3 flex-row justify-between items-center border border-neutral-500 rounded-full">
        <TextInput
          onChangeText={handleSearch}
          placeholder="Search Movie"
          placeholderTextColor={'lightgray'}
          className="pb-1 pl-6 mb-1 flex-1 text-base font-semibold text-white tracking-wider"
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          className="rounded-full p-3 m-1 bg-neutral-500">
          <XMarkIcon size="25" color="white" />
        </TouchableOpacity>
      </View>

      {/* {serach result} */}

      {loading ? (
        <Loading />
      ) : results.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 15}}
          className="space-y-3">
          <Text className="text-white ml-1 font-semibold">
            Results: {results.length}
          </Text>

          {/* {mapping each result} */}
          <View className="flex-row justify-between flex-wrap">
            {results.map((item, index) => {
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => navigation.push('Movie', item)}>
                  <View className="space-y-2 mb-3">
                    <Image
                      className="rounded-3xl"
                      // source={require('../assets/images/movie_poster2.jpg')}
                      source={{uri: image185(item?.poster_path) || fallBackMoviePoster}}
                      style={{width: width * 0.44, height: height * 0.3}}
                    />
                    <Text className="text-neutral-300 ml-1">
                      {item?.title.length > 15
                        ? item?.title.slice(0, 15) + '...'
                        : item?.title}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View className="flex-row justify-center">
          <Image
            source={require('../assets/images/no_result.jpg')}
            className="h-95 w-95"
          />
        </View>
      )}
    </SafeAreaView>
  );
}
