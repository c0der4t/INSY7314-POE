const validateInputs = (req, res, next) => {
    const { username, password, idNum, accNum, amount, currency, swiftCode } = req.body;

    //Code Attribution
    //This regex pattern for the username was taken from StackOverflow
    //https://stackoverflow.com/questions/9628879/javascript-regex-username-validation
    //Jason McCreary
    //https://stackoverflow.com/users/164998/jason-mccreary
    const usernameRegex = /^[a-zA-Z0-9]+$/; //username can only contain lower and uppercase letters as well as numbers from 0-9

    //Code attribution
    //This Regex pattern for the password was taken from StackOverflow
    //https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
    //Wiktor Stribizew
    //https://stackoverflow.com/users/3832970/wiktor-stribi%c5%bcew
    const passwordRegex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"; //min 8 chars, at least 1 upper and lower, one number and one special char

    //Code Attribution
    //This regex pattern for an id number was taken from StackOverflow
    //https://stackoverflow.com/questions/29383955/how-to-write-a-regex-javascript-for-an-id-validation
    //Ishettyl
    //https://stackoverflow.com/users/572827/lshettyl
    const idNumRegex = /^\d{6}-?\d{4}$/; //id num for 10 digits with a possible - seperating 6 from 4 digits

    //Code Attribution
    //This regex pattern for the account number was taken from StackOverflow
    //https://stackoverflow.com/questions/22749891/regex-validate-an-account-number-with-two-different-patterns
    //eddy
    //https://stackoverflow.com/users/530911/eddy
    const accNumRegex = /^([0-9]{11})|([0-9]{2}-[0-9]{3}-[0-9]{6})$/; //11 digits for the acc number and can be seperated by a hyphen
    const amountRegex = ;
    const currencyRegex = ;

    //Code Attribution
    //This regex pattern for the SWIFT code was taken from StackOverflow
    //https://stackoverflow.com/questions/3028150/what-is-proper-regex-expression-for-swift-codes
    //Klesun
    //https://stackoverflow.com/users/2750743/klesun
    const swiftCodeRegex = /[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?/i;



}

//Reference List
//https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
//https://stackoverflow.com/questions/29383955/how-to-write-a-regex-javascript-for-an-id-validation
//https://stackoverflow.com/questions/9628879/javascript-regex-username-validation
//https://stackoverflow.com/questions/22749891/regex-validate-an-account-number-with-two-different-patterns
//https://stackoverflow.com/questions/3028150/what-is-proper-regex-expression-for-swift-codes