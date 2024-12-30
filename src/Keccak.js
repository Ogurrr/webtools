import {  keccak256, keccak384, keccak512  } from 'js-sha3';

class Keccak {
    constructor(algorithm, dataToHash) {
        this.algorithm = algorithm;
        this.dataToHash = dataToHash;
    }

    async compute() {
        if (!this.dataToHash) {
            throw new Error('Input cannot be empty.');
        }

        switch (this.algorithm) {
            case '256':
                return keccak256(this.dataToHash);
            case '384':
                return  keccak384(this.dataToHash);
            case '512':
                return keccak512(this.dataToHash);
            default:
                throw new Error('Unsupported algorithm. Use 256, 384, 512');
        }
    }
}

export default Keccak;