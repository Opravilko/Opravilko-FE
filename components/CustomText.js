import { Text } from "react-native";
// Import the font from the assets folder

export default function CustomText ({children}) {
    return (
        <Text style={
            {
                fontSize: 20,
                color: "black",
                fontFamily: "Rubik"
            }
        }>
            {children}
        </Text>
    )
}