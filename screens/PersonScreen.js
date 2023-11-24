import {
  View,
  Text,
  Dimensions,
  Platform,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {HeartIcon} from 'react-native-heroicons/solid';
import {styles} from '../theme';
import {useNavigation, useRoute} from '@react-navigation/native';
import MovieList from '../components/movieList';
import Loading from '../components/loading';
import { fallBackPersonImage, fetchPersonDetails, fetchPersonMovies, image342 } from '../api/moviedb';

var {width, height} = Dimensions.get('window');
const ios = Platform.OS == 'ios';
const topMargin = ios ? '' : 'mt-3';

export default function PersonScreen() {
  const {params: item} = useRoute();

  const [person, setPerson] = useState([]);
  const [personMovies, setPersonMovies] = useState([]);
  const [isFavourite, setIsFavourite] = useState(false);
  const navigation = useNavigation();
 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPersonDetails(item.id);
    getPersonMovies(item.id);
  }, [item])

  const getPersonDetails = async id=> {
    const data = await fetchPersonDetails(id);
    if(data) setPerson(data);
    setLoading(false);
  }

  const getPersonMovies = async id=> {
    const data = await fetchPersonMovies(id);
    if(data && data.cast) setPersonMovies(data.cast);
  }

  return (
    <ScrollView
      className="flex-1 bg-neutral-800"
      contentContainerStyle={{paddingBottom: 20}}>
      <SafeAreaView
        className={
          'z-20 w-full flex-row justify-between item-center px-3 ' + topMargin
        }>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.background}
          className="rounded-xl p-1">
          <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)}>
          <HeartIcon size="38" color={isFavourite ? 'red' : 'white'} />
        </TouchableOpacity>
      </SafeAreaView>

      {/* {Person Details} */}
      {loading ? (
        <Loading />
      ) : (
        <View>
          <View
            className="flex-row justify-center"
            style={{
              shadowColor: 'grey',
              shadowOpacity: 1,
              shadowOffset: {width: 0, height: 5},
              shadowRadius: 40,
            }}>
            <View className="items-center rounded-full overflow-hidden h-72 w-72 border-2">
              <Image
                // source={require('../assets/images/cast.jpg')}
                source={{uri: image342(person.profile_path) || fallBackPersonImage}}
                style={{width: width * 0.74, height: height * 0.44}}
              />
            </View>
          </View>

          <View className="mt-6">
            <Text className="text-3xl text-white font-bold text-center">
              {person?.name}
            </Text>
            <Text className="text-base text-neutral-300 text-center">
              {person?.place_of_birth}
            </Text>
          </View>
          <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full">
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">Gender</Text>
              <Text className="text-neutral-300 font-sm">
                {
                  person?.gender == '1' ? 'Female' : 'Male'
                }
              </Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">Birthdate</Text>
              <Text className="text-neutral-300 font-sm">{person?.birthday}</Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">Known For</Text>
              <Text className="text-neutral-300 font-sm">{person?.known_for_department}</Text>
            </View>
            <View className="px-2 items-center">
              <Text className="text-white font-semibold">Popularity</Text>
              <Text className="text-neutral-300 font-sm">{person?.popularity?.toFixed(2)}</Text>
            </View>
          </View>

          {/* {biography} */}
          <View className="my-6 mx-4 space-y-2">
            <Text className="text-white text-lg">Biography</Text>
            <Text className="text-neutral-400 tracking-wide">
              {person?.biography || 'N/A'}
            </Text>
          </View>

          {/* {Actor's movies} */}
          <MovieList
            title="Person's Movies"
            data={personMovies}
            hideSeeAll={true}
          />
        </View>
      )}
    </ScrollView>
  );
}
