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
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {XMarkIcon} from 'react-native-heroicons/outline';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');
const ios = Platform.OS == 'ios';

export default function SearchScreen() {
  const navigation = useNavigation();
  const [results, setResults] = useState([]);
  let movieName = 'The Killer';

  return (
    <SafeAreaView className="bg-neutral-700 flex-1">
      {/* {search box and cancel mark} */}
      <View className="mx-4 mb-3 mt-3 flex-row justify-between items-center border border-neutral-500 rounded-full">
        <TextInput
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
      {results.length > 0 ? (
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
                      source={require('../assets/images/movie_poster2.jpg')}
                      style={{width: width * 0.44, height: height * 0.3}}
                    />
                    <Text className="text-neutral-300 ml-1">
                      {movieName.length > 15
                        ? movieName.slice(0, 15) + '...'
                        : movieName}
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
