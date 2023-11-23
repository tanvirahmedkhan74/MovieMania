import { View, Text, TouchableWithoutFeedback, Dimensions, Image } from 'react-native'
import React from 'react'
import Carousel from 'react-native-snap-carousel';


var {width, height} = Dimensions.get('window');

const MovieCard = ({item}) => {
    return (
        <TouchableWithoutFeedback>
            <Image source={require('../assets/images/movie_poster.jpg')}
            style={{width: width*.6, height: height*.4}} className="rounded-3xl"/>
        </TouchableWithoutFeedback>
    )
}


export default function TrendingMovies({data}) {
  return (
    <View className="mb-8">
      <Text className="text-xl mx-5 text-white mb-5">Whats Trending</Text>
      <Carousel
      data={data}
      renderItem={({item}) => <MovieCard item={item}/>}
      firstItem={1}
      inactiveSlideOpacity={.60}
      sliderWidth={width}
      itemWidth={width*.62}
      slideStyle={{display: 'flex', alignItems: 'center'}}
      />
    </View>
  )
}