import Svg, {Path} from "react-native-svg";

const IconLock = (props) =>{
    return (
        <Svg width={props.width} height={props.height} viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M16.5 9.32001H7.5C6.37366 9.25709 5.26818 9.64244 4.42503 10.3919C3.58188 11.1414 3.06958 12.1941 3 13.32V18.32C3.06958 19.446 3.58188 20.4986 4.42503 21.2481C5.26818 21.9976 6.37366 22.3829 7.5 22.32H16.5C17.6263 22.3829 18.7318 21.9976 19.575 21.2481C20.4181 20.4986 20.9304 19.446 21 18.32V13.32C20.9304 12.1941 20.4181 11.1414 19.575 10.3919C18.7318 9.64244 17.6263 9.25709 16.5 9.32001Z" stroke={props.stroke} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M17 9.32001V7.32001C17 5.99392 16.4732 4.72217 15.5355 3.78448C14.5979 2.8468 13.3261 2.32001 12 2.32001C10.6739 2.32001 9.40214 2.8468 8.46446 3.78448C7.52678 4.72217 7 5.99392 7 7.32001V9.32001" stroke={props.stroke} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </Svg>
    )
}

export default IconLock;