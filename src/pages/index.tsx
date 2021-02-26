import {ExperienceBar} from '../components/ExperienceBar'
import { Profile } from '../components/Profile'
import { CompletedChallenges } from '../components/completedChallenges'
import { Countdown } from '../components/Countdown'
import { ChallengeBox } from '../components/ChallengeBox'
import Head from 'next/head'
import styles from '../styles/pages/Home.module.css'
import { CountdownProvider } from '../contexts/CountdownContext'
import {GetServerSideProps} from 'next';
import { ChallengesProvider } from '../contexts/ChallengeContext'
import Switch from '@material-ui/core/Switch';
import { useTheme } from "next-themes";
import { useState } from "react";

interface homeProps{
  level:number;
  currentExperience:number;
  challengesCompleted:number;
}
export default function Home(props: homeProps) {

  const { theme, setTheme } = useTheme();
  const [state, setState] = useState(false);
  const [picture, setPicture] = useState('/icons/sunIcon.svg');

  function handleChange() {
    setState(!state);
    if (state) {
      setTheme('light');
      setPicture('/icons/sunIcon.svg');
    } else {
      setTheme('dark');
      setPicture('/icons/moonIcon.svg');
    }
  }

  return (
    <ChallengesProvider level = {props.level} 
    currentExperience = {props.currentExperience}
    challengesCompleted = {props.challengesCompleted}>
      <div className={styles.container}>
        <img src="/logo-full.svg" alt="MoveIt"/>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: 'center',
          marginBottom: 10          
        }}
      >
        <Switch
          color={'primary'}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'secondary checkbox' }}
        />
        <img style={{height: '1.5rem', marginLeft: '1rem'}} src={picture} alt="sunny"/>
      </div>
        <Head>
          <title>MoveIt</title>
        </Head>
        <ExperienceBar/>
        <CountdownProvider>
          <section>
              <div>
                <Profile/>
                <CompletedChallenges/>
                <Countdown/>
              </div>
              <div>
                <ChallengeBox/>
              </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider> 
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) =>{
  
  const {level, currentExperience, challengesCompleted} = ctx.req.cookies;
  
  return{
    props:{
      level:Number(level),
      currentExperience:Number(currentExperience),
      challengesCompleted:Number(challengesCompleted)
    }
  }
}