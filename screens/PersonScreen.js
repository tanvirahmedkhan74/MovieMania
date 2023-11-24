import {
  View,
  Text,
  Dimensions,
  Platform,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {HeartIcon} from 'react-native-heroicons/solid';
import {styles} from '../theme';
import {useNavigation} from '@react-navigation/native';
import MovieList from '../components/movieList';

var {width, height} = Dimensions.get('window');
const ios = Platform.OS == 'ios';
const topMargin = ios ? '' : 'mt-3';

export default function PersonScreen() {
  const [isFavourite, setIsFavourite] = useState(false);
  const navigation = useNavigation();
  const [personMovies, setPersonMovies] = useState([1,2,3,4,5]);
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
              source={require('../assets/images/cast.jpg')}
              style={{width: width * 0.74, height: height * 0.44}}
            />
          </View>
        </View>

        <View className="mt-6">
          <Text className="text-3xl text-white font-bold text-center">
            Cillian Murphy
          </Text>
          <Text className="text-base text-neutral-300 text-center">
            London, United Kingdom
          </Text>
        </View>
        <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full">
          <View className="border-r-2 border-r-neutral-400 px-2 items-center">
            <Text className="text-white font-semibold">Gender</Text>
            <Text className="text-neutral-300 font-sm">Male</Text>
          </View>
          <View className="border-r-2 border-r-neutral-400 px-2 items-center">
            <Text className="text-white font-semibold">Birthdate</Text>
            <Text className="text-neutral-300 font-sm">1964-09-02</Text>
          </View>
          <View className="border-r-2 border-r-neutral-400 px-2 items-center">
            <Text className="text-white font-semibold">Known For</Text>
            <Text className="text-neutral-300 font-sm">Acting</Text>
          </View>
          <View className="px-2 items-center">
            <Text className="text-white font-semibold">Popularity</Text>
            <Text className="text-neutral-300 font-sm">78.9</Text>
          </View>
        </View>

        {/* {biography} */}
        <View className="my-6 mx-4 space-y-2">
          <Text className="text-white text-lg">Biography</Text>
          <Text className="text-neutral-400 tracking-wide">
            Cillian Murphy (born 25 May 1976) is an Irish actor. He made his
            professional debut in Enda Walsh's 1996 play Disco Pigs, a role he
            later reprised in the 2001 screen adaptation. His early notable film
            credits include the horror film 28 Days Later (2002), the dark
            comedy Intermission (2003), the thriller Red Eye (2005), the Irish
            war drama The Wind That Shakes the Barley (2006), and the science
            fiction thriller Sunshine (2007). He played a transgender Irish
            woman in the comedy-drama Breakfast on Pluto (2005), which earned
            him a Golden Globe Award nomination.
          </Text>
        </View>

        {/* {Actor's movies} */}
        <MovieList title="Person's Movies" data={personMovies} hideSeeAll={true}/>
      </View>
    </ScrollView>
  );
}
