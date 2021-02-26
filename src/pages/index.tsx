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

interface homeProps{
  level:number;
  currentExperience:number;
  challengesCompleted:number;
}
export default function Home(props: homeProps) {
  return (
    <ChallengesProvider level = {props.level} 
    currentExperience = {props.currentExperience}
    challengesCompleted = {props.challengesCompleted}>
      <div className={styles.container}>
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