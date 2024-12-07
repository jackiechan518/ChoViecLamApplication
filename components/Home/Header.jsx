import { useUser } from "@clerk/clerk-expo";
import { View, Text, Image } from "react-native";

export default function Header() {
    return (
        <View
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 10
            }}
        >
            <View>
            <Text style={{ fontSize: 20, fontFamily: 'Baloo2-Regular' }}>Xin Chào </Text>
            <Text style={{ fontSize: 20, fontFamily: 'Baloo2-Medium' }}>User Name</Text>
            </View>
            <Image source={require('../../assets/images/logo.png')}
                style={{ width: 150, height: 150, borderRadius: 100 }}
            />
        </View>
    )
}