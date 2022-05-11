import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React, { useEffect, useState} from "react";
import HeaderTabs from "../components/home/HeaderTabs";
import SearchBar from "../components/home/SearchBar";
import Categories from "../components/home/Categories";
import restaurantData, {
  localRestaurants,
} from "../components/home/RestaurantItems";
import RestaurantItems from "../components/home/RestaurantItems";
import { Divider } from "react-native-elements";
import BottomTabs from "../components/home/BottomTabs";
import navigation from "../navigation";

export default function Home({ navigation }) {
  const [restaurantData, setRestaurantData] = React.useState(localRestaurants);
  const [city, setCity] = useState("San Francisco");
  const [activeTab, setActiveTab ] = useState('Delivery');

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
      .then((json) => setRestaurantData(json.businesses.filter((business) => business.transactions.includes(activeTab.toLowerCase()))));
  };

  useEffect(() => {
    getRestaurantsFromYelp();
  },[city, activeTab]);

  return (
    <SafeAreaView style={{ backgroundColor: "#eee", flex: 1 }}>
      <View style={{ backgroundColor: "white", padding: 15 }}>
        <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <SearchBar cityHandler={setCity}/>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Categories />
        <RestaurantItems restaurantData={restaurantData} navigation={navigation}/>
      </ScrollView>
         
      <BottomTabs />
    
       
    </SafeAreaView>
  );
}
