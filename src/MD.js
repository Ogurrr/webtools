import md5 from 'js-md5'

class MD {
    constructor(algorithm, dataToHash) {
        this.algorithm = algorithm;
        this.dataToHash = dataToHash;
        this.tmp = null;
    }

    async compute() {
        if (!this.dataToHash) {
            throw new Error('Input cannot be empty.');
        }

        switch (this.algorithm) {
            case "MD5":
                return md5(this.dataToHash);
            default:
                throw new Error("Unsupported algorithm. Use MD5.");
        }
    }
}

export default MD;
