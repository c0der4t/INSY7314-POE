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

    //Code Attribution
    //this regex pattern for the amount was taken from atckOverflow
    //https://stackoverflow.com/questions/7689817/javascript-regex-for-amount
    //Matt Ball
    //https://stackoverflow.com/users/139010/matt-ball
    const amountRegex = /^\d+(\.\d{1,2})?$/;
    
    //Code Attribution
    //This regex pattern for the different accepted currencies was taken from stackoverflow
    //https://stackoverflow.com/questions/57663902/regex-with-iso-currency-and-string-match
    //blhsing
    //https://stackoverflow.com/users/6890912/blhsing
    const currencyRegex = /\b(?:USD|AUD|BRL|GBP|CAD|CNY|DKK|AED|EUR|HKD|INR|MYR|MXN|NZD|PHP|SGD|THB|ARS|COP|CLP|PEN|VEF|ZAR)\b/;

    //Code Attribution
    //This regex pattern for the SWIFT code was taken from StackOverflow
    //https://stackoverflow.com/questions/3028150/what-is-proper-regex-expression-for-swift-codes
    //Klesun
    //https://stackoverflow.com/users/2750743/klesun
    const swiftCodeRegex = /[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?/i;

 if (username !== undefined && !usernameRegex.test(username)) {
        return res.status(400).json({ message: "Invalid username format" });
    }
    if (password !== undefined && !passwordRegex.test(password)) {
        return res.status(400).json({ message: "Password must be at least 8 characters, include uppercase, lowercase, a number and a special character" });
    }
    if (idNum !== undefined && !idNumRegex.test(idNum)) {
        return res.status(400).json({ message: "Invalid ID number format" });
    }
    if (accNum !== undefined && !accNumRegex.test(accNum)) {
        return res.status(400).json({ message: "Invalid account number format" });
    }
    if (amount !== undefined && !amountRegex.test(String(amount))) {
        return res.status(400).json({ message: "Invalid amount format" });
    }
    if (currency !== undefined && !currencyRegex.test(currency)) {
        return res.status(400).json({ message: "Invalid currency code" });
    }
    if (swiftCode !== undefined && !swiftCodeRegex.test(swiftCode)) {
        return res.status(400).json({ message: "Invalid SWIFT code format" });
    }

    // all good
    next();
};

//Reference List
//https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
//https://stackoverflow.com/questions/29383955/how-to-write-a-regex-javascript-for-an-id-validation
//https://stackoverflow.com/questions/9628879/javascript-regex-username-validation
//https://stackoverflow.com/questions/22749891/regex-validate-an-account-number-with-two-different-patterns
//https://stackoverflow.com/questions/3028150/what-is-proper-regex-expression-for-swift-codes
//https://stackoverflow.com/questions/57663902/regex-with-iso-currency-and-string-match