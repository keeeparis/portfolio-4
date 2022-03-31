import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

import styles from './App.module.css'
import WelcomeMsg from './components/WelcomeMsg'

function App() {
    const [error, setError] = useState<string | null>(null)
    const [defaultAcc, setDefaultAcc] = useState<any>(null)
    const [userBalance, setUserBalance] = useState<string | null>(null)
    const [buttonText, setButtonText] = useState('Get public key')
    const [provider, setProvider] = useState<any>(null)

    const connectWalletHandler = async () => {
        if (window.ethereum && defaultAcc === null) {
            setProvider(new ethers.providers.Web3Provider(window.ethereum))

            try {
                const result = await window.ethereum.request({ 
                    method: 'eth_requestAccounts'
                })
                accountChangeHandler(result)
                setButtonText('Wallet Connected')
            } catch (e) {
                if (e instanceof Error) setError(e.message)
            }

        } else if (!window.ethereum) {
            setError('Please install Metamask extension')
        }
    }

    useEffect(() => {
        const getBalance = async (account: any) => {
            const balanceResult = await provider.getBalance(account)
            setUserBalance(ethers.utils.formatEther(balanceResult))
        }
        defaultAcc && getBalance(defaultAcc)
    }, [defaultAcc])

    const accountChangeHandler = (newAccount: string[]) => setDefaultAcc(newAccount[0])
    const pageReloadHandler = () => window.location.reload()

    window.ethereum.on('accountsChanged', accountChangeHandler)
    window.ethereum.on('chainChanged', pageReloadHandler)

    return (
        <div className={styles.walletCard}>
            <div className={styles.left}>
                <WelcomeMsg account={!!defaultAcc} />
                <img 
                    src={'https://raw.githubusercontent.com/MetaMask/brand-resources/master/SVG/metamask-fox.svg'} 
                    alt="MetaMask Image" 
                    width={200} 
                    height={200}
                />
                <button 
                    onClick={connectWalletHandler} 
                    disabled={defaultAcc}
                >
                    {buttonText}
                </button>
            </div>
            <div className={styles.right}>            
                {defaultAcc && 
                    <>
                        <div className={styles.innerRight}>
                            <h3>Address:</h3>
                            <h2>{defaultAcc}</h2>
                        </div>
                        <div className={styles.innerRight}>
                            <h3>Balance:</h3>
                            <h2>{userBalance} ETH</h2>
                        </div>
                    </>
                }
                {error}
            </div>
        </div>
    )
}

export default App
