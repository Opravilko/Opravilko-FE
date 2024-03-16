import Svg, {Path, Circle} from "react-native-svg";

const IconPlus = (props) =>{
    return (
        <Svg width={props.width} height={props.height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Circle cx="12" cy="12" r="10" stroke={props.stroke} stroke-width="1.5"/>
            <Path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15" stroke={props.stroke} stroke-width="1.5" stroke-linecap="round"/>
        </Svg>
    )
}

export default IconPlus;