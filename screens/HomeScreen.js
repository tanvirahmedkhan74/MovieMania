import {
  View,
  Text,
  Platform,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from 'react-native-heroicons/outline';
import {styles} from '../theme';
import TrendingMovies from '../components/trendingMovies';
import MovieList from '../components/movieList';
import {useNavigation} from '@react-navigation/native';
import Loading from '../components/loading';
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../api/moviedb';

const ios = Platform.OS == 'ios';

export default function HomeScreen() {
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  }, []);

  const getTrendingMovies = async ()=> {
    const data = await fetchTrendingMovies();
    // console.log('Got it', data);
    if(data && data.results){
      setTrending(data.results);
      setLoading(false);
    }
  }

  const getUpcomingMovies = async ()=> {
    const data = await fetchUpcomingMovies();
    // console.log('Got it', data);
    if(data && data.results){
      setUpcoming(data.results);
      setLoading(false);
    }
  }

  const getTopRatedMovies = async ()=> {
    const data = await fetchTopRatedMovies();
    // console.log('Got it top rated', data);
    if(data && data.results){
      setTopRated(data.results);
    }
  }

  return (
    <View className="flex-1 bg-neutral-800">
      {/* Status Bar and Logo */}
      <SafeAreaView className={ios ? '-mb-2' : 'mb-3'}>
        <StatusBar barStyle="light-content" />
        <View className="flex-row justify-between items-center mx-4">
          <Bars3CenterLeftIcon size="30" color="white" strokeWidth={2} />
          <Text className="font-bold text-3xl text-white">
            <Text style={styles.text}>M</Text>ovies
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <MagnifyingGlassIcon size="30" strokeWidth="2" color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 10}}>
          {/* Trending Movies Carousels*/}
          {trending.length > 0 && <TrendingMovies data={trending} />}

          {/* Upcoming Movies Row */}
          <MovieList title="Upcoming" data={upcoming} />

          {/* Top rated movies Row */}
          <MovieList title="Top Rated" data={topRated} />
        </ScrollView>
      )}
    </View>
  );
}
