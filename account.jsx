const ATMDeposit = ({onChange, transactionState, isValid, accountTotal}) => {
    let notice = "";
    if(!isValid && (accountTotal - transactionState < 0)) notice = "Insufficient funds";
    return (
        <label className="label huge"> {/*thiis is from bootstrap*/}
            <input type="number" id="amount" onChange={onChange} />
            <input disabled={!isValid} type="submit" />
            <p className="funds">{notice}</p>
        </label>
    );
}

const Account = () => {
    const [transactionState, setTransactionState] = React.useState(0);
    const [accountTotal, setAccountTotal] = React.useState(0);
    const [transactionType, setTransactionType] = React.useState("");
    const [isValid, setIsValid] = React.useState(false);
    const handleChange = event => {
        console.log(`handleChange ${event.target.value}`);
        setTransactionState(event.target.value); //this sets the number that is typed in as the state of account
        if(transactionType === "Deposit"){
            setIsValid(true);
            return;
        }
        if(transactionType === "Cash Back" && accountTotal < Number(event.target.value)){
            setIsValid(false);
        }
    };
    const handleSubmit = event => {
        let tempTotal = transactionType === "Deposit" ? Number(accountTotal) + Number(transactionState) : Number(accountTotal) - Number(transactionState);
        setAccountTotal(tempTotal);
        event.preventDefault();
    };
    return (
        <form id="form" onSubmit={handleSubmit}>
            <h2>Account Balance: ${accountTotal}</h2>
            <p>Transaction Type: 
            <select onChange={(e) => setTransactionType(e.target.value)}>
                <option id="no-selection" value=""></option>
                <option id="deposit-selection" value="Deposit">Deposit</option>
                <option id="cashback-selection" value="Cash Back">Cash Back</option>
            </select>
            </p>
            {transactionType && <ATMDeposit onChange={handleChange} transactionState={transactionState} isValid={isValid} accountTotal={accountTotal}/>}
        </form>
    );
}

ReactDOM.render(
    <Account />,
    document.getElementById("root")
)