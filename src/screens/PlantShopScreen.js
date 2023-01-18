import {View, Text} from 'react-native';
import React, {useState} from 'react';
import Screen from '../components/Screen';
import Icon from '../components/Icon';
import {IMAGES} from '../common/images';
import {SIZE} from '../common/utils/size';
import {FONT_WEIGHT} from '../common/utils/font';
import {COLORS} from '../common/utils/colors';
import {TouchableOpacity} from 'react-native';

const PlantShopScreen = () => {
  const price = 20;
  const [count, setCount] = useState(0);
  return (
    <Screen>
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
          alignItems: 'center',
          marginTop: SIZE.x30,
          justifyContent: 'space-around',
        }}>
        <Text
          style={{
            color: COLORS.DARKGREEN,
            fontSize: 20,
            fontWeight: FONT_WEIGHT.x700,
          }}>
          PLANT SHOP NAME
        </Text>
        <View style={{marginLeft: 30}}>
          <Icon source={IMAGES.ic_chat_dark_green} size={SIZE.x18} />
        </View>
      </View>

      <View style={{alignSelf: 'center', marginVertical: 30}}>
        <Text
          style={{
            color: COLORS.DARKGREEN,
            fontSize: 18,
            fontWeight: FONT_WEIGHT.x600,
          }}>
          HERBAL PLANTS
        </Text>
      </View>
      <View style={{flexDirection: 'row', marginHorizontal: 10, flex: 1}}>
        <View style={{}}>
          <Icon source={IMAGES.ic_app2_round} size={100} />
        </View>
        <View style={{marginLeft: 20, justifyContent: 'space-around'}}>
          <Text
            style={{
              color: COLORS.DARKGREEN,
              fontSize: 18,
              fontWeight: FONT_WEIGHT.x700,
            }}>
            PLANT NAME
          </Text>
          <View
            style={{
              flexDirection: 'row',
              width: SIZE.p150,
              marginTop: SIZE.x10,
            }}>
            <Text
              style={{
                color: COLORS.DARKGREEN,
                fontSize: 16,
                fontWeight: FONT_WEIGHT.x600,
              }}>
              QUANTITY
            </Text>
            <View
              style={{
                flexDirection: 'row',
                borderWidth: 2,
                borderColor: COLORS.GREEN300,
                borderRadius: 2,
                flex: 1,
                justifyContent: 'space-between',
                marginLeft: 10,
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: COLORS.GREEN300,
                  paddingHorizontal: 6,
                  marginRight: 10,
                }}
                onPress={() => {
                  if (count === 0) {
                    setCount(0);
                  } else {
                    setCount(prevCount => prevCount - 1);
                  }
                }}>
                <Text
                  style={{
                    color: COLORS.DARKGREEN,
                    fontSize: 16,
                    fontWeight: FONT_WEIGHT.x600,
                  }}>
                  -
                </Text>
              </TouchableOpacity>
              <View>
                <Text
                  style={{
                    color: COLORS.DARKGREEN,
                    fontSize: 16,
                    fontWeight: FONT_WEIGHT.x600,
                  }}>
                  {count}
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: COLORS.GREEN300,
                  paddingHorizontal: 6,
                  marginLeft: 10,
                }}
                onPress={() => setCount(prevCount => prevCount + 1)}>
                <Text
                  style={{
                    color: COLORS.DARKGREEN,
                    fontSize: 16,
                    fontWeight: FONT_WEIGHT.x600,
                  }}>
                  +
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* ADD TO CARD BUTTON */}
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 10,
        }}>
        <Text
          style={{
            color: COLORS.DARKGREEN,
            fontSize: 16,
            fontWeight: FONT_WEIGHT.x700,
            flex: 1,
          }}>
          PRICE: {price}
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.GREEN300,
            marginTop: 10,
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 2,
            flex: 1,
            width: '150%',
            paddingHorizontal: 6,
            padding: 4,
            justifyContent: 'space-around',
            marginRight: 30,
          }}>
          <View>
            <Icon source={IMAGES.ic_cart_green} size={SIZE.x30} />
          </View>
          <View>
            <Text
              style={{
                color: COLORS.DARKGREEN,
                fontSize: 16,
                fontWeight: FONT_WEIGHT.x600,
                TextAlign: 'center',
              }}>
              ADD to Cart
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

export default PlantShopScreen;
