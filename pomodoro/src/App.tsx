import styled from "styled-components";
import { motion, useAnimate } from "framer-motion";
import { HStack, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";
import { useRecoilState } from "recoil";
import { IsPlaying } from "./global";

const TimeBox = styled(motion.div)`
    width: 230px;
    height: 350px;
    border-radius: 20px;
    background-color: whitesmoke;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
    color: #6e53d8;
    font-weight: bold;
    font-size: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Button = styled(motion.div)`
    width: 100px;
    height: 100px;
    margin-top: 100px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        cursor: pointer;
    }
`;

const Dot = styled.div`
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.7);
`;

const MIN = 25;

function App() {
    const [goal, setGoal] = useState<number>(0);
    const [round, setRound] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useRecoilState(IsPlaying);

    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(MIN);
    const [timeSeconds, setTimeSeconds] = useState(MIN * 60 * 1);

    const [minScope, minAnimate] = useAnimate();
    const [secScope, secAnimate] = useAnimate();

    const [intervalId, setIntervalId] = useState();

    /* eslint-disable */
    useEffect(() => {
        timeCalculator();

        if (timeSeconds <= 0) {
            setIsPlaying(false);
            setTimeSeconds(MIN * 60 * 1);

            if (round === 3) {
                setRound(0);
                if (goal < 12) {
                    setGoal((prev) => prev + 1);
                } else {
                    setGoal(0);
                    setRound(0);
                }
            } else {
                setRound((prev) => prev + 1);
            }
        }
    }, [timeSeconds, round, goal]);

    /* eslint-disable */
    useEffect(() => {
        if (isPlaying) {
            const timerId = setInterval(dereaseTime, 1000);
            setIntervalId(timerId as any);
        } else {
            clearInterval(intervalId);
        }
    }, [isPlaying, intervalId]);

    function togglePlaying() {
        setIsPlaying((prev) => !prev);
    }

    function timeCalculator() {
        let min = Math.floor(timeSeconds / 60);
        let sec = timeSeconds % 60;
        if (min === 0 && sec === 0) min = MIN;
        setMinutes(min);
        setSeconds(sec);
        if (min !== minutes) minBoxAnimation();
        if (sec !== seconds) secBoxAnimation();
    }

    function dereaseTime() {
        setTimeSeconds((prev) => prev - 1);
    }

    function secBoxAnimation() {
        secAnimate(
            secScope.current,
            { scale: [0.5, 1] },
            { type: "spring", stiffness: 260, damping: 20 }
        );
    }

    function minBoxAnimation() {
        minAnimate(
            minScope.current,
            { scale: [0.5, 1] },
            { type: "spring", stiffness: 260, damping: 20 }
        );
    }

    return (
        <VStack w="100%" h="100vh" bg="linear-gradient(20deg,#3e5eff, #c972fc)">
            <Text
                fontWeight="bold"
                fontSize="50px"
                color="whitesmoke"
                mt="20px"
                mb="50px"
            >
                PomoDormammu
            </Text>
            <HStack w="100%" justifyContent="center">
                <TimeBox
                    ref={minScope}
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                    }}
                >
                    {minutes}
                </TimeBox>
                <VStack spacing="10px" mx="20px">
                    <Dot />
                    <Dot />
                </VStack>
                <TimeBox
                    ref={secScope}
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                    }}
                >
                    {String(seconds).padStart(2, "0")}
                </TimeBox>
            </HStack>

            <Button
                onClick={togglePlaying}
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.1 }}
            >
                {!isPlaying && <FaPlay size={50} color="white" />}
                {isPlaying && <FaPause size={50} color="white" />}
            </Button>

            <HStack
                my="70px"
                color="whitesmoke"
                fontWeight="bold"
                fontSize="30px"
                spacing="100px"
            >
                <VStack alignItems="center">
                    <Text opacity="0.8">{`${round}/4`}</Text>
                    <Text>ROUND</Text>
                </VStack>

                <VStack alignItems="center">
                    <Text opacity="0.8">{`${goal}/12`}</Text>
                    <Text>GOAL</Text>
                </VStack>
            </HStack>
        </VStack>
    );
}

export default App;
