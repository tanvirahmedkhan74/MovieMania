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
import {
  fallBackMoviePoster,
  fetchMovieCredits,
  fetchMovieDetails,
  fetchMovieSimilar,
  image500,
} from '../api/moviedb';

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
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    // fetch the movie detail on change from api
    // console.log('item ', item.id);
    setLoading(true);
    getMovieDetails(item.id);
    getMovieCredits(item.id);
    getMovieSimilar(item.id);
  }, [item]);

  const getMovieDetails = async id => {
    const data = await fetchMovieDetails(id);
    if (data) setMovie(data);
    // console.log('got data!', data);
    setLoading(false);
  };

  const getMovieCredits = async id => {
    const data = await fetchMovieCredits(id);
    if (data && data.cast) setCast(data.cast);
  };

  const getMovieSimilar = async id => {
    const data = await fetchMovieSimilar(id);
    if (data && data.results) setSimilarMovies(data.results);
  };

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
              // source={require('../assets/images/movie_poster.jpg')}
              source={{
                uri: image500(movie?.poster_path) || fallBackMoviePoster,
              }}
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
          {movie?.title}
        </Text>

        {/* {status, release, runtime} */}
        {movie?.id ? (
          <Text className="text-neutral-400 font-semibold text-base text-center">
            {movie?.status} - {movie?.release_date.split('-')[0]} -{' '}
            {movie?.runtime} min
          </Text>
        ) : null}

        {/* {genres} */}
        <View className="flex-row justify-center mx-4 space-x-2">
          {movie?.genres?.map((genre, index) => {
            let dotVisible = index + 1 != movie.genres.length;
            return (
              <Text
                key={index}
                className="text-neutral-400 font-semibold text-base text-center">
                {genre?.name} {dotVisible ? '*' : null}
              </Text>
            );
          })}
        </View>

        {/* {description} */}
        <Text className="text-neutral-300 mx-2 tracking-wide">
          {movie?.overview}
        </Text>
      </View>

      {/* {cast} */}
      {cast.length > 0 && <Cast navigation={navigation} cast={cast} />}

      {/* {similar movies} */}

      {similarMovies.length > 0 && (
        <MovieList
          title="Similar Movies"
          data={similarMovies}
          hideSeeAll={true}
        />
      )}
    </ScrollView>
  );
}
