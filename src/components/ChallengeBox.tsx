import { useContext } from 'react'
import styles from '../styles/components/ChallengeBox.module.css'
import { ChallengesContext } from '../contexts/ChallengeContext'
import { CountdownContext } from '../contexts/CountdownContext';

export function ChallengeBox(){

    const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengesContext);
    const {resetCountdown} = useContext(CountdownContext);
    
    function handleChallengeSucceded(){
        completeChallenge();
        resetCountdown();
    }
    
    function handleChallengeFailed(){
        resetChallenge();
        resetCountdown();
    }
    return(
        <div className={styles.challengeBoxContainer}>
            {activeChallenge ?(
                <div className={styles.challengeActive}>
                    <header>Ganhe {activeChallenge.amount} xp</header>


                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} alt=""/>
                        <strong>Novo desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>

                    <footer>
                        <button type="button" 
                        className={styles.challengeFailedButton}
                        onClick={handleChallengeFailed}>
                            Falhei
                        </button>
                        <button type="button" 
                        className={styles.challengeSucceededButton}
                        onClick={handleChallengeSucceded}>
                            Completei
                        </button>
                    </footer>
                </div>
            ):(
              <div className={styles.challengeNotActive}>
                <strong>Finalize um ciclo para receber um desafio</strong>
                <p>
                    <img src="icons/level-up.svg" alt="Level Up"/>
                    Avance de level comletando desafios
                </p>
                </div>
            )}            
        </div>
    )
}