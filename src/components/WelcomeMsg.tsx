const WelcomeMsg = ({ account }: { account: boolean }) => {
    return (
        <>
            {account ? (
                <h2>Welcome to Metamask</h2>
            ) : (
                <>
                    <h2>Metamask is locked.</h2>
                    <h4>Please LogIn.</h4>
                </>
            )}
        </>
    )
}

export default WelcomeMsg