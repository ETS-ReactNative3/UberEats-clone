import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ViewPropTypes,
} from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Dimensions } from "react-native";
import OrderItem from "./OrderItem";

export default function ViewCart() {
  const [modalVisible, setModalVisible] = useState(false);

  const { items, restaurantName } = useSelector(
    (state) => state.cartReducer.selectedItems
  );

  // before ==> '$13.50'
  // now ==> '13.50'
  // now that is only a number we can call the function Number() to turn it into a number
  // then i can put this numbers in an array and call the reduce function and it will sum all the elements of the array
  const total = items
    .map((item) => Number(item.price.replace("$", "")))
    .reduce((prev, curr) => prev + curr, 0);

  const totalUSD = total.toLocaleString("en", {
    style: "currency",
    currency: "USD",
  });

  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: "rgba(0,0,0,0.7)",
    },

    modalCheckoutContainer: {
      backgroundColor: "white",
      padding: 15,
      height: Dimensions.get("screen").height / 2,
      marginTop: Dimensions.get("screen").height / 2,
      borderWidth: 1,
    },

    restaurantName: {
      textAlign: "center",
      fontWeight: "600",
      fontSize: 18,
      marginBottom: 10,
    },

    subtotalContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 15,
    },

    subtotalText: {
      textAlign: "left",
      fontWeight: "600",
      fontSize: 15,
      marginBottom: 10,
    },
  });

  const checkoutModalContent = () => {
    return (
      <>
        <View style={styles.modalContainer}>
          <View style={styles.modalCheckoutContainer}>
            <Text style={styles.restaurantName}>{restaurantName}</Text>
            {items.map((item, index) => (
              <OrderItem key={index} item={item} />
            ))}
            <View style={styles.subtotalContainer}>
              <Text style={styles.subtotalText}>Subtotal</Text>
              <Text>{totalUSD}</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <TouchableOpacity
                style={{
                  marginTop: 5,
                  backgroundColor: "black",
                  alignItems: "center",
                  padding: 12,
                  borderRadius: 30,
                  width: 300,
                  position: 'relative',
                }}
                onPress={() => setModalVisible(false)}
              >
                <Text style={{color: 'white', fontSize: 20, fontWeight: '600' }}>Checkout</Text>
                <Text style={{
                  position: 'absolute',
                  right: 20,
                  color: 'white',
                  fontSize: 15,
                  top: 16,

                }}>{total ? totalUSD : ''}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </>
    );
  };

  return (
    <>
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        {checkoutModalContent()}
      </Modal>
      {total ? (
        <View
          style={{
            position: "absolute",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
            bottom: 130,
            zIndex: 999,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <TouchableOpacity
              style={{
                marginTop: 20,
                backgroundColor: "black",
                flexDirection: "row",
                justifyContent: "flex-end",
                padding: 15,
                borderRadius: 30,
                width: 300,
                position: "relative",
              }}
              onPress={() => setModalVisible(true)}
            >
              <Text style={{ color: "white", fontSize: 20, marginRight: 40 }}>
                View Cart
              </Text>
              <Text style={{ color: "white", fontSize: 20 }}>{totalUSD}</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <></>
      )}
    </>
  );
}
