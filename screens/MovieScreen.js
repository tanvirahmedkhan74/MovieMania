import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  Image,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {HeartIcon} from 'react-native-heroicons/solid';
import {styles} from '../theme';
import LinearGradient from 'react-native-linear-gradient';
import Cast from '../components/cast';
import MovieList from '../components/movieList';
import Loading from '../components/loading';

const {width, height} = Dimensions.get('window');
const ios = Platform.OS == 'ios';
const topMargin = ios ? '' : 'mt-3';

const stylesGrading = StyleSheet.create({
  linearGradient: {
    width,
    height: height * 0.4,
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
});

export default function MovieScreen() {
  const {params: item} = useRoute();
  const [isFavourite, setIsFavourite] = useState(false);
  const navigation = useNavigation();
  const [cast, setCast] = useState([1, 2, 3, 4]);
  const [similarMovies, setSimilarMovies] = useState([1, 2, 3, 4]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // fetch the movie detail on change from api
  }, [item]);
  return (
    <ScrollView
      contentContainerStyle={{paddingBottom: 20}}
      className="flex-1 bg-neutral-800">
      {/* Back button and movie poster */}
      <View className="w-full">
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

        {loading ? (
          <Loading />
        ) : (
          <View>
            <Image
              source={require('../assets/images/movie_poster.jpg')}
              style={{width, height: height * 0.55, marginTop: -42}}
            />
            <LinearGradient
              colors={[
                'transparent',
                'rgba(23, 23, 23, 0.8)',
                'rgba(23, 23, 23, 1)',
              ]}
              locations={[0, 0.5, 1]}
              style={stylesGrading.linearGradient}
              className="absolute bottom-0"
            />
          </View>
        )}
      </View>

      {/* {Movie details} */}
      <View style={{marginTop: -(height * 0.09)}} className="space-y-3">
        <Text className="text-white text-center text-3xl font-bold tracking-wider">
          The Killer
        </Text>
        {/* {status, release, runtime} */}
        <Text className="text-neutral-400 font-semibold text-base text-center">
          Released - 2020 - 170 min
        </Text>

        {/* {genres} */}
        <View className="flex-row justify-center mx-4 space-x-2">
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Action *
          </Text>
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Thrill *
          </Text>
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Comedy *
          </Text>
        </View>

        {/* {description} */}
        <Text className="text-neutral-300 mx-2 tracking-wide">
          *OPPENHEIMER IS "NOT FOR EVERYONE" AS STATED BY CHRISTROPHER NOLAN
          BEFORE THE RELEASE OF THE FILM HIMSELF. * But those who have ample
          knowledge of physics and chemistry, this film is a masterpiece. The
          film takes the viewer into the mind of the "Father of the atomic bomb"
          how he thinks, how he feels with much accuracy. Nolan beautifully
          explains his life both on a private and professional front. The music,
          the sounds with each scene are top notch. The visuals of QUANTUM
          PHYSICS, FISSION, NUCLEAR EXPLOSION are mind-boggling.
        </Text>
      </View>

      {/* {cast} */}
      <Cast navigation={navigation} cast={cast} />

      {/* {similar movies} */}
      <MovieList
        title="Similar Movies"
        data={similarMovies}
        hideSeeAll={true}
      />
    </ScrollView>
  );
}
