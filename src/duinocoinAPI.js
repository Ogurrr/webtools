class DuinoCoinAPI {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    // Funkcja rozróżniająca użytkownika i transakcję
    identifyType(input) {
        if (!(this.getTransactionData(input) === false)) {
            return 'transaction';
        }

        return 'user';
    }

    async getUserData(username) {
        const response = await fetch(`${this.baseURL}/users/${username}`);
        const data = await response.json();
        return data;
    }

    async getTransactionData(transactionHash) {
        const response = await fetch(`${this.baseURL}/transactions/${transactionHash}`);
        const data = await response.json();

        if(data.success === false) {
            return false
        }
        return data;
    }

    async getData(input) {
        const type = this.identifyType(input);

        if (type === 'user') {
            return this.getUserData(input);
        } else if (type === 'transaction') {
            return this.getTransactionData(input);
        } else {
            throw new Error('Invalid input');
        }
    }
}

export default DuinoCoinAPI;