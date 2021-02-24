import {useContext} from 'react'
import styles from '../styles/components/ChallengeBox.module.css'
import {ChallengesContext} from '../contexts/ChallengeContext'

export function ChallengeBox(){

    const { activeChallenge, resetChallenge } = useContext(ChallengesContext);

    return(
        <div className={styles.challengeBoxContainer}>
            {activeChallenge ?(
                <div className={styles.challengeActive}>
                    <header>{activeChallenge.amount} xp</header>


                    <main>
                        <img src={`ìcons/${activeChallenge.type}.svg`} alt="body"/>
                        <strong>Novo desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>

                    <footer>
                        <button type="button" 
                        className={styles.challengeFailedButton}
                        onClick={resetChallenge}>
                            Falhei
                        </button>
                        <button type="button" 
                        className={styles.challengesuccededButton}>
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