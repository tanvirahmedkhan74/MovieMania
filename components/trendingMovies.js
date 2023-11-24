import { View, Text, TouchableWithoutFeedback, Dimensions, Image } from 'react-native'
import React from 'react'
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import { fallBackMoviePoster, image500 } from '../api/moviedb';


var {width, height} = Dimensions.get('window');

const MovieCard = ({item, handleClick}) => {
    //console.log('item_poster', item.poster_path);
    return (
        <TouchableWithoutFeedback onPress={() => handleClick(item)}>
            <Image 
            // source={require('../assets/images/movie_poster.jpg')}
            source={{uri: image500(item.poster_path) || fallBackMoviePoster}}
            style={{width: width*.6, height: height*.4}} className="rounded-3xl"/>
        </TouchableWithoutFeedback>
    )
}


export default function TrendingMovies({data}) {
  const navigation = useNavigation();
  
  const handleClick = (item) => {
    navigation.navigate('Movie', item);
  }
  
  return (
    <View className="mb-8">
      <Text className="text-xl mx-5 text-white mb-5">Whats Trending</Text>
      <Carousel
      data={data}
      renderItem={({item}) => <MovieCard item={item} handleClick={handleClick}/>}
      firstItem={1}
      inactiveSlideOpacity={.60}
      sliderWidth={width}
      itemWidth={width*.62}
      slideStyle={{display: 'flex', alignItems: 'center'}}
      />
    </View>
  )
}