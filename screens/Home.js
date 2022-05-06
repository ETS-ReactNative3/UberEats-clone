import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React, { useEffect, useState} from "react";
import HeaderTabs from "../components/HeaderTabs";
import SearchBar from "../components/SearchBar";
import Categories from "../components/Categories";
import restaurantData, {
  localRestaurants,
} from "../components/RestaurantItems";
import RestaurantItems from "../components/RestaurantItems";

export default function Home() {
  const [restaurantData, setRestaurantData] = React.useState(localRestaurants);
  const [city, setCity] = useState("San Francisco");

  const YELP_API_KEY = "ljLqu06h4ce_63u0inKjVeoN8fn9_RvjmXUxJfneiQh0-SeV4Mh7oCfWtTem1Z0UvzlNkQHiJZD1yHFP7O5Y4KHun-IbShE4alV9mh1eRQ5BarYpNquVQmTAFWR0YnYx";
  const getRestaurantsFromYelp = () => {
    const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}`;
    const apiOptions = {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
      },
    };

    return fetch(yelpUrl, apiOptions)
      .then((res) => res.json())
      .then((json) => setRestaurantData(json.businesses));
  };

  useEffect(() => {
    getRestaurantsFromYelp();
  },[city]);

  return (
    <SafeAreaView style={{ backgroundColor: "#eee", flex: 1 }}>
      <View style={{ backgroundColor: "white", padding: 15 }}>
        <HeaderTabs />
        <SearchBar cityHandler={setCity}/>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Categories />
        <RestaurantItems restaurantData={restaurantData} />
      </ScrollView>
    </SafeAreaView>
  );
}
