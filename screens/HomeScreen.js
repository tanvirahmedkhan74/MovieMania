import {
  View,
  Text,
  Platform,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from 'react-native-heroicons/outline';
import {styles} from '../theme';
import TrendingMovies from '../components/trendingMovies';

const ios = Platform.OS == 'ios';

export default function HomeScreen() {
  const [trending, setTrending] = useState([1, 2, 3]);
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
          <TouchableOpacity>
            <MagnifyingGlassIcon size="30" strokeWidth="2" color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 10}}>
        {/* Trending Movies Carousels*/}
        <TrendingMovies data={trending} />
      </ScrollView>
    </View>
  );
}
