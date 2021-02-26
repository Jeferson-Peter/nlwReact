import {createContext, useState,ReactNode, useEffect} from 'react';
import challenges from '../../challenges.json';
import Cookie from 'js-cookie';
import Cookies from 'js-cookie';
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge{
    type:'body' | 'eye';
    description: string;
    amount: number;
}

interface challengesContextData{
    level:number;
    currentExperience:number;
    experienceToNextLevel:number;
    challengesCompleted:number;
    activeChallenge: Challenge;
    levelUp: ()=> void;
    startNewChallenge: ()=>void;
    resetChallenge: ()=>void;
    completeChallenge: ()=>void;
    closeLevelUpModal: ()=>void;
}
interface challengesProviderProps{
    children: ReactNode;
    level:number;
    currentExperience:number;
    challengesCompleted:number;
}

export const ChallengesContext = createContext({} as challengesContextData );

export function ChallengesProvider({children,...rest}:challengesProviderProps){
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);

    const [activeChallenge, setActiveChallenge] = useState(null);

    const experienceToNextLevel = Math.pow((level + 1) * 4,2)

    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);
    
    useEffect(()=>{
        Notification.requestPermission();
    },[])

    useEffect(() =>{
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengesCompleted', String(challengesCompleted));

    },[level,currentExperience, challengesCompleted])

    function levelUp(){
        setLevel(level + 1);
        setIsLevelUpModalOpen(true);
    }

    function startNewChallenge(){
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge);

        new Audio('/notification.mp3').play();

        if(Notification.permission === 'granted') {
            new Notification('Novo desafio 🎉', { 
            body: `Valendo ${challenge.amount}xp!`
            })
        }
    }

    function resetChallenge(){
        setActiveChallenge(null);
    }

    function closeLevelUpModal(){
        setIsLevelUpModalOpen(false);
    }

    function completeChallenge(){
        if(!activeChallenge){
            return;
        }

        const { amount }  = activeChallenge;
        
        //let it changes
        let finalExperience =  currentExperience + amount;

        if (finalExperience >= experienceToNextLevel){
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
    }

    return(
        <ChallengesContext.Provider 
        value= {{level, 
        currentExperience, 
        challengesCompleted, 
        levelUp,
        startNewChallenge,
        activeChallenge,
        experienceToNextLevel,
        resetChallenge, 
        completeChallenge,
        closeLevelUpModal
        }}
        >
            {children}
            { isLevelUpModalOpen && <LevelUpModal/>}
        </ChallengesContext.Provider>
    )
}