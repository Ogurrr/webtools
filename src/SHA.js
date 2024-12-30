import {  sha3_256, sha3_384, sha3_512  } from 'js-sha3';

function splitStringInHalf(input) {
    const mid = Math.ceil(input.length / 2); // Uwzględniamy zaokrąglenie do góry dla nieparzystej długości
    const firstHalf = input.slice(0, mid);
    const secondHalf = input.slice(mid);

    return [firstHalf, secondHalf];
}

// Przykład użycia
const inputString = "abcdefgh";
const [part1, part2] = splitStringInHalf(inputString);

console.log("Część 1:", part1); // "abcd"
console.log("Część 2:", part2); // "efgh"


class SHA {
    constructor(algorithm, dataToHash) {
        this.algorithm = algorithm;
        this.dataToHash = dataToHash;
    }

    async compute() {
        if (!this.dataToHash) {
            throw new Error('Input cannot be empty.');
        }

        const encoder = new TextEncoder();
        const data = encoder.encode(this.dataToHash);

        let hashBuffer;
        switch (this.algorithm) {
            case '256':
                hashBuffer = await crypto.subtle.digest('SHA-256', data);
                break;
            case '384':
                hashBuffer = await crypto.subtle.digest('SHA-384', data);
                break;
            case '512':
                hashBuffer = await crypto.subtle.digest('SHA-512', data);
                break;
            case '3-256':
                return sha3_256(this.dataToHash);
            case '3-384':
                return sha3_384(this.dataToHash);
            case '3-512':
                return sha3_512(this.dataToHash);
            default:
                throw new Error('Unsupported algorithm. Use 256, 384, 512, 3-256, 3-384, or 3-512.');
        }

        return Array.from(new Uint8Array(hashBuffer))
            .map(byte => byte.toString(16).padStart(2, '0'))
            .join('');
    }
}

export default SHA;